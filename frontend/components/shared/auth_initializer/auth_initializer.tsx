"use client";
import { useUserSession } from "@/hooks";
import { User } from "firebase/auth";

interface HeaderProps {
  initialUser: User | null;
}

const AuthInitializer: React.FC<HeaderProps> = ({ initialUser }) => {
  useUserSession(initialUser);

  return <></>;
};

export default AuthInitializer;
