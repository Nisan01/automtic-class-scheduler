"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { ValidateLogin } from "@/services/loginService";
import { useParams } from "next/navigation";
import {Button} from"@/components/ui/Button"
import UserContext from "@/context/userContext";
import { useContext } from "react";

export default function LoginComp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const{setUser}=useContext(UserContext);

  const searchParams=useSearchParams();
  const error=searchParams.get("error")


  useEffect(()=>{

     if (error === "login-required") {
      toast.error("Please log in to continue",{
        position:"top-center"
      });
    }

  },[error])

  const router = useRouter();  
  


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
 
 
    try { 
      const res=await ValidateLogin(email, password);
 
       if (res.success)
         
         { 
          setUser(res)
          toast.success(res.message||"Login successful!");


       
      router.push("/dashboard");
 
        
        
        } 
         else { toast.error(res.message || "Invalid email or password"); } } 
    catch (error) { console.log(error) 
      toast.error("Something went wrong!");

    }


  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <div className="relative z-20 flex w-[28rem] px-5 sm:px-6 lg:px-8">
        <div className="w-full relative space-y-8 rounded-lg bg-gray-800 p-8 shadow-2xl">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[50%] h-screen bg-indigo-500/20 rounded-full blur-[250px] opacity-50"></div>

          <div>
            <h2 className="text-center text-3xl font-extrabold text-white">
              Admin Login
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="block w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="block w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-400 text-indigo-500 focus:ring-indigo-400"
                  disabled={loading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>




          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
