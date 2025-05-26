import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import { createOTP, verifyOTP } from "@/lib/db/utils/totpUtils";
import { sendEmail } from "@/lib/sendgrid";

// Request password reset
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectDB();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      // Return success even if user doesn't exist for security
      return NextResponse.json({
        message:
          "If an account exists with this email, you will receive password reset instructions.",
      });
    }

    console.log("Creating password reset OTP for:", email);
    // Create OTP for password reset
    const otp = await createOTP(email, "PASSWORD_RESET");
    console.log("Created password reset OTP:", {
      email,
      type: "PASSWORD_RESET",
      code: otp.code,
    });

    // Send reset email
    await sendEmail({
      to: email,
      subject: "Password Reset Request",
      text: `Your password reset code is: ${otp.code}\n\nThis code will expire in 15 minutes.\n\nIf you didn't request this code, please ignore this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>You have requested to reset your password. Please use the following code to complete the process:</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
            <strong>${otp.code}</strong>
          </div>
          <p>This code will expire in 15 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({
      message:
        "If an account exists with this email, you will receive password reset instructions.",
    });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    return NextResponse.json(
      { error: "Failed to process password reset request" },
      { status: 500 }
    );
  }
}

// Update password with OTP
export async function PUT(request: Request) {
  try {
    const { email, otp, newPassword } = await request.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { error: "Email, OTP, and new password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Verify OTP
    const isValidOTP = await verifyOTP(email, otp, "PASSWORD_RESET");
    if (!isValidOTP) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // Find user and update password
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update password (will be hashed by User model's pre-save hook)
    user.password = newPassword;
    await user.save();

    return NextResponse.json({
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}
