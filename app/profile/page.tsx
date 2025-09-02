"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/context/auth-context"
import Link from "next/link"
import ProtectedRoute from "@/components/ProtectedRoute";


export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])
  if (isLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Уншиж байна...</div>
  }

  return (
    <ProtectedRoute>
    <main className="relative min-h-screen flex flex-col">

      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image src="/images/Background.jpg" alt="Mountain background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="flex-1 flex flex-col py-8 px-4">
        <div className="max-w-3xl mx-auto w-full bg-white/90 rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-semibold mb-6">Профайл</h1>
          <div className="space-y-6">

            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="bg-gray-200 rounded-full w-24 h-24 flex items-center justify-center">
                <span className="text-3xl text-gray-500">{user.email.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <h2 className="text-xl font-medium">{user.name || "Хэрэглэгч"}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Хувийн мэдээлэл</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Нэр</label>
                  <div className="p-2 bg-gray-100 rounded">{user.name || "Тохируулаагүй"}</div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">И-мэйл</label>
                  <div className="p-2 bg-gray-100 rounded">{user.email}</div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Утас</label>
                  <div className="p-2 bg-gray-100 rounded">{user.phone}</div>
                </div>
              </div>

              <div className="mt-6">
                <Link href={"/edit-profile"}>
                <Button className="bg-gray-500 hover:bg-gray-600">Мэдээлэл засах</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </ProtectedRoute>
  )
} 

