"use client"
import { useRouter } from "next/navigation";
import DarkModeButton from "@/components/ui/darkmodeButton";
export default function UserProfile({params}: any) {
    const router = useRouter();
    router.push("/profile")
    return (
        <div className="min-h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <DarkModeButton style={{ position: 'absolute', top: '20px', right: '16px' }} />
        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          Profile Page
          <span className=" p-2 ml-2 rounded bg-orange-500 text-black">{params.id}</span>
        </p>
      </div>
    )
}