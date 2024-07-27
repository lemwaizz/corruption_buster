"use client";

import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import kenyaLogo from "./images/kenya-logo.png";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AskAi } from "../ask_ai";
import { useUser } from "@/hooks";
import { signOut } from "@/firebase/auth";
import { useRouter } from "next/navigation";

const Header = () => {
  const user = useUser();
  const router = useRouter();

  const logoutClicked = async () => {
    console.log("Logging out");
    console.log(user);
    await signOut();
    window.location.reload();
  };

  const contactUsScroll = () => {
    const section = document.querySelector("#contact_us_section");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const aboutUsScroll = () => {
    const section = document.querySelector("#about_us_section");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="border-b-[1px] border-[#cecece] fixed left-0 right-0 top-0 bg-white z-50">
      <div className="flex justify-between h-[90px] px-5 md:px-12 items-center max-w-screen-xl mx-auto">
        <Link
          href="/"
          className="text-xl text-black flex items-center gap-2 md:text-2xl font-outfit"
        >
          <Image
            src={kenyaLogo}
            alt="logo"
            className="w-10 h-10 md:w-14 md:h-14 object-contain"
          />
          <span>Corruption Buster</span>
        </Link>
        <nav className="flex items-center gap-x-2 md:gap-x-10">
          <div className="hidden md:flex">
            <ul className="flex gap-x-5 items-center">
              <li className="">
                <Button variant="link" asChild>
                  <Link href="/" className="text-base font-outfit">
                    Home
                  </Link>
                </Button>
              </li>
              <li className="">
                <Button
                  variant="link"
                  className="text-base font-outfit"
                  onClick={aboutUsScroll}
                >
                  About Us
                </Button>
              </li>
              <li className="">
                <Button variant="link" asChild>
                  <Link href="/politicians" className="text-base font-outfit">
                    Politicians
                  </Link>
                </Button>
              </li>
              <li className="">
                <Button
                  variant="link"
                  className="text-base font-outfit"
                  onClick={contactUsScroll}
                >
                  Contact Us
                </Button>
              </li>
              {!user.user && (
                <li className="">
                  <Button asChild>
                    <Link href="login">Login</Link>
                  </Button>
                </li>
              )}
            </ul>
          </div>
          {user.user && (
            <>
              <AskAi />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src={
                        user.user.photoURL ??
                        "https://hds.hel.fi/images/foundation/visual-assets/placeholders/user-image-l@3x.png"
                      }
                    />
                    <AvatarFallback>DP</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* <DropdownMenuItem>My Profile</DropdownMenuItem> */}
                  <DropdownMenuItem onClick={logoutClicked}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          {/* <MenuIcon /> */}
        </nav>
      </div>
    </div>
  );
};

export default Header;
