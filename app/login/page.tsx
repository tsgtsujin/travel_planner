"use client";
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Key } from "lucide-react"
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { useAuth } from "@/components/context/auth-context"

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const { login } = useAuth()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("")
        setIsLoading(true)
        try {
          await login(email, password);
          router.replace('/');
        } catch (error: any) {
          console.error("Login error:", error);
          setErrorMessage("Нэвтрэх үед алдаа гарлаа. " + (error?.message || ""));
        } finally {
          setIsLoading(false);
        }
    };

  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image src="/images/Background.jpg" alt="Mountain background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="flex-1 flex flex-col py-8 px-4 mt-10 mb-10 items-center content-center">
        {/* Login Form */}
        <div className="bg-white/80 rounded-lg p-5 w-full max-w-md mx-4 shadow-lg">
        <h1 className="text-center text-2xl font-semibold mb-6">Нэвтрэх</h1>

        {errorMessage && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{errorMessage}</div>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="flex items-center text-sm font-semibold gap-2">
            <Mail className="w-5 h-5" />
              И-Мэйл хаяг
            </label>
            <Input id="email" type="email" placeholder="И-Мэйл оруулах"value={email} className="w-full border border-black  rounded-md p-2" onChange={(e) => setEmail(e.target.value)} required/>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="flex items-center text-sm font-semibold gap-2">
            <Key className="w-5 h-5" />
              Нууц үг
            </label>
            <Input id="password" type="password" placeholder="Нууц үг оруулах" value={password} className="w-full border border-black rounded-md p-2" onChange={(e) => setPassword(e.target.value)} required/>
          </div>

          <Button type="submit" className="w-full bg-sky-200 hover:bg-blue-100 text-black py-2 rounded-md font-semibold" disabled={isLoading}>
            {isLoading ? "Нэвтэрч байна..." : "Нэвтрэх"}
          </Button>
        </form>
        <div className="text-center mt-4">
          <Link href="/forgot-password" className="text-sm text-gray-500 hover:text-black">
            Нууц үг мартсан?
          </Link>
        </div>
      </div>
      </div>
    </main>
  )
} 




//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError("")
//     setIsLoading(true)
//     setDebugInfo("")

//     try {
//       setDebugInfo("Attempting login...")
//       const result = await login(email, password)
//       setDebugInfo("Login successful: " + JSON.stringify(result))
//       // Add a small delay to ensure state updates
//       setTimeout(() => {
//         router.push("/profile")
//       }, 500)
//     } catch (err: any) {
//       console.error("Login error:", err)
//       setError(`Нэвтрэх үед алдаа гарлаа: ${err.message || "Unknown error"}`)
//       setDebugInfo(`Error details: ${JSON.stringify(err)}`)
//     } finally {
//       setIsLoading(false)
//     }
//   }

