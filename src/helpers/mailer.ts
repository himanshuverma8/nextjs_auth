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

        const url =
        emailType === "VERIFY"
            ? `${process.env.DOMAIN}verifyemail?token=${hashedToken}`
            : `${process.env.DOMAIN}resetpassword?token=${hashedToken}`;
const actionText = emailType === "VERIFY" ? "verify your email" : "reset your password";

const mailOptions = {
    from: 'Support <support@hv.com>',
    to: email,
    subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
    html: `
        <table style="width: 100%; max-width: 600px; margin: auto; font-family: Arial, sans-serif; color: #333; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
            <tr>
                <td style="text-align: center; padding: 10px;">
                    <img src="https://files.hvin.tech/lighting_logo.png" alt="HV Logo" style="width: 50px; height: 50px; margin-bottom: 10px;" />
                </td>
            </tr>
            <tr>
                <td style="text-align: center; padding: 10px;">
                    <h1 style="font-size: 20px; color: #333;">
                        ${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}
                    </h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 10px; text-align: left;">
                    <p>
                        Click <a href="${url}" style="color: #1a73e8; text-decoration: none;">here</a> 
                        to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.
                        Alternatively, you can copy and paste the link below into your browser:
                    </p>
                    <p style="font-size: 0.9em; background-color: #f5f5f5; padding: 10px; border-radius: 5px; word-wrap: break-word;">
                        ${url}
                    </p>
                </td>
            </tr>
            <tr>
                <td style="text-align: center; padding: 10px;">
                    <p style="font-size: 0.8em; color: #888;">
                        If you didn't request this email, please ignore it.
                    </p>
                    <p style="font-size: 0.8em; color: #888;">
                        For any assistance, contact us at <a href="mailto:support@hv.com" style="color: #1a73e8; text-decoration: none;">support@hv.com</a>.
                    </p>
                </td>
            </tr>
        </table>
    `,
    text: `
        ${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}
        Click the link below to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}:
        ${url}
        If you didn't request this email, please ignore it. Contact us at hvincloud@gmail.com for assistance.
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
