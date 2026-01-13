
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation"; 

import Navbar from "@/components/Navbar/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorks from "@/components/sections/HowItWorks";


export default function Page() {

  const router = useRouter(); 
 


  const howItWorksRef = useRef(null);
  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
  };
 
  
  return (
    <div className="mt-20">
 
      <Navbar scrollToHowItWorks={scrollToHowItWorks}  /> 
      
  
      
      <HeroSection />
      <HowItWorks ref={howItWorksRef} />
    </div>
  );
}