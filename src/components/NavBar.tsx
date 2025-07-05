"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import AuthModal from "./auth/AuthModal";
import { LayoutDashboard } from "lucide-react";
import NewNavBar from "./NavBarItems";

export default function NavBar() {
  const { data: session, status } = useSession();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <nav className="bg-card border-b border-border h-[4rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link
                href="/"
                className="flex items-center text-foreground font-bold text-xl"
              >
                Next Login
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <NewNavBar />
              {status === "loading" || isSigningOut ? (
                <div className="w-24 h-8 bg-muted animate-pulse rounded-md"></div>
              ) : session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1"
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="cursor-pointer text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Join / Sign In
                </button>
              )}
            </div>
          </div>
        </div>
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </nav>
    </>
  );
}
