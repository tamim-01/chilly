import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/") {
    const defaultLocale = "en";
    return NextResponse.redirect(
      new URL(`/${defaultLocale}`, request.url),
      308
    );
  }
  return NextResponse.next();
}
