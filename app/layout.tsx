import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/context/auth-context"
import Header from "@/components/header"
import Footer from './../components/footer';
import 'react-datepicker/dist/react-datepicker.css';
import Image from "next/image"
import 'leaflet/dist/leaflet.css';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Planny - Travel Guide",
  description: "Explore Mongolia with Planny Travel Guide",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image src="/images/Background.jpg" alt="Mountain background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/30" />
      </div> */}
      <body className={inter.className}>
        <AuthProvider><Header />{children}<Footer/></AuthProvider>
      </body>
    </html>
  )
}
