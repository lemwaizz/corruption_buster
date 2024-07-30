"use client";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { submitReachOutToUs } from "@/firebase/firestore/storage";
import { LoadingBanner } from "../loading_banner/loading_banner";

const Footer = () => {
  const { toast } = useToast();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitUserMessage = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userEmail || !userName || !userMessage) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Username, email and the message are all required fields",
      });
      return;
    }
    setLoading(true);

    try {
      await submitReachOutToUs({
        email: userEmail,
        message: userMessage,
        userName: userName,
      });
      toast({
        variant: "default",
        title: "Success",
        description: "Your message has been submitted successfully",
      });
      setUserName("");
      setUserEmail("");
      setUserMessage("");
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error submitting your message",
      });
    } finally {
      setLoading(false);
    }
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
    <div className="w-full py-2 bg-black md:py-10" id="contact_us_section">
      {loading && <LoadingBanner loading={loading} />}
      <div className="grid max-w-screen-xl grid-cols-1 gap-10 px-4 mx-auto my-6 md:grid-cols-2">
        <div className="" id="contact_us_section">
          <form>
            <h2 className="mb-3 text-2xl font-bold text-white font-roboto text-start">
              Reach Out To Us
            </h2>
            <div className="grid w-full grid-cols-2 gap-4">
              <input
                className="rounded-md outline-none border-[#464646] border-[1px] px-3 py-2"
                placeholder="Enter Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                className="rounded-md outline-none border-[#464646] border-[1px] px-3 py-2"
                placeholder="Enter email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div className="w-full">
              <textarea
                className="w-full px-4 py-4 mt-4 rounded-md outline-none border-[#464646] border-[1px] min-h-24"
                placeholder="Enter message"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
              />
            </div>
            <button
              type="submit"
              onSubmit={submitUserMessage}
              className="w-full px-8 py-2 my-6 text-white bg-black border-[1px] border-white rounded-md"
              onClick={submitUserMessage}
            >
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
          </form>
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
