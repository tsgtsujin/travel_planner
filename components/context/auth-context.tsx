//   // Check for saved user on initial load
//   // useEffect(() => {
//   //   const loadUser = () => {
//   //     try {
//   //       const savedUser = localStorage.getItem("user")
//   //       console.log("Loading user from localStorage:", savedUser)
//   //       if (savedUser) {
//   //         const parsedUser = JSON.parse(savedUser)
//   //         console.log("Parsed user:", parsedUser)
//   //         setUser(parsedUser)
//   //       }
//   //     } catch (error) {
//   //       console.error("Error loading user from localStorage:", error)
//   //     } finally {
//   //       setIsLoading(false)
//   //     }
//   //   }
//   //   loadUser()
//   // }, [])


//   // useEffect(() => {
//   //   const fetchProfile = async () => {
//   //     const token = localStorage.getItem("token");
//   //     if (!token) return;
//   //     try {
//   //       const res = await fetch("http://localhost:8000/profile", {
//   //         headers: { Authorization: token },
//   //       });
//   //       const data = await res.json();
//   //       setUser(data);
//   //     } catch (err) {
//   //       console.error("Error fetching profile:", err);
//   //     }
//   //   };
//   //   fetchProfile();
//   // }, []);

// OFFICIAL
"use client"
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import axios from "axios"

type User = {
  email: string
  name?: string
  phone?: string
}
type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/login", { email, password });
      if (!response.data.token) {
        throw new Error("Token байхгүй байна");
      }
      const user = {
        email: response.data.email || email,
        name: response.data.name || "",
        phone: response.data.phone || "",
      }; 
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", response.data.token); 
      setUser(user);
    } catch (err: any) {
    const errorMessage = err.response?.data || "Нэвтрэх үед алдаа гарлаа";
    throw new Error(errorMessage);
  } finally {
      setIsLoading(false);
    }
  };
  
  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      // Create user object
      const user = { email, name }
      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(user))
      // Update state
      setUser(user)
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("tripPlan");
    localStorage.removeItem("startDate");
    localStorage.removeItem("endDate");
    setUser(null)
    router.push("/");
  }
  return <AuthContext.Provider value={{ user, isLoading, login, register, logout, setUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}