import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import DashboardContent from "@/components/dashboard/DashboardContent";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    // Redirect to home page where the auth modal can be shown
    redirect("/");
  }

  // Ensure we're passing serializable data
  const userData = {
    id: session.user.id,
    email: session.user.email || "",
    name: session.user.name || "",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardContent user={userData} />
    </div>
  );
}
