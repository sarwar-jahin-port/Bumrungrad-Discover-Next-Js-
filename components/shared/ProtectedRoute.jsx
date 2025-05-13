"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/helpers/context/AuthContext";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { auth, access_token, loading } = useContext(AuthContext);

  useEffect(() => {
    // Check localStorage directly (bypasses the Context delay)
    const token = localStorage.getItem("Access_Token");
    const userInfo = localStorage.getItem("User_Details");

    if (!loading && (!token || !userInfo)) {
      router.push("/login");
    }
  }, []); // Empty dependency array = runs only once on mount

  if (loading) {
    return <div>Loading...</div>; // Show loader while validating
  }

  return children;
}
