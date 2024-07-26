"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import corruption from "@/components/pages/susi/images/corruption.jpeg";
import kenyaLogo from "./images/kenya-logo.png";
import { emailAndPasswordSignIn, signInWithGoogle } from "@/firebase/auth";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks";

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [userEmail, setUSerEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const user = useUser();

  useEffect(() => {
    if (!user.user) {
      return;
    }
    router.push("/");
  }, [user, router]);

  const loginWithGoogle = async () => {
    try {
      await signInWithGoogle();
      // router.push("/");
      window.location.replace("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error loging in.",
        variant: "destructive",
      });
    }
  };

  const loginWithEmailAndPassword = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    console.log("signing In");
    e.preventDefault();
    if (!userEmail || !userPassword) {
      toast({
        title: "Error",
        description: "Email and Password are required",
        variant: "destructive",
      });
      return;
    }
    try {
      await emailAndPasswordSignIn({
        email: userEmail,
        password: userPassword,
      });
      // router.push("/");
      window.location.replace("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error loging in.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex items-center justify-center w-full">
              <Link href="/">
                <Image
                  src={kenyaLogo}
                  alt="logo"
                  className="w-14 h-14 object-contain"
                />
              </Link>
            </div>
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={userEmail}
                onChange={(e) => setUSerEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onSubmit={(e) => loginWithEmailAndPassword(e)}
              onClick={loginWithEmailAndPassword}
            >
              Login
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={loginWithGoogle}
            >
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={corruption}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
