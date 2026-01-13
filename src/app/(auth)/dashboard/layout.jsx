"use client"
import DashboardNav from "@/components/DashboardNav/DashnoardNav"


export default function AuthLayout({ children }) {
  return (

   <> 
     <DashboardNav className="z-30"/>
     <div className="px-6">    {children}</div>
 
</>
   
  );
}
