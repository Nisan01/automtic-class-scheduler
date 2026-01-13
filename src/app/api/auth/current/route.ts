import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUserFromToken } from "@/utils/userService";

export async  function GET(request:NextRequest){

 const token = request.cookies.get("LoggedIn-Cookie")?.value;
 
 if(!token){

    return NextResponse.json({success:false,message:"No Token in Cookies"},{
        status:401
    })
    
 }

 try {

     const result=await jwt.verify(token,process.env.JWT_SECRET_KEY);

 const checkUserFromDb=await getUserFromToken(result);
 return NextResponse.json(checkUserFromDb);
    
 } catch (error) {

    console.log(error,"Error in JWT")
    return NextResponse.json({
        success:false,message:"Error in JWT Verfication"
    })
    
 }
 









}