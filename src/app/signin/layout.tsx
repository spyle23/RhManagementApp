"use client";
import Spinner from "@/components/Spinner";
import { useApplicationHook } from "@/hook/useApplicationHook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SigninLayout({ children }: any) {
  const { user, loadingApp } = useApplicationHook();
  const router = useRouter();

  useEffect(() => {
    if (!loadingApp && user) {
      router.back();
    }
  }, [user, loadingApp]);

  if (loadingApp) {
    return <Spinner />;
  }

  if (user) {
    return null;
  }
  return <div>{children}</div>;
}
