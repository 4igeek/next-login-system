"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthTab = "login" | "register";
type ResetStep = "request" | "verify" | "verify-success" | "reset" | "success";

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetStep, setResetStep] = useState<ResetStep>("request");

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30"
        aria-hidden="true"
      />

      <div className="fixed inset-0 min-h-screen flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-card rounded-lg shadow-lg border border-border min-h-[370px]"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex border-b border-border"
            >
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
            </motion.div>

            <div className="p-6 flex flex-col justify-center h-full w-full">
              <AnimatePresence mode="wait">
                {showForgotPassword ? (
                  <motion.div
                    key="forgot-password"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ type: "spring", duration: 0.3 }}
                    className="flex items-center justify-center h-full w-full"
                  >
                    <div className="w-full">
                      <h2 className="text-xl font-semibold mb-4 text-foreground">
                        {resetStep !== "verify-success" && "Reset Password"}
                      </h2>
                      <ForgotPasswordForm
                        onSuccess={onClose}
                        onBack={() => setShowForgotPassword(false)}
                        step={resetStep}
                        onStepChange={setResetStep}
                      />
                    </div>
                  </motion.div>
                ) : activeTab === "login" ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ type: "spring", duration: 0.3 }}
                    className="flex items-center justify-center h-full w-full"
                  >
                    <div className="w-full">
                      <LoginForm
                        onSuccess={onClose}
                        onForgotPassword={() => setShowForgotPassword(true)}
                        onSwitchToRegister={() => setActiveTab("register")}
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ type: "spring", duration: 0.3 }}
                    className="flex items-center justify-center h-full w-full"
                  >
                    <div className="w-full">
                      <RegisterForm
                        onSuccess={onClose}
                        onSwitchToLogin={() => setActiveTab("login")}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
