"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Define the type for the user data
interface UserData {
  _id: string;
  username: string;
  email: string;
}

export default function ProfilePage() {
    const router = useRouter();
    
    const [data, setData] = useState<UserData | 'nothing'>('nothing');
    
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
            const response = await axios.get('/api/users/me');
            console.log(response.data);
            setData(response.data.data); 
        } catch (error: any) {
            toast.error("Failed to fetch user details.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="p-1 rounded bg-purple-500">
                {data === 'nothing' ? "Nothing" : 
                    <Link href={`/profile/${data._id}`}>
                        {`${data.username} ${data.email}`}
                    </Link>
                }
            </h2>
            <hr />
            <button
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
            <button
                onClick={getUserDetails}
                className="bg-purple-500 mt-4 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
                Get User Details
            </button>
        </div>
    );
}
