"use client";
import { useEffect, useState } from "react";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import axios from "axios";
import { MapPin, LandPlot, Grid2x2 } from "lucide-react"

interface Province {
  _id: string;
  name: string;
  size: string;
  center: string;
  sum: number;
  team: number;
  description: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
}

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

export default function ProvinceDetailPage() {
const router = useRouter();
const { name } = useParams<{ name: string }>();

  const [province, setProvince] = useState<Province | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (name) {
        axios.get(`http://localhost:8000/province/name/${encodeURIComponent(name)}`)
        .then((res) => {
          const provinceData = res.data.data;
          setProvince(provinceData);
          return axios.get(`http://localhost:8000/activities/province/${provinceData._id}`);
        })
        .then((res) => {
          setActivities(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [name]);

  if (loading) return <div>Уншиж байна...</div>;
  if (!province) return <div>Аймаг олдсонгүй!</div>;

  return (
    <main className="relative min-h-screen flex flex-col">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
            <Image src="/images/Background.jpg" alt="Mountain background" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto p-8 mt-20 mb-20 bg-sky-100 items-center text-center content-center rounded-3xl">
            <div className="relative w-full max-w-md mb-6 mx-auto">
                <img src={province.imageUrl} alt={province.name} className="w-full max-w-6xl object-cover rounded-lg" />
                <h1 className="absolute inset-0 flex items-center justify-center text-black text-xl font-bold ">
                    {province.name}
                </h1>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
                <p className="flex items-center justify-center gap-2">
                    <MapPin className="w-5 h-5"/> <strong>Төв:</strong> {province.center}
                </p>
                <p className="flex items-center justify-center gap-2">
                    <LandPlot className="w-5 h-5"/> <strong>Газар нутаг:</strong> {province.size}
                </p>
                <p className="flex items-center justify-center gap-2">
                    <Grid2x2 className="w-5 h-5"/> <strong>Сумдын тоо:</strong> {province.sum}
                </p>
                <p className="flex items-center justify-center gap-2">
                    <Grid2x2 className="w-5 h-5"/> <strong>Багуудын тоо:</strong> {province.team}
                </p>
                <p className="mt-4">{province.description}</p>
            </div>
        </div>

      <h2 className="text-2xl text-white font-bold mb-10 pb-10 text-center">ГАЗРУУД</h2>
      <div className="ml-10 mr-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 mb-20">
        {activities.map((activities) => (
          <div key={activities._id} onClick={() => router.push(`/activity/${activities._id}`)}
          className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-105 transition">
            <img
              src={activities.imageUrl[0]}
              alt={activities.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{activities.name}</h3>
              <p className="text-sm text-gray-500">{activities.location}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}