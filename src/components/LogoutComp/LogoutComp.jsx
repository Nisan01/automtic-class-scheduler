"use client";

import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import UserContext from "@/context/userContext";
import { useContext } from "react";



export default function LogoutComp() {

 const { user, setUser } = useContext(UserContext);


  const router = useRouter();

  const Logout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("api/auth/logout", {
        method: "POST",
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setUser(null); 

      
        router.push("/login");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Something went wrong during logout");
    }
  };

  return (
 
      <button
        onClick={Logout}
        className="bg-green-600 cursor-pointer hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-green-400/50 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        Logout
      </button>
   
  );
}
