// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // 🔐 Admin-only routes
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // 🔐 Instructor-only routes
    if (pathname.startsWith("/instructor") && token?.role !== "instructor") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // 🔐 Student-only routes
    if (pathname.startsWith("/student") && token?.role !== "student") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/instructor/:path*",
    "/student/:path*",
    "/dashboard/:path*", // optional shared area
  ],
};
