import mongoose from "mongoose";

const totpSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["REGISTRATION", "PASSWORD_RESET", "EMAIL_VERIFICATION"],
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  used: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries and automatic expiration
totpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
totpSchema.index({ userId: 1, type: 1 }, { unique: true });

// Force model recreation to ensure schema update
const modelName = "TOTP";
if (mongoose.models[modelName]) {
  delete mongoose.models[modelName];
}

const TOTP = mongoose.model(modelName, totpSchema);

export default TOTP;
