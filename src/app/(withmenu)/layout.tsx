"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Spinner from "@/components/Spinner";
import { navigation } from "@/constants/navigation";
import { useApplicationHook } from "@/hook/useApplicationHook";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthencatedLayout({ children }: any) {
  const { user, loadingApp } = useApplicationHook();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (!loadingApp) {
      if (!user) {
        router.push("/signin");
        return;
      }
      const findedNavigation = navigation[user.role].find((a) =>
        pathName.includes(a.href)
      );
      if (!findedNavigation) {
        router.back();
      }
    }
  }, [user, loadingApp, pathName]);

  // If user is not defined, you can return a loading state or null
  if (loadingApp) {
    return <Spinner />;
  }

  if (!user) {
    return null;
  }

  return <DashboardLayout role={user.role}>{children}</DashboardLayout>;
}
