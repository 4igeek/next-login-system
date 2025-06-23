"use client";

import { signOut } from "next-auth/react";

interface UserData {
  id: string;
  email: string;
  name: string;
}

interface DashboardContentProps {
  user: UserData;
}

export default function DashboardContent({ user }: DashboardContentProps) {
  return (
    <div className="max-w-[63vw] mx-auto">
      <div className="bg-card rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="cursor-pointer px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-muted rounded-md p-4">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Profile Information
            </h2>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                <span className="font-medium">Username:</span>{" "}
                {user.name || "Not set"}
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium">Email:</span>{" "}
                {user.email || "Not set"}
              </p>
            </div>
          </div>

          <div className="bg-muted rounded-md p-4">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Account Security
            </h2>
            <p className="text-muted-foreground mb-4">
              Your account is protected with a secure password and session
              management.
            </p>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign out from all devices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
