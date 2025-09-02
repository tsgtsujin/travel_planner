import { useAuth } from "@/components/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/"); // redirect if not authenticated
    }
  }, [user, isLoading, router]);

  if (isLoading) return <div>Ачааллаж байна...</div>;
  if (!user) return null; // Prevent flash before redirect

  return <>{children}</>;
}
