import React from "react";
import Image from "next/image";
import change from "./images/change1.jpg";
import { Button } from "@/components/ui/button";

const BecomeTheChangeYouWant = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 my-20 md:my-28 max-w-screen-xl mx-auto px-4">
      <div className="mb-10 md:mb-0">
        <p>How can i get information?</p>
        <h1 className="text-4xl">Become the change you want.</h1>
        {/* <Button className="my-3">Ask Our Bot</Button> */}
      </div>
      <div className="flex flex-col">
        <hr />
        <div>
          <h2 className="font-bold text-xl my-3 font-outfit">
            01. Join Our Community
          </h2>
          <p className="">
            Register now to become part of a dedicated group working towards a
            corruption-free Kenya.
          </p>
        </div>
        <hr />
        <div>
          <h2 className="font-bold text-xl my-3 font-outfit">
            02. Ask our bot about Corruption
          </h2>
          <p className="">
            Use our platform to inquire information about corrupt activities
            that you may need.
          </p>
        </div>
        <hr />
        <div>
          <h2 className="font-bold text-xl my-3 font-outfit">
            03. Advocate for Transparency
          </h2>
          <p className="">
            Share your story and help raise awareness about the impact of
            corruption in your community.
          </p>
        </div>

        <hr />
      </div>
    </div>
  );
};

export default BecomeTheChangeYouWant;
