"use client"
import React, { useEffect, useState } from 'react'
import UserContext from './userContext'

export default function UserProvider({children}) {
   
    const [user,setUser]=useState(undefined)

    useEffect(()=>{
        try {
          
            
        const getCurrentUser=async()=>{
    const res = await fetch("/api/auth/current", { cache: "no-store" });

            const data=await res.json();
            setUser(data)
        }
              getCurrentUser();
            
        } catch (error) {
            console.log("Couldnt fetch Current User Info",error)
            setUser(undefined)
            
        }

      
    },[])



  return (
   <>
   <UserContext.Provider value={{user,setUser}}>{children}</UserContext.Provider>
   
   </>
        
 
        
        
 
  )
}

