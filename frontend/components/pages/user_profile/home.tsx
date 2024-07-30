"use client";

import React, { useEffect } from "react";
import UserProfileContents from "./user_profile";
import { useUser } from "@/hooks";
import { PacmanLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const UserProfileHome = () => {
  const router = useRouter();
  const user = useUser();

  return (
    <div className="min-h-screen flex items-center justify-center">
      {!user.user && (
        <div className="flex justify-center items-center">
          <PacmanLoader size={30} />
        </div>
      )}
      {user.user && <UserProfileContents userId={user.user?.uid} />}
    </div>
  );
};

export default UserProfileHome;
