import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { validatePassword } from "@/lib/utils/passwordValidation";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    minlength: [3, "Username must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: function (password: string) {
        const validation = validatePassword(password);
        if (!validation.isValid) {
          throw new Error(validation.errors.join(", "));
        }
        return true;
      },
      message: (props: { error: string }) => props.error,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: Error | unknown) {
    next(error instanceof Error ? error : new Error('Failed to hash password'));
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
