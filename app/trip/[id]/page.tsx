"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";

const MapWithNoSSR = dynamic(() => import("@/components/MapWithNoSSR"), {
  ssr: false,
});

export default function TripDetailPage() {
  const { id } = useParams();
  const [trip, setTrip] = useState<any>(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/trip/${id}`);
        setTrip(res.data.trip);
      } catch (error) {
        console.error("Аяллын дэлгэрэнгүйг авахад алдаа гарлаа:", error);
      }
    };
    fetchTrip();
  }, [id]);

  if (!trip) return <p className="p-8">Уншиж байна...</p>;

 return (
  <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
    style={{ backgroundImage: "url(/images/Background.jpg)" }} >
    <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl max-w-3xl w-full p-8 mx-4 mt-10 mb-14">
    
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Аяллын дэлгэрэнгүй</h1>

      <div className="text-lg text-gray-700 space-y-2">
        <p><strong>Аймаг:</strong> {trip.provinceId.name}</p>
        <p><strong>Хугацаа:</strong> {trip.startDate.slice(0, 10)} - {trip.endDate.slice(0, 10)}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-base font-semibold text-gray-800 mb-2">Үйл ажиллагаанууд:</h2>
        <ul className="list-disc ml-6 space-y-1 text-gray-700">
          {trip.activitiesId.map((act: any) => (
            <li key={act._id}>{act.name}</li>
          ))}
        </ul>
      </div>
      <div className="mt-8 rounded overflow-hidden shadow-lg">
        <MapWithNoSSR activities={trip.activitiesId} />
      </div>
    </div>
  </div>
);
}
