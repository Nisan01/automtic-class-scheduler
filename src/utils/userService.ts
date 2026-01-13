

import { db } from "./dbConfig";
import { users } from "./schema";
import { eq } from "drizzle-orm";

export async function checkUserAuth(loginData: any) {
  const { user_email, user_password } = loginData;

 

  
  const result=await db.query.users.findMany({where:eq(users.email,user_email)}) 


  const user = result[0];
  


  if (!user || user.password !== user_password) {
    return { success: false, message: "Invalid email or password" };
  }

  if (user.role !== "admin") {
  return { success: false, message: "You are not an Admin" };
}

  const { password, ...safeUser } = user;
  return { success: true, user:safeUser,message:"Successfully Logged In" };
}

    
 
export async function getUserFromToken(tokenUser:any){


  try {

   const res = await db.query.users.findMany({
  columns: { password: false },
  where: eq(users.id, tokenUser.id)
});

    


    if(res.length==0){
      return{success:false,message:"Didnot Find User from Token"}

    }

   const UserData=res[0];

   return {success:true,UserData};


    
  } catch (error) {

    return{success:false,message:"Failed to get User From Token"}
    
  }



}



