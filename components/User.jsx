"use client";
import React from "react";
import { useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();
  return (
    <>
      <div>client side rendered session data</div>
      <div className="p-2">{JSON.stringify(session)}</div>
    </>
  );
};

export default User;
