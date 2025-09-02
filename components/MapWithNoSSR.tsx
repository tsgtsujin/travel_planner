// components/MapWithNoSSR.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Optional: Fix missing default marker icons
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function MapWithNoSSR({ activities }: { activities: any[] }) {
  const position = activities.length > 0
    ? [activities[0].latitude, activities[0].longitude]
    : [47.918, 106.917]; // default Ulaanbaatar

  return (
    <MapContainer center={position as any} zoom={6} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {activities.map((act, i) => (
        <Marker key={i} position={[act.latitude, act.longitude]}>
          <Popup>{act.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
