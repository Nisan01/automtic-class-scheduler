import {  removeTeachers } from '@/utils/teacherServices';
import { json } from 'drizzle-orm/pg-core';
import { NextResponse } from 'next/server';

export async function POST(request:Request){
 
    



     try {

        const {teacher_id}=await request.json();
    if (!teacher_id) {
      return NextResponse.json({
        success: false,
        message: "teacher_id is required"
      });
    }

        const sendTeacherData=await removeTeachers(teacher_id)
        if(!sendTeacherData.success){
            return NextResponse.json({success:false,message:sendTeacherData.message
            })
        }

        return NextResponse.json({
            success:true,message:"Teacher Deleted Successfully"
        })

        
     } catch (error) 
     {
        console.log("error while fetching api",error)
          return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 })
        
     }


}