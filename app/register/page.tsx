"use client";
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Key, Phone, User } from "lucide-react"
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { useAuth } from "@/components/context/auth-context"

export default function RegisterPage() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { register } = useAuth()
  
  // Нууц үгийн validation: Дор хаяж 1 тусгай тэмдэгт, 1 тоо, 1 том үсэг шаардлагатай
  function validatePassword(password: string): boolean {
    const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
    return pattern.test(password);
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("")
    setIsLoading(true)

    try {
      const response = await axios.get(`http://localhost:8000/check-email/${email}`);
        if (response.data.exists) {
          setErrorMessage("И-Мэйл бүртгэлтэй байна.");
          return;
        }
        } catch (error) {
          console.error("Error:", error);
        }
        if (!validatePassword(password)) {
          setErrorMessage("Нууц үг том үсгээр эхэлсэн, дор хаяж нэг тусгай тэмдэгт, тоо ашигласан байх ёстой.");
          return;
        }
        try {
          await axios.post('http://localhost:8000/register', { name, phone, email, password});
          router.push('/login');
        } catch (error) {
          console.error("Error:", error);
        }
  };

  return (
    <main className="relative min-h-screen flex flex-col">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image src="/images/Background.jpg" alt="Mountain background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/30"/>
      </div>

      <div className="flex-1 flex flex-col py-8 px-4 mt-10 mb-10 items-center content-center">
        {/* Register Form */}
        <div className="bg-white/80 rounded-lg p-5 w-full max-w-md mx-4 shadow-lg">
        <h1 className="text-center text-2xl font-semibold mb-6">Бүртгүүлэх</h1>

        {errorMessage && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{errorMessage}</div>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="flex items-center text-sm font-semibold gap-2">
            <User className="w-5 h-5" />
              Нэр
            </label>
            <Input type="text" placeholder="Нэр оруулах" value={name} className="w-full border border-black  rounded-md p-2" onChange={(e) => setName(e.target.value)} required/>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="flex items-center text-sm font-semibold gap-2">
            <Phone className="w-5 h-5" />
              Утасны дугаар
            </label>
            <Input type="text" inputMode="numeric" pattern="[0-9]*" placeholder="Утасны дугаар оруулах" value={phone} className="w-full border border-black  rounded-md p-2" onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} required/>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="flex items-center text-sm font-semibold gap-2">
            <Mail className="w-5 h-5" />
              И-Мэйл хаяг
            </label>
            <Input type="email" placeholder="И-Мэйл оруулах" value={email} className="w-full border border-black  rounded-md p-2" onChange={(e) => setEmail(e.target.value)} required/>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="flex items-center text-sm font-semibold gap-2">
            <Key className="w-5 h-5" />
              Нууц үг
            </label>
            <Input type="password" placeholder="Нууц үг оруулах" value={password} className="w-full border border-black rounded-md p-2" onChange={(e) => setPassword(e.target.value)} required/>
          </div>

          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          <Button type="submit" className="w-full bg-sky-200 hover:bg-blue-100 text-black py-2 rounded-md font-semibold" disabled={isLoading}>
            Бүртгүүлэх
          </Button>
        </form>
      </div>
      </div>
    </main>
  );
}

