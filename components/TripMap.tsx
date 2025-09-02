import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

interface Activity {
  name: string;
  latitude: number;
  longitude: number;
}

export default function TripMap({ activities }: { activities: Activity[] }) {
  const center = activities.length > 0
    ? [activities[0].latitude, activities[0].longitude]
    : [47.918, 106.917]; // Default: Ulaanbaatar

  return (
    <MapContainer center={center as [number, number]} zoom={6} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {activities.map((activity, index) => (
        <Marker key={index} position={[activity.latitude, activity.longitude]}>
          <Popup>{activity.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
