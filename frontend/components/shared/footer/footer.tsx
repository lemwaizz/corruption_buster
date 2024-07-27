"use client";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const contactUsScroll = () => {
    const section = document.querySelector("#contact_us_section");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const aboutUsScroll = () => {
    const section = document.querySelector("#about_us_section");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full py-2 bg-black md:py-10" id="contact_us_section">
      <div className="grid max-w-screen-xl grid-cols-1 gap-10 px-4 mx-auto my-6 md:grid-cols-2">
        <div className="" id="contact_us_section">
          <h2 className="mb-3 text-2xl font-bold text-white font-roboto text-start">
            Reach Out To Us
          </h2>
          <div className="grid w-full grid-cols-2 gap-4">
            <input
              className="rounded-md outline-none border-[#464646] border-[1px] px-3 py-2"
              placeholder="Enter Username"
            />
            <input
              className="rounded-md outline-none border-[#464646] border-[1px] px-3 py-2"
              placeholder="Enter email"
            />
          </div>
          <div className="w-full">
            <textarea
              className="w-full px-4 py-4 mt-4 rounded-md outline-none border-[#464646] border-[1px] min-h-24"
              placeholder="Enter message"
            />
          </div>
          <button className="w-full px-8 py-2 my-6 text-white bg-black border-[1px] border-white rounded-md">
            Send
          </button>
          <div className="flex justify-between gap-5 md:justify-start">
            <div className="border-white border-[1px] rounded-full p-2">
              <Link href="#">
                <Facebook color="white" />
              </Link>
            </div>
            <div className="border-white border-[1px] rounded-full p-2">
              <Link href="#">
                <Instagram color="white" />
              </Link>
            </div>
            <div className="border-white border-[1px] rounded-full p-2">
              <Link href="#">
                <Youtube color="white" />
              </Link>
            </div>
            <div className="border-white border-[1px] rounded-full p-2">
              <Link href="#">
                <Linkedin color="white" />
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 text-white ">
          <div>
            <h2 className="mb-2 text-lg font-bold text-start md:text-end">
              Politician Categories
            </h2>
            <ul className="flex flex-col items-start md:items-end">
              <li>
                <Button variant="link" asChild>
                  <Link href="#" className="text-base font-outfit text-white">
                    Cabinet Secs
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link href="#" className="text-base font-outfit text-white">
                    MPs
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link href="#" className="text-base font-outfit text-white">
                    Governors
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link href="#" className="text-base font-outfit text-white">
                    Women Rep
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link href="#" className="text-base font-outfit text-white">
                    MCAs
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold text-end">Navigation</h2>
            <ul className="flex flex-col items-end text-white">
              <li>
                <Button variant="link" asChild>
                  <Link href="/" className="text-base font-outfit text-white">
                    Home
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-base font-outfit text-white"
                  onClick={aboutUsScroll}
                >
                  About Us
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-base font-outfit text-white"
                  onClick={contactUsScroll}
                >
                  Contact Us
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link
                    href="/politicians"
                    className="text-base font-outfit text-white"
                  >
                    Politicians
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t-[1px] border-white py-4 px-4">
        <p className="text-white text-start font-montserrat">
          Corruption Buster, 2024
        </p>
      </div>
    </div>
  );
};

export default Footer;
