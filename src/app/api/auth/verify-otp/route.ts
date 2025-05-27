import { NextResponse } from "next/server";
import { verifyOTP } from "@/lib/db/utils/totpUtils";
import { connectDB } from "@/lib/db/connect";

export async function POST(request: Request) {
  console.log("\n🔍 [API: verify-otp] Request received");
  try {
    const body = await request.json();
    console.log("📦 Request body:", body);
    
    const { email, otp, type } = body;

    if (!email || !otp || !type) {
      console.log("❌ Missing required fields:", { email: !!email, otp: !!otp, type: !!type });
      return NextResponse.json(
        { error: "Email, OTP, and type are required" },
        { status: 400 }
      );
    }

    if (
      !["REGISTRATION", "PASSWORD_RESET", "EMAIL_VERIFICATION"].includes(type)
    ) {
      console.log("❌ Invalid OTP type:", type);
      return NextResponse.json({ error: "Invalid OTP type" }, { status: 400 });
    }

    console.log("🔄 Connecting to database...");
    await connectDB();
    console.log("✅ Database connected");

    // Verify OTP
    console.log("🔍 Starting OTP verification...");
    const isValidOTP = await verifyOTP(
      email,
      otp,
      type as "REGISTRATION" | "PASSWORD_RESET" | "EMAIL_VERIFICATION"
    );
    
    if (!isValidOTP) {
      console.log("❌ OTP verification failed");
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    console.log("✅ OTP verification successful");
    return NextResponse.json({
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("❌ Error in verify-otp route:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  } finally {
    console.log("🔍 [API: verify-otp] Request completed\n");
  }
}
