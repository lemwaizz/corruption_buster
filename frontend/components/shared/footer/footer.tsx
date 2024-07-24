import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full py-2 bg-black md:py-10" id="contact_us_section">
      <div className="grid max-w-screen-xl grid-cols-1 gap-10 px-4 mx-auto my-6 md:grid-cols-2">
        <div className="">
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
              <li>Cabinet Secs</li>
              <li>MPs</li>
              <li>Governors</li>
              <li>Women Rep</li>
              <li>MCAs</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold text-end">Navigation</h2>
            <ul className="flex flex-col items-end">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="#">About Us</Link>
              </li>
              <li>
                <Link href="/#">Contact Us</Link>
              </li>
              <li>
                <Link href="/#">Politicians</Link>
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
