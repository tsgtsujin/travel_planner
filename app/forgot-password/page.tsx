"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import axios from "axios"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     // setMessage("")
//     // setError("")

//     try {
//       const res = await axios.post("http://localhost:8000/forgot-password", { email })
//       setMessage(res.data.message || "Холбоос имэйл рүү илгээгдлээ.")
//     } catch (err: any) {
//       setError(err.response?.data?.message || "Алдаа гарлаа. Дахин оролдоно уу.")
//     }
//   }
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/forgot-password", {
        email,
      });
      alert("Холбоос и-мэйл рүү илгээгдлээ.");
    } catch (err) {
      alert("Алдаа гарлаа. И-мэйл хаягаа шалгана уу.");
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col ">
      {/* Background Image */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
            <Image src="/images/Background.jpg" alt="Mountain background" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/30" />
        </div>

      {/* Forgot Password Form */}
      <div className="flex-1 flex flex-col py-8 px-4 mt-10 mb-10 items-center content-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4 shadow-lg">
        <h1 className="text-center text-2xl font-semibold mb-6">Нууц үг сэргээх</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          И-мэйл хаягаа оруулна уу. Бид танд нууц үг сэргээх холбоос илгээх болно.
        </p>

        <form className="space-y-6" onSubmit={async (e) => {
            e.preventDefault()
            const email = (e.target as any).email.value
            try {
                await axios.post("http://localhost:8000/forgot-password", { email })
                alert("И-мэйл хаяг руу холбоос илгээгдлээ!")
            } catch (error) {
                alert("Алдаа гарлаа!")
            }
            }}>
          <div className="space-y-2">
            <label htmlFor="email" className="flex items-center text-sm font-semibold gap-2">
              И-Мэйл хаяг
            </label>
            <Input id="email" type="email" placeholder="И-Мэйл оруулах" className="w-full border border-black  rounded-md p-2" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>

          <Button type="submit" className="w-full bg-sky-200 hover:bg-blue-100 text-black py-2 rounded-md font-semibold">
            Илгээх
          </Button>
          {message && <p className="text-green-600 text-sm">{message}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>

        <div className="text-center mt-6">
          <Link
            href="/login"
            className="text-sm text-gray-500 hover:text-black flex items-center justify-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            <span>Нэвтрэх хуудас руу буцах</span>
          </Link>
        </div>
      </div>
      </div>
    </main>
  )
}
