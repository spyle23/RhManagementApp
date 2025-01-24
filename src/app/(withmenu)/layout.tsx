"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Spinner from "@/components/Spinner";
import { useApplicationHook } from "@/hook/useApplicationHook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthencatedLayout({ children }: any) {
  const { user } = useApplicationHook();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      console.log("impiry");
      router.push("signin");
    }
  }, [user]);

  // If user is not defined, you can return a loading state or null
  if (!user) {
    return <Spinner />;
  }

  return <DashboardLayout role={user.role}>{children}</DashboardLayout>;
}
