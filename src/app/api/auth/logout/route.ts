import { NextResponse } from "next/server";
import * as cookie from "cookie";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.headers.set(
    "Set-Cookie",
    cookie.serialize("LoggedIn-Cookie", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0), 
      path: "/"
    })
  );
  return response;
}
