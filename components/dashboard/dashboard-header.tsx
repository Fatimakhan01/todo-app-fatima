"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const userName = "Fatima"; 

  const router = useRouter();

const handleLogout = async () => {
  await signOut();
  router.push("/login");
};

  return (
    <header className="w-full bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <div className="text-xl font-bold text-blue-600">
          TaskFlow
        </div>

        <div className="text-lg font-semibold text-gray-700">
          My Tasks
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-600 font-medium">
            {userName}
          </span>

          <Button onClick={handleLogout}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}