import { checkUserAuth } from '@/utils/userService';
import { NextResponse } from "next/server";
import { createToken } from '@/utils/jwtAuth';
import * as cookie from "cookie";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const loginData = {
      user_email: data.email,
      user_password: data.password
    };

    const authCheck = await checkUserAuth(loginData);

    if (!authCheck.success) {
      return NextResponse.json({ success: false, message: authCheck.message }, { status: 401 });
    }

   

        const token = createToken(authCheck.user);
    const response = NextResponse.json({ success: true, message: authCheck.message,UserData: authCheck.user });
    response.headers.set(
      "set-cookie",
      cookie.serialize("LoggedIn-Cookie", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 5 * 60 * 60, 
        path: "/"
      })
    );




    return response;

  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}
