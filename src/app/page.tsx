"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApplicationHook } from "@/hook/useApplicationHook";

export default function GuardPage() {
  const router = useRouter();
  const { user, loadingApp } = useApplicationHook();

  useEffect(() => {
    const location = window.location.pathname;
    if (!loadingApp) {
      if (!user && location !== "/signin") {
        router.push("/signin");
      } else if (user && location === "/") {
        // If user is authenticated and on root path, redirect based on role
        router.push(user.role === "Employee" ? "/my-leaves" : user.role === "Manager" ? "/my-team" : "/dashboard");
      }
    }
  }, [user, loadingApp]);

  return <div>Chargement...</div>;
}
