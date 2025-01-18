"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ToastContainer, toast } from 'react-toastify';
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import DarkModeButton from "@/components/ui/darkmodeButton";
import Spinner from "@/components/ui/spinner";
// Define a type for user
interface User {
  name: string,
  email: string;
  password: string;
  username: string;
}


export default function ForgotPasswordPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: ""
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword", user);
      toast.success("Reset Password Link Sent Successfully!");
    } catch (error: any) {
      toast.error("something went wrong try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    <div className="z-10 container flex justify-center items-center min-h-screen w-4/5 md:w-full">
    <ToastContainer />
    {loading?(<Spinner/>):""}
    <DarkModeButton style={{ position: 'absolute', top: '20px', right: '16px' }} />
  <div className="max-w-md w-full mx-auto rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
 <h2 className="text-center font-bold text-xl text-neutral-800 dark:text-neutral-200">
 {loading ? "Processing..." : "Reset Your Password"}
 </h2>
 {/* <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
   <span className="text-blue-300"><a href="/signup">Signup</a></span> with your username and password if you don't have an account with us.
 </p> */}

 <form className="my-8" onSubmit={onForgotPassword}>



  
   {/* <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
     <LabelInputContainer>
       <Label htmlFor="name">Your name</Label>
       <Input 
       value={user.name}
       onChange={(e) => setUser({ ...user, name: e.target.value })}
       id="firstname" placeholder="enter your name" type="text" 
       />
     </LabelInputContainer>
     <LabelInputContainer>
       <Label htmlFor="lastname">Last name</Label>
       <Input
        value={user.username}
        onChange={(e) => setUser({ ...user, lastname: e.target.value })}
        id="lastname" placeholder="enter your lastname" type="text" 
        />
     </LabelInputContainer>
   </div> */}
   <LabelInputContainer className="mb-4">
     <Label htmlFor="email">Email</Label>
     <Input 
      value={user.email}
      onChange={(e) => setUser({ ...user, email: e.target.value })}
     id="email" placeholder="enter your email" type="text" 
     />
   </LabelInputContainer>
   {/* <LabelInputContainer className="mb-4">
     <Label htmlFor="email">Email Address</Label>
     <Input 
      value={user.email}
      onChange={(e) => setUser({ ...user, email: e.target.value })}
     id="email" placeholder="enter your email" type="email" 
     />
   </LabelInputContainer> */}
   {/* <LabelInputContainer className="mb-4">
     <Label htmlFor="password">Password</Label>
     <Input
      value={user.password}
     onChange={(e) => setUser({ ...user, password: e.target.value })}
      id="password" placeholder="••••••••" type="password" 
      />
   </LabelInputContainer> */}
   {/* <LabelInputContainer className="mb-8">
     <Label htmlFor="twitterpassword">Your twitter password</Label>
     <Input
       id="twitterpassword"
       placeholder="••••••••"
       type="twitterpassword"
     />
   </LabelInputContainer> */}
<p className="text-blue-300 text-right mb-2 text-sm"><Link href="/login">Login?</Link></p>
<button
  className={`bg-gradient-to-br relative group/btn 
    ${buttonDisabled ? 'bg-black text-white cursor-not-allowed' : 'from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600'}
    block dark:bg-zinc-800 w-full dark:text-white text-white  rounded-md h-10 font-medium 
    shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] 
    dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]`}
  type="submit"
  disabled={buttonDisabled}
>
  Reset Password &rarr;
  <BottomGradient />
</button>

   {/* <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

   <div className="flex flex-col space-y-4">
     <button
       className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
       type="submit"
     >
       <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
       <span className="text-neutral-700 dark:text-neutral-300 text-sm">
         GitHub
       </span>
       <BottomGradient />
     </button>
     <button
       className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
       type="submit"
     >
       <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
       <span className="text-neutral-700 dark:text-neutral-300 text-sm">
         Google
       </span>
       <BottomGradient />
     </button>
     <button
       className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
       type="submit"
     >
       <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
       <span className="text-neutral-700 dark:text-neutral-300 text-sm">
         OnlyFans
       </span>
       <BottomGradient />
     </button>
   </div> in future this authentication methods will be enabled*/}
 </form>
</div>
</div>
  </div>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
 
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
