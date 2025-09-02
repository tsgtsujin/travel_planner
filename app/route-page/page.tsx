"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getOptimizedRoute } from "@/utils/optimizeRoute";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import axios from "axios";

const markerIcon = new L.Icon({
  iconUrl: "/marker-icon-black.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "/marker-shadow.png",
  shadowSize: [41, 41],
});

const fetchRoute = async (coordinates: [number, number][]) => {
  const orsApiKey = "5b3ce3597851110001cf624899049459e5ad4b89a3afd5ce753bd4f2";
  const url = "https://api.openrouteservice.org/v2/directions/driving-car/geojson";
  const body = { coordinates: coordinates.map(([lat, lon]) => [lon, lat]) };

  const response = await axios.post(url, body, {
    headers: {
      Authorization: orsApiKey,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

interface Activity {
  _id: string;
  name: string;
  latitude: number;
  longitude: number;
  imageUrl?: string[];
}

export default function RoutePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedDateStr = searchParams.get("date");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [ordered, setOrdered] = useState<Activity[]>([]);
  const [distances, setDistances] = useState<number[]>([]);
  const [durations, setDurations] = useState<number[]>([]);
  const [totals, setTotals] = useState({ distance: 0, duration: 0 });
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);

  useEffect(() => {
    if (!selectedDateStr) return;
    localStorage.setItem("startDate", selectedDateStr);
    setSelectedDate(new Date(selectedDateStr));
  }, [selectedDateStr]);

  useEffect(() => {
    if (!selectedDate) return;

    const storedPlan = localStorage.getItem("tripPlan");
    const storedStartDate = localStorage.getItem("startDate");
    if (!storedPlan || !storedStartDate) return;

    const plan: Activity[][] = JSON.parse(storedPlan);
    const start = new Date(storedStartDate);

    const normalizeDate = (date: Date) =>
      new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

    const diffDays = Math.floor(
      (normalizeDate(selectedDate).getTime() - normalizeDate(start).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (diffDays >= 0 && diffDays < plan.length) {
      const activities = plan[diffDays];
      const {
        ordered,
        distances,
        durations,
        totalDistance,
        totalDuration,
      } = getOptimizedRoute(activities);

      setOrdered(ordered);
      setDistances(distances);
      setDurations(durations);
      setTotals({ distance: totalDistance, duration: totalDuration });
    }
  }, [selectedDate]);

  useEffect(() => {
    if (ordered.length < 2) return;
    const coords: [number, number][] = ordered.map((a) => [a.latitude, a.longitude]);
    fetchRoute(coords).then((data) => {
      const route = data.features[0].geometry.coordinates.map(
        ([lon, lat]: [number, number]) => [lat, lon] as [number, number]
      );
      setRouteCoords(route);
    });
  }, [ordered]);

  if (!selectedDateStr) return <p>Огноо сонгогдоогүй байна.</p>;

  return (
    <div className="p-6  mx-auto bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/images/Background.jpg)" }}>
      <button
        onClick={() => router.push("/trip-summary")}
        className="mb-6 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
      > ← Буцах
      </button>
      <h2 className="text-2xl font-bold mb-6 text-center">🗺️ Маршрут: {selectedDateStr}</h2>

      <div className="space-y-6 relative">
        {ordered.map((activity, i) => (
          <div
            key={activity._id}
            className="relative border border-gray-200 bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-start gap-6">
            <div className="absolute left-[-32px] top-6 w-4 h-4 bg-blue-900 rounded-full border-2 border-white shadow-md z-10" />
            <div className="flex-shrink-0 text-blue-950 text-2xl font-bold">
              {i + 1}
            </div>

            {activity.imageUrl?.[0] && (
              <img
                src={activity.imageUrl[0]}
                alt={activity.name}
                className="rounded-xl w-full max-w-[200px] h-auto object-cover"
              />
            )}

            <div className="flex-1">
              <div className="text-xl font-semibold mb-1">{activity.name}</div>
              <div className="text-gray-500 text-sm mb-2">
                🧭 Байршил: {activity.latitude}, {activity.longitude}
              </div>
              {i > 0 && (
                <div className="text-sm text-gray-700 mt-1">
                  🚗 {distances[i - 1].toFixed(1)} км | 🕒{" "}
                  {(durations[i - 1] * 60).toFixed(0)} мин
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="absolute left-[-24px] top-0 bottom-0 w-1 bg-gray-200 rounded-full z-0" />
      </div>

      <div className="mt-8 border-t pt-4 text-lg font-semibold text-white text-center">
        ✅ Нийт зам: {totals.distance.toFixed(1)} км | 🕒 Нийт хугацаа:{" "}
        {(totals.duration * 60).toFixed(0)} мин
      </div>

      {ordered.length > 0 && (
        <MapContainer
          center={[ordered[0].latitude, ordered[0].longitude]}
          zoom={8}
          scrollWheelZoom={true}
          style={{ height: "500px", width: "100%", marginTop: "2rem" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {ordered.map((activity, i) => (
            <Marker
              key={activity._id}
              position={[activity.latitude, activity.longitude]}
              icon={L.divIcon({
                html: `<div style="background-color: #2d2d2d; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; font-size: 14px; border: 2px solid white;">${i + 1}</div>`,
                className: "",
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30],
              })}
            >
              <Popup>
                <strong>{i + 1}. {activity.name}</strong>
              </Popup>
            </Marker>
          ))}

          {routeCoords.length > 0 && (
            <Polyline positions={routeCoords} color="black" />
          )}
        </MapContainer>
      )}
    </div>
  );
}
