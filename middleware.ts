import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");

  if (host === "laughterephraim.vercel.app") {
    const url = request.nextUrl.clone();
    url.hostname = "laughterephraim.com";
    url.protocol = "https:";

    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}
