"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

// Define a type for user
interface User {
  email: string;
  password: string;
  username: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState<User>({ email: "", password: "", username: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Signup successful!");
      router.push("/login");
    } catch (error: any) {
      console.error("Signup failed", error.message);
      toast.error(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { email, password, username } = user;
    setButtonDisabled(!(email && password && username));  // Disable button if fields are empty
  }, [user]);

  return (
    <div className="bg-gray-900 text-white flex justify-center items-center min-h-screen">
      <div className="bg-gray-800 rounded-lg p-8 shadow-lg max-w-sm w-full">
        <h2 className="text-center text-3xl mb-6 font-bold">
          {loading ? "Processing..." : "Signup"}
        </h2>
        <form onSubmit={onSignup}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2 text-gray-300"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full px-3 py-2 bg-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2 text-gray-300"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 bg-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2 text-gray-300"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 bg-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <button
            className={`w-full px-3 py-2 mt-2 rounded-lg text-lg font-medium ${
              buttonDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-500"
            }`}
            type="submit"
            disabled={buttonDisabled}
          >
            Signup
          </button>
        </form>
        <Link className="flex justify-center items-center mt-4 text-blue-300 hover:underline" href="/login">
          Log in now
        </Link>
      </div>
    </div>
  );
}
