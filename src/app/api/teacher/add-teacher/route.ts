import { insertTeacher } from '@/utils/teacherServices';
import { json } from 'drizzle-orm/pg-core';
import { NextResponse } from 'next/server';

export async function POST(request:Request){
 
    const data=await request.json();


     try {

        const sendTeacherData=await insertTeacher(data)
        if(!sendTeacherData.success){
            return NextResponse.json({success:false,message:sendTeacherData.message
            })
        }

        return NextResponse.json({
            success:true,message:"Teacher inserted Successfully"
        })

        
     } catch (error) 
     {
        console.log("error while fetching api",error)
          return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 })
        
     }


}