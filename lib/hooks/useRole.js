"use client";

import { useSession } from "next-auth/react";

export function useRole() {
  const { data: session, status } = useSession();
  const role = session?.user?.role;
  return {
    isAdmin: role === "admin",
    isInstructor: role === "instructor",
    isStudent: role === "student",
    role,
    status
  };
}
