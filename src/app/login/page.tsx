"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login successful!");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message || "Login failed. Please try again.");
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
    <div className="bg-gray-900 text-white flex justify-center items-center min-h-screen">
      <div className="bg-gray-800 rounded-lg p-8 shadow-lg max-w-sm w-full">
        <h2 className="text-center text-3xl mb-6 font-bold">
          {loading ? "Logging in..." : "Login"}
        </h2>
        <form onSubmit={onLogin}>
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
            className={`w-full px-3 py-2 mt-2 rounded-lg text-lg font-medium shadow-2xl ${
              buttonDisabled
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-400 hover:bg-blue-500"
            }`}
            type="submit"
            disabled={buttonDisabled}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <Link
          className="flex justify-center items-center mt-4 text-blue-300 hover:underline"
          href="/signup"
        >
          Signup now
        </Link>
      </div>
    </div>
  );
}
