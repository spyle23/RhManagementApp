"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApplicationHook } from "@/hook/useApplicationHook";

export default function GuardPage() {
  const router = useRouter();
  const { user } = useApplicationHook();

  useEffect(() => {
    const location = window.location.pathname;
    router.push(user ? location : "signin");
  }, [user]);

  return <div>Chargement...</div>;
}
