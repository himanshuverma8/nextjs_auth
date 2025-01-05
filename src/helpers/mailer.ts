import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';

interface SendEmailParams {
    email: string;
    emailType: "VERIFY" | "RESET";
    userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailParams): Promise<any> => {
    try {
        if (!email || !emailType || !userId) {
            throw new Error("Missing required parameters");
        }

        // Create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        // Update the user model with the appropriate token
        const updateFields =
            emailType === "VERIFY"
                ? { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
                : { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 };

        await User.findByIdAndUpdate(userId, updateFields);

        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const url = `${process.env.DOMAIN}verifyemail?token=${hashedToken}`;
const actionText = emailType === "VERIFY" ? "verify your email" : "reset your password";

const mailOptions = {
    from: 'hv <no-reply@hv.com>',
    to: email,
    subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
    html: `
        <div style="
            background-image: url('https://files.hvin.tech/lighting_logo.png'); 
            background-size: cover; 
            background-position: center; 
            padding: 20px;
            opacity: 40%;
            font-family: Arial, sans-serif; 
            color: #333;">
            <div style="background-color: rgba(255, 255, 255, 0.9); 
                        padding: 20px; 
                        border-radius: 8px; 
                        max-width: 600px; 
                        margin: auto;">
                <h1 style="text-align: center;">${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}</h1>
                <p>
                    Click <a href="${url}" style="color: #1a73e8; text-decoration: none;">here</a> 
                    to ${actionText} or copy and paste the link below into your browser and make sure you are logged in with your email and password
                </p>
                <p style="
                    font-size: 0.9em; 
                    background-color: #f5f5f5; 
                    padding: 10px; 
                    border-radius: 5px; 
                    word-wrap: break-word;">
                    ${url}
                </p>
            </div>
        </div>
    `,
};

        // Send the email
        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        console.error("Email sending error:", error.message);
        throw new Error(error.message || "Failed to send email");
    }
};
