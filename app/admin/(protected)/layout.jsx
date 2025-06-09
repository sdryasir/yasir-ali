"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRole } from "@/lib/hooks/useRole";

export default function AdminLayout({ children }) {
  const { isAdmin, status } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // wait for session
    if (!isAdmin) {
      router.push("/unauthorized"); // or redirect to homepage
    }
  }, [isAdmin, status, router]);

  if (status === "loading" || !isAdmin) {
    return <div className="container mt-5">Loading...</div>; // Optional loading state
  }

  return <>{children}</>;
}
