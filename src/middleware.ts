import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookie = await cookies();
  const defaultLang = "en";
  const { pathname } = request.nextUrl;
  if (pathname === "/") {
    const lang = cookie.get("locale")?.value || defaultLang;
    console.log(lang);
    return NextResponse.redirect(new URL(`/${lang}`, request.url), 307);
  }
  return NextResponse.next();
}
