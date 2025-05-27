"use client";

import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { validatePassword } from "@/lib/utils/passwordValidation";

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

type RegistrationStep = "email" | "otp" | "details" | "success";

export default function RegisterForm({
  onSuccess,
  onSwitchToLogin,
}: RegisterFormProps) {
  const [step, setStep] = useState<RegistrationStep>("email");
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    console.log("Sending registration OTP request for:", email);
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log("Registration OTP response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to send OTP");
      }

      setStep("otp");
    } catch (err) {
      console.error("Registration OTP error:", err);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.otp.length !== 6) {
      setError("Please enter a complete 6-digit verification code");
      setIsLoading(false);
      return;
    }

    console.log("Verifying registration OTP:", { email, otp: formData.otp });
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp: formData.otp,
          type: "REGISTRATION",
        }),
      });

      const data = await response.json();
      console.log("Registration OTP verification response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Invalid verification code");
      }

      setStep("details");
    } catch (err) {
      console.error("Registration OTP verification error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Invalid verification code. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const validation = validatePassword(formData.password);
    if (!validation.isValid) {
      setError(validation.errors.join(", "));
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          username: formData.username,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Registration failed");
      }

      setStep("success");
      setTimeout(() => {
        onSwitchToLogin?.();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      const validation = validatePassword(value);
      setPasswordErrors(validation.errors);
    }
  };

  const handleOTPChange = (value: string) => {
    setFormData((prev) => ({ ...prev, otp: value }));
  };

  if (step === "success") {
    return (
      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold text-green-600">
          Registration Successful!
        </h3>
        <p className="text-foreground">
          Your account has been created successfully.
        </p>
        <button
          onClick={onSuccess}
          className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-foreground">
        {step === "email"
          ? "Start Registration"
          : step === "otp"
          ? "Verify Email"
          : "Complete Registration"}
      </h2>
      {error && (
        <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
          {error}
        </div>
      )}
      {step === "email" ? (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 text-foreground"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md bg-background text-foreground border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send Verification Code"}
          </button>
        </form>
      ) : step === "otp" ? (
        <form onSubmit={handleOTPSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium mb-1 text-foreground"
            >
              Verification Code
            </label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={formData.otp}
                onChange={handleOTPChange}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </button>
            <button
              type="button"
              onClick={handleEmailSubmit}
              disabled={isLoading}
              className="w-full text-primary hover:underline text-sm"
            >
              Need a new code? Resend
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleDetailsSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1 text-foreground"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-background text-foreground border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
              minLength={3}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 text-foreground"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-background text-foreground border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
            {passwordErrors.length > 0 && (
              <ul className="mt-1 text-sm text-destructive">
                {passwordErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1 text-foreground"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-background text-foreground border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      )}
      <div className="text-center text-sm mt-4">
        <button
          onClick={onSwitchToLogin}
          className="text-primary hover:underline"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}
