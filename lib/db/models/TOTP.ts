import mongoose from "mongoose";

const totpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
totpSchema.index({ userId: 1, type: 1 });

const TOTP = mongoose.models.TOTP || mongoose.model("TOTP", totpSchema);

export default TOTP;
