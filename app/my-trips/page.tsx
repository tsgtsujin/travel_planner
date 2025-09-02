"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Activity {
  _id: string;
  name: string;
}

interface Province {
  _id: string;
  name: string;
}

interface Trip {
  _id: string;
  userEmail: string;
  provinceId: Province;
  startDate: string;
  endDate: string;
  activitiesId: Activity[];
}

export default function MyTripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        const token = localStorage.getItem("token");
        if (!user?.email) {
          console.error("Хэрэглэгчийн email байхгүй байна");
          return;
        }
        const res = await axios.get(`http://localhost:8000/trip/user/${user.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrips(res.data.trips);
      } catch (error) {
        console.error("Аялуудыг авахад алдаа гарлаа:", error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/images/Background.jpg)" }}>
      <div className="p-8">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">Миний аяллууд</h1>
        {trips.length === 0 ? (
          <p className="text-white text-center">Танд аялал бүртгэгдээгүй байна.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip, index) => (
              <div key={trip._id} className="border p-4 rounded-lg shadow bg-white/75">
                <div className="text-xl font-bold mb-2 text-center">#{index + 1} Аялал</div>
                <p><strong>Аймаг:</strong> {trip.provinceId.name}</p>
                <p><strong>Хугацаа:</strong> {trip.startDate.slice(0, 10)} - {trip.endDate.slice(0, 10)}</p>
                <p><strong>Газрууд:</strong></p>
                <ul className="list-disc ml-6 mb-4">
                  {trip.activitiesId.map((act) => (
                    <li key={act._id}>{act.name}</li>
                  ))}
                </ul>
                <Link href={`/trip/${trip._id}`}>
                <div className="flex justify-center items-center">
                  <button className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-200 transition ">
                    Дэлгэрэнгүй
                  </button>
                </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
