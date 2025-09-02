"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { splitActivitiesByDays } from "@/utils/planOptimizer";
import { findOptimalRoute } from "@/utils/pathFinder";
import { useRouter } from "next/navigation"; 

interface Province {
  _id: string;
  name: string;
  imageUrl: string;
}

interface Activity {
  _id: string;
  name: string;
  latitude: number;
  longitude: number;
  imageUrl: string[];
}

function startOfDay(date: Date) {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

export default function TripPlannerPage() {
  const [step, setStep] = useState(1);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const today = startOfDay(new Date());
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user?.token || !user?.name) {
      localStorage.removeItem("tripPlan");
      localStorage.removeItem("startDate");
      localStorage.removeItem("endDate");
    }
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/province/all").then((res) => {
      setProvinces(res.data.data);
    }).catch(err => {
      console.error("Аймгуудыг авахад алдаа гарлаа!", err);
    });
  }, []);

  useEffect(() => {
    if (step === 3 && selectedProvince) {
      axios.get(`http://localhost:8000/activities/province/${selectedProvince}`).then((res) => {
        setActivities(res.data.data);
      }).catch(err => {
        console.error("Үйл ажиллагаануудыг авахад алдаа гарлаа!", err);
      });
    }
  }, [step, selectedProvince]);

  const toggleActivity = (activityId: string) => {
    if (selectedActivities.includes(activityId)) {
      setSelectedActivities(selectedActivities.filter((id) => id !== activityId));
    } else {
      setSelectedActivities([...selectedActivities, activityId]);
    }
  };

  const onFinish = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user?.name) {
        alert("Та төлөвлөгөө хадгалахын тулд эхлээд нэвтэрнэ үү.");
        return;
      }
      const res = await axios.get("http://localhost:8000/activities", {
        params: { ids: selectedActivities.join(",") },
      });
      const fullActivities = res.data.data;
      const perDayActivities = splitActivitiesByDays(
        fullActivities,
        startDate!,
        endDate!
      );
      const finalPlan = perDayActivities.map((dayActivities) =>
        findOptimalRoute(dayActivities)
      );
      const startDateAtMidnight = startDate ? new Date(startDate) : null;
      if (startDateAtMidnight) {
        startDateAtMidnight.setHours(0, 0, 0, 0);
      }
      const endDateAtMidnight = endDate ? new Date(endDate) : null;
        if (endDateAtMidnight) {
          endDateAtMidnight.setHours(0, 0, 0, 0);
      }
      localStorage.setItem("tripPlan", JSON.stringify(finalPlan));
      localStorage.setItem("startDate", startDateAtMidnight!.toLocaleDateString('en-CA')); 
      localStorage.setItem("endDate", endDateAtMidnight!.toLocaleDateString('en-CA')); 
      
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/trip/add",
        {
          userEmail: user.email,
          provinceId: selectedProvince,
          startDate: startDateAtMidnight,
          endDate: endDateAtMidnight,
          activitiesId: finalPlan.flat().map((act: any) => act._id), // бүх өдрийн маршрутыг 1 array болгоод _id-уудыг салгаж авна
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push("/trip-summary");
    } catch (err) {
      console.error("Төлөвлөгөө боловсруулахад алдаа гарлаа:", err);
    }
  };

  return (
    <div className="bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/images/Background.jpg)" }}>
      <div className="top-0 z-50 w-full bg-black/60 text-white text-center py-4 backdrop-blur-md">
        <h1 className="text-3xl font-bold">Аяллаа төлөвлөх</h1>
      </div>

      <div className="bg-black/40 flex flex-col items-center px-4 pt-10 text-white min-h-screen">
        {step === 1 && (
          <div className="grid grid-cols-1 gap-4 w-full max-w-md mb-20">
            {provinces.map((province) => (
              <button
                key={province._id}
                className="relative rounded-lg overflow-hidden shadow-lg hover:scale-105 transition"
                onClick={() => {
                  setSelectedProvince(province._id);
                  setStep(2);
                }}
              >
                <img src={province.imageUrl} alt={province.name} className="w-full h-40 object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <p className="text-xl font-semibold">{province.name}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center space-y-6 pt-6 pb-8 relative z-10">
            <h2 className="text-2xl font-semibold mb-8">Аялах өдрөө сонгоно уу!</h2>
            <div className="flex space-x-4 z-50">
              <div className="flex flex-col items-start">
                <label className="mb-1">Эхлэх өдөр</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    if (endDate && date && endDate < date) {
                      setEndDate(null);
                    }
                  }}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={today}
                  placeholderText="Эхлэх өдөр"
                  dateFormat="yyyy-MM-dd"
                  className="text-black rounded p-2"
                  popperClassName="z-50"
                  isClearable
                />
              </div>
              <div className="flex flex-col items-start">
                <label className="mb-1">Дуусах өдөр</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate ?? today}
                  placeholderText="Дуусах өдөр"
                  dateFormat="yyyy-MM-dd"
                  className="text-black rounded p-2"
                  popperClassName="z-50"
                  disabled={!startDate}
                  isClearable
                />
              </div>
            </div>
            <div>
              <div className="flex space-x-4 justify-center mt-60 pb-10 z-50">
                <button
                  onClick={() => setStep(1)}
                  className="bg-gray-400 hover:bg-gray-600 text-black hover:text-white px-4 py-2 rounded"
                > Өмнөх алхам
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!startDate || !endDate}
                  className="bg-gray-400 hover:bg-gray-600 text-black hover:text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                > Дараагийн алхам
                </button>
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="w-full max-w-6xl mx-auto px-4 ">
            <h2 className="text-2xl font-semibold text-center text-white mb-10">Үйл ажиллагаа сонгоно уу!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {activities.map((activity) => (
                <div
                  key={activity._id}
                  className="bg-white text-black rounded-xl overflow-hidden shadow-md flex flex-col justify-between"
                >
                  <img
                    src={activity.imageUrl[0]}
                    alt={activity.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow justify-between">
                    <p className="text-lg font-semibold mb-2">{activity.name}</p>
                    <button
                      onClick={() => toggleActivity(activity._id)}
                      className={`mt-auto px-3 py-2 rounded font-medium ${
                        selectedActivities.includes(activity._id)
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-emerald-500 hover:bg-emerald-600 text-white"
                      }`}
                    >
                      {selectedActivities.includes(activity._id) ? "Болих" : "Сонгох"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-10 mt-10 mb-20">
              <button
                onClick={() => { setSelectedActivities([]); setStep(2);}}
                className="min-w-[150px] flex-1 bg-gray-400 hover:bg-gray-600 text-black hover:text-white px-4 py-2 rounded text-center"
              > Өмнөх алхам
              </button>
              <button
                onClick={onFinish}
                disabled={selectedActivities.length === 0}
                className="min-w-[150px] flex-1 bg-gray-400 hover:bg-gray-600 text-black hover:text-white px-4 py-2 rounded text-center disabled:opacity-50 disabled:cursor-not-allowed"
              > Дуусгах
              </button>
            </div>
          </div>
          )}
      </div>
    </div>
  );
}
