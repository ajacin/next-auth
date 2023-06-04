"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status !== "authenticated") {
      router.push("/login");
    }
  }, [session]);

  return (
    <div>
      <h1 className="p-2">Dashboard</h1>
      <p className="p-2 m-2">Hello {session?.user?.name}</p>
      <button
        onClick={() => signOut()}
        className="p-2 m-2 bg-blue-600 text-white"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
