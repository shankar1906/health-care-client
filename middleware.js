import { NextResponse } from "next/server"

export function middleware(request) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === "/"

  const token = request.cookies.get("token")?.value || ""
  const role = request.cookies.get("role")?.value || ""

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // Role-based access control
  if (path.startsWith("/dashboard")) {
    if (role === "doctor" && !path.includes("doctor")) {
      return NextResponse.redirect(new URL("/dashboard?role=doctor", request.nextUrl));
    }
    if (role === "patient" && !path.includes("patient")) {
      return NextResponse.redirect(new URL("/dashboard?role=patient", request.nextUrl));
    }
    if (role === "admin" && !path.includes("admin")) {
      return NextResponse.redirect(new URL("/dashboard?role=admin", request.nextUrl));
    }
  }
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
}

