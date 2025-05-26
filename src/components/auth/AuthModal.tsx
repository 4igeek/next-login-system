"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthTab = "login" | "register";

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-card rounded-lg shadow-lg border border-border">
          {!showForgotPassword && (
            <div className="flex border-b border-border">
              <button
                className={`flex-1 py-4 text-sm font-medium ${
                  activeTab === "login"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("login")}
              >
                Sign In
              </button>
              <button
                className={`flex-1 py-4 text-sm font-medium ${
                  activeTab === "register"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab("register")}
              >
                Create Account
              </button>
            </div>
          )}

          <div className="p-6">
            {showForgotPassword ? (
              <>
                <h2 className="text-xl font-semibold mb-4 text-foreground">
                  Reset Password
                </h2>
                <ForgotPasswordForm
                  onSuccess={onClose}
                  onBack={() => setShowForgotPassword(false)}
                />
              </>
            ) : activeTab === "login" ? (
              <LoginForm
                onSuccess={onClose}
                onForgotPassword={() => setShowForgotPassword(true)}
                onSwitchToRegister={() => setActiveTab("register")}
              />
            ) : (
              <RegisterForm
                onSuccess={onClose}
                onSwitchToLogin={() => setActiveTab("login")}
              />
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
