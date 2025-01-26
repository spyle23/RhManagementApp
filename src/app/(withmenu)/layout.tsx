"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Spinner from "@/components/Spinner";
import { useApplicationHook } from "@/hook/useApplicationHook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthencatedLayout({ children }: any) {
  const { user, loadingApp } = useApplicationHook();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loadingApp) {
      router.push("signin");
    }
  }, [user, loadingApp]);

  // If user is not defined, you can return a loading state or null
  if (loadingApp) {
    return <Spinner />;
  }

  if (!user) {
    return null;
  }

  return <DashboardLayout role={user.role}>{children}</DashboardLayout>;
}
