"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "@/components/Spinner";
import { useApplicationHook } from "@/hook/useApplicationHook";

export default function AuthencatedLayout({ children }: any) {
  const { user } = useApplicationHook();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "Employee":
          router.push("/my-leaves");
          break;
        default:
          router.push("/dashboard");
          break;
      }
    } else {
      router.push("/");
    }
  }, [user, router]);

  // If user is not defined, you can return a loading state or null
  if (!user) {
    return <Spinner />;
  }

  return <DashboardLayout role={"Admin"}>{children}</DashboardLayout>;
}
