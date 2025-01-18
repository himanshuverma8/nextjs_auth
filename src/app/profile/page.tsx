"use client";
import axios from "axios";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TypewriterEffect, TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import DarkModeButton from "@/components/ui/darkmodeButton";

interface UserData {
  _id: string;
  name: string;
  username: string;
  email: string;
  isVerfied: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/profile", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  const [data, setData] = useState<UserData | null>(null);

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response.data);
      setData(response.data.data);
    } catch (error: any) {
      toast.error("Failed to fetch user details.");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const sendEmail = async () => {
    if (data && !data.isVerfied) {
      try {
        const response = await axios.post("/api/users/profile", data);
        toast.success("Email sent successfully");
      } catch (error) {
        toast.error("Unexpected error occurred");
      }
    }
  };

  const words = [
    {
      text: "Welcome",
    },
    {
      text: "back",
    },
    {
      text: `${data?.name || "fetching from database"}`,
      className: "text-blue-500 dark:text-blue-500",
    },
  ];


  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <ToastContainer />
      <DarkModeButton style={{ position: "absolute", top: "20px", right: "16px" }} />
      <p className="text-neutral-600 dark:text-neutral-200 text-base mb-10 text-center">
        {data
          ? data.isVerfied
            ? `Authentication Successful`
            : `A verification email is sent to ${data.email}`
          : "Loading..."}
      </p>
      <TypewriterEffectSmooth words={words}/>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <button
          onClick={logout}
          className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm hover:text-red-500"
        >
          Log Out
        </button>
        <button
          onClick={sendEmail}
          disabled={!data || data.isVerfied}
          className={`w-40 h-10 rounded-xl bg-white text-black border border-black text-sm hover:bg-slate-300 ${
            data?.isVerfied ? "cursor-not-allowed bg-gray-300 hover:bg-gray-300" : ""
          }`}
        >
          {data?.isVerfied ? "Verified" : "Resend Email"}
        </button>
      </div>
    </div>
  );
}
