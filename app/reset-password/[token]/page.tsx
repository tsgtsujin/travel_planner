"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(`http://localhost:8000/reset-password/${params.token}`, {
        newPassword: password,
      })
      alert("Нууц үг амжилттай шинэчлэгдлээ")
      router.push("/login")
    } catch (err) {
      alert("Token хүчингүй эсвэл хугацаа нь дууссан байна")
    }
  }

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md w-full space-y-4">
        <h1 className="text-xl font-semibold">Шинэ нууц үг оруулах</h1>
        <input
          type="password"
          placeholder="Шинэ нууц үг"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Илгээх
        </button>
      </form>
    </main>
  )
}
