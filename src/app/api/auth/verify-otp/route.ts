import { NextResponse } from "next/server";
import { verifyOTP } from "@/lib/db/utils/totpUtils";
import { connectDB } from "@/lib/db/connect";

export async function POST(request: Request) {
  try {
    const { email, otp, type } = await request.json();

    if (!email || !otp || !type) {
      return NextResponse.json(
        { error: "Email, OTP, and type are required" },
        { status: 400 }
      );
    }

    if (
      !["REGISTRATION", "PASSWORD_RESET", "EMAIL_VERIFICATION"].includes(type)
    ) {
      return NextResponse.json({ error: "Invalid OTP type" }, { status: 400 });
    }

    await connectDB();

    // Verify OTP
    const isValidOTP = await verifyOTP(
      email,
      otp,
      type as "REGISTRATION" | "PASSWORD_RESET" | "EMAIL_VERIFICATION"
    );
    if (!isValidOTP) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
