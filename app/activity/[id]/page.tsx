"use client";
import { useEffect, useState } from "react";
import Image from "next/image"
import { MapPin, LandPlot, ArrowRightLeft, ArrowLeftRight, ArrowUpDown, TrendingDown, MoveVertical, Droplets, Waves, CalendarDays, Clock, Baby, User, Globe, Camera, Video } from "lucide-react"
import { useParams } from "next/navigation";
import axios from "axios";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface Activity {
  _id: string;
  name: string;
  location: string;
  area: string;
  length: string;
  width: string;
  height: string;
  depth: string;
  mostDepth: string;
  level: string;
  water: string;
  year: Date;
  timeTable: string[];
  kidPayment: string;
  adultPayment: string;
  foreignPayment: string;
  photoPayment: string;
  videoPayment: string;
  description: string;
  latitude: number;
  longitude: number;
  imageUrl: string[];
}

function renderField(
    label: string,
    value: string | number | null | undefined,
    Icon: React.ElementType
) {
    if (!value) return null;
    return (
      <p className="flex items-center justify-center gap-2 mb-1" key={label}>
        <Icon className="w-5 h-5 text-black" />
        <strong>{label}:</strong> {value}
      </p>
    );
}

export default function ActivityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/activities/${id}`)
        .then((res) => {
          setActivity(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>Уншиж байна...</div>;
  if (!activity) return <div>Газрын мэдээлэл олдсонгүй!</div>;

  return (
    <main className="relative min-h-screen flex flex-col p-8">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
            <Image src="/images/Background.jpg" alt="Mountain background" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/30" />
        </div>
        <h1 className="text-center text-white text-3xl font-bold mb-4">{activity.name}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 mt-4">
            {activity.imageUrl.map((url, index) => (
                <img
                key={index}
                src={url}
                alt={`${activity.name} зураг ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
                />
            ))}
        </div>
        <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto p-8 mt-20 mb-20 bg-sky-100 items-center text-center content-center rounded-3xl">
            <div className="mt-4 space-y-4">
            {renderField("Байршил", activity.location, MapPin)}
            {renderField("Газар нутаг", activity.area, LandPlot)}
            {renderField("Урт", activity.length, ArrowRightLeft)}
            {renderField("Өргөн", activity.width, ArrowLeftRight)}
            {renderField("Өндөр", activity.height, ArrowUpDown)}
            {renderField("Гүн", activity.depth, TrendingDown)}
            {renderField("Хамгийн гүн цэг", activity.mostDepth, MoveVertical)}
            {renderField("Усны хэмжээ", activity.water, Droplets)}
            {renderField("Хөвөөний түвшин", activity.level, Waves)}
            {renderField("Байгуулагдсан он", activity.year ? new Date(activity.year).getFullYear() : "", CalendarDays)}
            {renderField("Хүүхдийн тасалбар", activity.kidPayment, Baby)}
            {renderField("Том хүний тасалбар", activity.adultPayment, User)}
            {renderField("Гадаад иргэний тасалбар", activity.foreignPayment, Globe)}
            {renderField("Зураг авах төлбөр", activity.photoPayment, Camera)}
            {renderField("Бичлэг хийх төлбөр", activity.videoPayment, Video)}
            {activity.timeTable?.length > 0 &&
                renderField("Цагийн хуваарь", activity.timeTable.join(", "), Clock)
            }
            {activity.description && (
                <div> <p className="text-black mt-10">{activity.description}</p></div>
            )}
            </div>   
        </div>

        {activity.latitude && activity.longitude && (
  <div className="w-full h-[400px] mt-10 rounded-xl overflow-hidden z-10">
    <MapContainer
      center={[activity.latitude, activity.longitude]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[activity.latitude, activity.longitude]}>
        <Popup>
          {activity.name} <br /> {activity.location}
        </Popup>
      </Marker>
    </MapContainer>
  </div>
)}
</main>
);
}
