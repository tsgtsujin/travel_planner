"use client"

import Link from "next/link"
import { useAuth } from "@/components/context/auth-context"
import { Button } from "@/components/ui/button"
import { LogOut, User, Map } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-black text-white p-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-lg ml-7">
        PLANNY
      </Link>

      {user ? (
        // Нэвтэрсэн байхад
        <div className="flex items-center gap-4">
          <Link href="/plan-trip">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 bg-zinc-500 px-3 py-1 text-sm rounded border-2 border-white text-white hover:bg-white hover:text-black">
              <Map className="w-4 h-4" />
              <span>Аялал төлөвлөх</span>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <span className="hidden md:inline-block">{user.email}</span>
                <User className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile">Профайл</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/my-trips">Миний аяллууд</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="text-red-500">
                <LogOut className="w-4 h-4 mr-2" />
                <span>Гарах</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        // Нэвтрээгүй байхад
        <div className="flex gap-5">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="bg-zinc-500 px-3 py-1 text-sm rounded border-2 border-white text-white hover:bg-white hover:text-black">
              Нэвтрэх
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="ghost" size="sm" className="bg-zinc-500 px-3 py-1 text-sm rounded border-2 border-white text-white hover:bg-white hover:text-black">
              Бүртгүүлэх
            </Button>
          </Link>
        </div>
      )}
    </header>
  )
}

