import { eq } from "drizzle-orm";
import { db } from "./dbConfig";
import { teachersData } from "./schema";

export async function insertTeacher(teacherData) {
  try {
    const {
      t_id,
      name,
      email,
      maxLoad,
      subjectExpertise,
      availableDays
    } = teacherData;


  const existing = await db
      .select()
      .from(teachersData)
      .where(eq(teachersData.t_id, t_id));

    if (existing.length > 0) {
      return { success: false, message: "Teacher ID already exists!" };
    }
    

    const result = await db.insert(teachersData).values({
      t_id,
      name,
      email,
      maxLoad: Number(maxLoad), 
      subjectExpertise,         
      availableDays          
    }).returning();

    return { success: true, result };
  } catch (err) {
    console.error("Error inserting teacher:", err);
    return { success: false, message: "Failed to insert teacher" };
  }
}



export async function getTeachers(){

  try {
    const result=await db.query.teachersData.findMany()
    return{success:true,message:"Successfully Fetched ",teacherData:result}

    
  } catch (error) {

    console.log(error)
  return {success:false,message:"Unable to fetch User from Database"}
    
  }

}



export async function updateTeacher(t_id, data) {
  try {
    const result = await db
      .update(teachersData)
      .set({
        name: data.name,
        email: data.email,
        maxLoad: Number(data.maxLoad),
        subjectExpertise: data.subjectExpertise,
        availableDays: data.availableDays,
      })
      .where(eq(teachersData.t_id, t_id))
      .returning();

    return { success: true, result };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Update failed" };
  }
}






export async function removeTeachers(teacher_id:string){

  try {
    const result=await db.delete(teachersData).where(eq(teachersData.t_id,teacher_id)).returning();
  
    if(result.length > 0){
      return{success:true,message:"Successfully Deleted Teacher"
    }
    }

    else{
       return{success:false,message:"Problem while Deleting Teacher"
    }

    }

 

    
  } catch (error) {

    console.log(error)
  return {success:false,message:"Error while deleting"}
    
  }

}



