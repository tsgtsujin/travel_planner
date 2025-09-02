"use client";
import { useEffect, useState } from "react";
import Image from "next/image"
import { useRouter } from "next/navigation";

interface Activity {
  _id: string;
  name: string;
  location?: string;
  description?: string;
  imageUrl?: string[];
  latitude?: number;
  longitude?: number;
}

interface TripSummaryPageProps {
    startDate: Date;
}

export default function TripSummaryPage() {
  const [tripPlan, setTripPlan] = useState<Activity[][]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null); 
  const router = useRouter();

  useEffect(() => {
    const storedPlan = localStorage.getItem("tripPlan");
    if (storedPlan) {
      setTripPlan(JSON.parse(storedPlan));
    }
    const storedStartDate = localStorage.getItem("startDate"); 
    if (storedStartDate) {
    //   setStartDate(new Date(storedStartDate));
    // const date = new Date(storedStartDate);
    // Цагийг 0 болгох (өөрөөр хэлбэл тухайн өдрийн эхлэл)
    // date.setHours(0, 0, 0, 0);
    const date = new Date(storedStartDate + "T00:00:00");
    setStartDate(date);
    }
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col py-12 px-6 md:px-12">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
            <Image src="/images/Background.jpg" alt="Mountain background" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/30"/>
        </div>
        <h1 className="text-3xl font-extrabold text-center text-black mb-12 drop-shadow-md">
            🗺️ Аяллын төлөвлөгөө
        </h1>
        {tripPlan.length === 0 || !startDate ? (
        <p className="text-center text-gray-500 text-lg mt-20">Төлөвлөгөө олдсонгүй.</p>
        ) : (
        tripPlan.map((dayActivities, idx) => {
            // Эхлэх өдрөөс idx хоног нэмэх
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + idx);
            const displayDate = currentDate.toLocaleDateString("mn-MN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            });
            // URL-д зориулсан ISO формат
            // const isoDate = currentDate.toISOString().slice(0, 10);
            const isoDate = currentDate.toISOString().split("T")[0];
            return (
            <section
                key={idx}
                className="mb-14 p-6 bg-white rounded-3xl shadow-lg border-2 border-black hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold mb-6 text-blue-950 border-b border-blue-950 pb-2">
                    Өдөр {idx + 1} - {displayDate}
                    </h2>
                    <button
                        onClick={() => router.push(`/route-page?date=${isoDate}`)}
                        className="text-sm px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200"
                        > Дэлгэрэнгүй
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {dayActivities.map((activity) => (
                    <article
                    key={activity._id}
                    onClick={() => router.push(`/activity/${activity._id}`)}
                    className="flex flex-col bg-blue-950 rounded-xl overflow-hidden shadow-md hover:scale-[1.03] hover:shadow-lg transition-transform duration-300">
                    {activity.imageUrl?.[1] ? (
                        <img
                        src={activity.imageUrl[1]}
                        alt={activity.name}
                        className="w-full h-44 object-cover"
                        loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-44 bg-blue-200 flex items-center justify-center text-white font-semibold text-lg">
                        Зураг байхгүй
                        </div>
                    )}
                    <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-white mb-2">{activity.name}</h3>
                        {activity.description && (
                        <p className="text-white text-sm mb-3 line-clamp-3">{activity.description}</p>
                        )}
                        {activity.location && (
                        <p className="mt-auto text-sm text-white font-medium">📍 {activity.location}</p>
                        )}
                    </div>
                    </article>
                ))}
                </div>
            </section>
            );
        })
        )}
    </main>
  );
}
