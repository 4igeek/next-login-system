import { NextResponse } from "next/server";
import { verifyOTP } from "@/lib/db/utils/totpUtils";
import { connectDB } from "@/lib/db/connect";
import User from "@/lib/db/models/User";

export async function POST(request: Request) {
  try {
    const { email, username, password, otp } = await request.json();

    if (!email || !username || !password || !otp) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Verify OTP
    const isValidOTP = await verifyOTP(email, otp, "REGISTRATION");
    if (!isValidOTP) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // Check if username is already taken
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return NextResponse.json(
        { error: "Username is already taken" },
        { status: 400 }
      );
    }

    // Create new user (password will be hashed by the User model's pre-save hook)
    const user = await User.create({
      email,
      username,
      password,
    });

    return NextResponse.json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
