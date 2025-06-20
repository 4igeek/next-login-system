"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import AuthModal from "./auth/AuthModal";
import { Plus, LayoutDashboard } from "lucide-react";

export default function NavBar() {
  const { data: session } = useSession();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <nav className="bg-zinc-800 border-b border-zinc-700 h-[4rem]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              href="/"
              className="flex items-center text-white font-bold text-xl"
            >
              Next Login
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link
                  href="/new-post"
                  className="text-zinc-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1"
                >
                  <Plus size={16} /> New Post
                </Link>
                <Link
                  href="/dashboard"
                  className="text-zinc-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1"
                >
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-zinc-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
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
  );
}
