"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DarkModeButton from "@/components/ui/darkmodeButton";
export default function VerifyEmailPage() {

    const router = useRouter();
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', {token})
            setVerified(true);
            setTimeout(()=>{
                router.push("/profile")
              },1000)
        } catch (error:any) {
            setError(true);
            console.log(error.response.data);
            setTimeout(()=>{
              router.push("/profile")
            },3000)
        }

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }else{
          setTimeout(()=>{
            router.push("/profile")
          },3000)
        }
    }, [token]);
    
    return(
      <div className="min-h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <DarkModeButton style={{ position: 'absolute', top: '20px', right: '16px' }} />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">

      <h1 className="text-4xl mb-4">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-red font-bold rounded-md">{token ? `${token}` : "no token redirecting back to profile/login..."}</h2>
  
      {verified && (
          <div>
              <h2 className="text-2xl text-green-600">Email Verified redirecting to profile/login</h2>
          </div>
      )}
      {!verified && (
         <div>
         <h2 className="text-2xl text-red-600">Verifying your email please wait...</h2>
     </div>
      )}
      {error && (
          <div>
              <h2 className="text-2xl bg-red-500 text-black text-center">Error redirecting back to profile page try resending verification email...</h2>
          </div>
      )}
      </div>
    </div>
    )

}