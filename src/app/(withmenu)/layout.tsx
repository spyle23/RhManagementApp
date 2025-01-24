"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Spinner from "@/components/Spinner";
import { useApplicationHook } from "@/hook/useApplicationHook";

export default function AuthencatedLayout({ children }: any) {
  const { user } = useApplicationHook();

  // If user is not defined, you can return a loading state or null
  if (!user) {
    window.location.href = "http://localhost:3000/"
    return <Spinner />;
  }

  return <DashboardLayout role={user.role}>{children}</DashboardLayout>;
}
