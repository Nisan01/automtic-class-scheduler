import { NextResponse } from "next/server";
import { updateTeacher } from "@/utils/teacherServices";

export async function POST(request) {
  const data = await request.json();

  const res = await updateTeacher(data.t_id, data);

  return NextResponse.json(res);
}
