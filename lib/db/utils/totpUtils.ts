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
  userId: string,
  type: "REGISTRATION" | "PASSWORD_RESET" | "EMAIL_VERIFICATION"
) => {
  const code = generateRandomCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

  const otp = await TOTP.create({
    userId,
    code,
    type,
    expiresAt,
  });

  return otp;
};

// Verify an OTP
export const verifyOTP = async (
  userId: string,
  code: string,
  type: "REGISTRATION" | "PASSWORD_RESET" | "EMAIL_VERIFICATION"
) => {
  const otp = await TOTP.findOne({
    userId,
    code,
    type,
    used: false,
    expiresAt: { $gt: new Date() },
  });

  if (!otp) return false;

  otp.used = true;
  await otp.save();

  return true;
};

// Check if user has any active OTPs
export const hasActiveOTP = async (
  userId: string,
  type: "REGISTRATION" | "PASSWORD_RESET" | "EMAIL_VERIFICATION"
) => {
  const activeOTP = await TOTP.findOne({
    userId,
    type,
    used: false,
    expiresAt: { $gt: new Date() },
  });

  return !!activeOTP;
};

// Invalidate all OTPs for a user of a specific type
export const invalidateUserOTPs = async (
  userId: string,
  type: "REGISTRATION" | "PASSWORD_RESET" | "EMAIL_VERIFICATION"
) => {
  await TOTP.updateMany(
    {
      userId,
      type,
      used: false,
    },
    {
      $set: { used: true },
    }
  );
};
