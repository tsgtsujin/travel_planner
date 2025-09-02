"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/context/auth-context"
import axios from "axios"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function EditProfilePage() {
  const { user, setUser } = useAuth() as any
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  try {
    const token = localStorage.getItem("token")

    // Зөвхөн өөрчлөгдсөн утгуудыг дамжуулах
    const updatedFields: any = {}
    if (name !== user?.name) updatedFields.name = name
    if (email !== user?.email) updatedFields.email = email
    if (phone !== user?.phone) updatedFields.phone = phone

    // Хэрвээ ямар ч талбар өөрчлөгдөөгүй бол
    if (Object.keys(updatedFields).length === 0) {
      alert("Өөрчлөгдсөн мэдээлэл алга байна.")
      return
    }

    const response = await axios.put("http://localhost:8000/edit-profile", updatedFields, {
      headers: { Authorization: token }
    })
    setUser(response.data.user)
    localStorage.setItem("user", JSON.stringify(response.data.user))
    router.push("/profile")
  } catch (err: any) {
    alert(err.response?.data?.error || "Мэдээлэл хадгалах үед алдаа гарлаа!")
  } finally {
    setLoading(false)
  }
}

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
            <Image src="/images/Background.jpg" alt="Mountain background" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/30" />
        </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 w-full max-w-md shadow-md">
        <h1 className="text-xl font-semibold mb-4">Профайл өөрчлөх</h1>

        <label className="block mb-2 text-sm">Нэр</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mb-4 w-full p-2 border rounded" />

        <label className="block mb-2 text-sm">И-мэйл</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4 w-full p-2 border rounded" />

        <label className="block mb-2 text-sm">Утас</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mb-4 w-full p-2 border rounded" />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Хадгалж байна..." : "Хадгалах"}
        </Button>
      </form>
    </main>
  )
}
