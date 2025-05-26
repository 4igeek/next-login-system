import { NextResponse } from "next/server";
import { createOTP } from "@/lib/db/utils/totpUtils";
import { connectDB } from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import { sendEmail } from "@/lib/sendgrid";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    console.log("Creating registration OTP for:", email);
    // Create OTP using email as identifier for registration
    const otp = await createOTP(email, "REGISTRATION");
    console.log("Created registration OTP:", {
      email,
      type: "REGISTRATION",
      code: otp.code,
    });

    // Send OTP via email
    const emailResult = await sendEmail({
      to: email,
      subject: "Your Registration Verification Code",
      text: `Your registration verification code is: ${otp.code}\n\nThis code will expire in 15 minutes.\n\nIf you didn't request this code, please ignore this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Registration Verification</h2>
          <p>Thank you for registering. Please use the following verification code to complete your registration:</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
            <strong>${otp.code}</strong>
          </div>
          <p>This code will expire in 15 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
      `,
    });

    if (!emailResult.success) {
      const errorMessage = emailResult.error?.message || "Unknown error";
      console.error(
        "SendGrid Error Details:",
        JSON.stringify(emailResult.error, null, 2)
      );
      throw new Error(`Failed to send verification email: ${errorMessage}`);
    }

    return NextResponse.json({
      message: "Verification code sent successfully",
    });
  } catch (error: any) {
    console.error("Error in send-otp route:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send verification code" },
      { status: 500 }
    );
  }
}
