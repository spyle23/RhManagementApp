"use client";
import { useApplicationHook } from "@/hook/useApplicationHook";
import { useRouter } from "next/navigation";

export default function SigninLayout({ children }: any) {
  const { user } = useApplicationHook();
  const router = useRouter();

  if (user) {
    router.back();
    return null;
  }
  return <div>{children}</div>;
}
