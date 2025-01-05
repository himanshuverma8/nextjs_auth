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

        const mailOptions = {
            from: 'hv <no-reply@hv.com>',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>
                Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> 
                to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below into your browser: <br> 
                ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
        };

        // Send the email
        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        console.error("Email sending error:", error.message);
        throw new Error(error.message || "Failed to send email");
    }
};
