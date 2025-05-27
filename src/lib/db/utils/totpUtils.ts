import crypto from "crypto";
import TOTP from "../models/TOTP";

// Generate a secure random 6-digit code
const generateRandomCode = (): string => {
  // Generate 3 random bytes and convert to hex
  const randomBytes = crypto.randomBytes(3);
  const randomNumber = parseInt(randomBytes.toString("hex"), 16);

  // Convert to 6-digit number and pad with zeros if needed
  const code = (randomNumber % 1000000).toString().padStart(6, "0");
  return code;
};

// Create a new OTP
export const createOTP = async (
  identifier: string,
  type: "REGISTRATION" | "PASSWORD_RESET" | "EMAIL_VERIFICATION"
) => {
  const code = generateRandomCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

  // Update existing OTP or create new one if it doesn't exist
  const otp = await TOTP.findOneAndUpdate(
    { userId: identifier, type },
    {
      code,
      expiresAt,
      used: false,
      createdAt: new Date(),
    },
    { upsert: true, new: true }
  );

  console.log("Created/Updated OTP:", { userId: identifier, type, code });

  return otp;
};

// Verify an OTP
export const verifyOTP = async (
  identifier: string,
  code: string,
  type: "REGISTRATION" | "PASSWORD_RESET" | "EMAIL_VERIFICATION"
) => {
  console.log("Verifying OTP:", { identifier, code, type });

  const otp = await TOTP.findOne({
    userId: identifier,
    code,
    type,
    used: false,
    expiresAt: { $gt: new Date() },
  });

  console.log("Found OTP:", otp);

  if (!otp) {
    // Check if OTP exists but is used
    const usedOTP = await TOTP.findOne({
      userId: identifier,
      code,
      type,
      used: true,
    });
    if (usedOTP) {
      console.log("OTP was already used");
      return false;
    }

    // Check if OTP exists but is expired
    const expiredOTP = await TOTP.findOne({
      userId: identifier,
      code,
      type,
      expiresAt: { $lte: new Date() },
    });
    if (expiredOTP) {
      console.log("OTP is expired");
      return false;
    }

    console.log("No matching OTP found");
    return false;
  }

  otp.used = true;
  await otp.save();
  console.log("OTP verified successfully");

  return true;
};

// Check if user has any active OTPs
export const hasActiveOTP = async (
  identifier: string,
  type: "REGISTRATION" | "PASSWORD_RESET" | "EMAIL_VERIFICATION"
) => {
  const activeOTP = await TOTP.findOne({
    userId: identifier,
    type,
    used: false,
    expiresAt: { $gt: new Date() },
  });

  return !!activeOTP;
};

// Invalidate all OTPs for a user of a specific type
export const invalidateUserOTPs = async (
  identifier: string,
  type: "REGISTRATION" | "PASSWORD_RESET" | "EMAIL_VERIFICATION"
) => {
  await TOTP.updateMany(
    {
      userId: identifier,
      type,
      used: false,
    },
    {
      $set: { used: true },
    }
  );
};
