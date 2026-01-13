import { NextRequest, NextResponse } from "next/server";
import { getTeachers } from "@/utils/teacherServices";

export async function GET(req:Request) {
  try {
    const res = await getTeachers();

    if (res.success) {
      return NextResponse.json({
        success: true,
        message: res.message,
        teachers: res.teacherData
      });
    } else {
      return NextResponse.json({
        success: false,
        message: res.message
      }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Error fetching teachers"
    }, { status: 500 });
  }
}
