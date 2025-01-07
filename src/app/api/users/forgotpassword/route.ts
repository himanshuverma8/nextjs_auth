import {connect} from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const { email} = reqBody

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "Invalid token"}, {status: 400});
        }
        console.log(user);
        
        await sendEmail({email, emailType: "RESET", userId: user._id})
        return NextResponse.json({
            message: "Reset email send successfully",
            success: true,
        })

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
        
    }

}