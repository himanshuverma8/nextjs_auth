"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ToastContainer, toast } from 'react-toastify';
import DarkModeButton from "@/components/ui/darkmodeButton";
import Spinner from "@/components/ui/spinner";
// Define a type for user
interface User {
  name: string,
  email: string;
  password: string;
  username: string;
}
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login successful!");
      setTimeout(()=>{
        router.push("/profile");
      },500)
    } catch (error: any) {
      toast.error("Login failed please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email && user.password) {
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
 {loading ? "Processing..." : "Login Now"}
 </h2>
 <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
   <Link className="text-blue-300" href="/signup">Signup</Link> with your username and password if you don't have an account with us.
 </p>

 <form className="my-8" onSubmit={onLogin}>



  
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
   <LabelInputContainer className="mb-4">
     <Label htmlFor="password">Password</Label>
     <Input
      value={user.password}
     onChange={(e) => setUser({ ...user, password: e.target.value })}
      id="password" placeholder="••••••••" type="password" 
      />
   </LabelInputContainer>
   {/* <LabelInputContainer className="mb-8">
     <Label htmlFor="twitterpassword">Your twitter password</Label>
     <Input
       id="twitterpassword"
       placeholder="••••••••"
       type="twitterpassword"
     />
   </LabelInputContainer> */}
<p className="text-blue-300 text-right mb-2 text-sm"><Link href="/forgotpassword">Forgot Password?</Link></p>
<button
  className={`bg-gradient-to-br relative group/btn 
    ${buttonDisabled ? 'bg-black text-white cursor-not-allowed' : 'from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600'}
    block dark:bg-zinc-800 w-full dark:text-white text-white  rounded-md h-10 font-medium 
    shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] 
    dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]`}
  type="submit"
  disabled={buttonDisabled}
>
  Login &rarr;
  <BottomGradient />
</button>

   <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

   <div className="flex flex-col space-y-4">
    <button
      type="button"
      onClick={() => signIn('google')}
      className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
    >
     <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
<path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>
      <span className="text-neutral-700 dark:text-neutral-300 text-sm">
        Sign In With Google
      </span>
      <BottomGradient />
    </button>
     <button
      type="button"
      onClick={() => signIn('github')}
      className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
    >
     <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 64 64">
<path d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z"></path>
</svg>
      <span className="text-neutral-700 dark:text-neutral-300 text-sm">
        Sign In With Github
      </span>
      <BottomGradient />
    </button>
   </div>
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
