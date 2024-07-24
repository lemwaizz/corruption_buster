import { Button } from "@/components/ui/button";
import React from "react";

const AccessCorruptionCases = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-screen-xl mx-auto my-20 md:my-28 gap-6 px-4">
      <div className="flex items-center flex-col mb-6 md:mb-0">
        <h1 className="md:text-6xl text-5xl">
          Kenyan politicians&apos;
          <br /> corruption cases are just one <br />
          interraction away.
        </h1>
        <p className="text-lg mt-4">
          We are an organization geared towards creating an easy way to access
          Kenyan politician corruption cases by integration a bot to give case
          breakdowns on all the politicians listed in this website.
        </p>
        <Button className="self-start mt-6">View Politicians</Button>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10">
          <div className="flex justify-start items-center">
            <div className="flex flex-col">
              <h1 className="text-4xl md:text-6xl">$2B</h1>
              <p className="text-base md:text-md text-start">
                Lost to corruption
                <br />
                each year
              </p>
            </div>
          </div>
          <div className="flex justify-start items-center">
            <div className="flex flex-col">
              <h1 className="text-4xl md:text-6xl">398+</h1>
              <p className="text-base md:text-md text-start">
                Politicians linked to
                <br />
                corruption
              </p>
            </div>
          </div>
          <div className="flex justify-start items-center">
            <div className="flex flex-col">
              <h1 className="text-4xl md:text-6xl">800+</h1>
              <p className="text-base md:text-md text-start">
                Records on claims
                <br /> of corruption
              </p>
            </div>
          </div>
          <div className="flex justify-start items-center">
            <div className="flex flex-col">
              <h1 className="text-4xl md:text-6xl">42</h1>
              <p className="text-base md:text-md text-start">
                Counties that have
                <br />
                reported cases
              </p>
            </div>
          </div>
        </div>
        {/* <div className="grid grid-cols-2"></div> */}
      </div>
    </div>
  );
};

export default AccessCorruptionCases;
