import React from "react";
import landing1 from "./images/landing1.jpg";
import landing2 from "./images/landing2.jpg";
import landing3 from "./images/landing3.jpg";
import Image from "next/image";

const LandingImages = () => {
  return (
    <div className="grid grid-cols-3">
      <div className="max-h-[500px] overflow-hidden">
        <Image
          src={landing1}
          alt="landingImage1"
          className="object-cover h-full hover:scale-125 transition-all duration-200"
        />
      </div>
      <div className="max-h-[500px] overflow-hidden">
        <Image
          src={landing3}
          alt="landingImage1"
          className="object-cover h-full hover:scale-125 transition-all duration-200"
        />
      </div>
      <div className="max-h-[500px] overflow-hidden">
        <Image
          src={landing2}
          alt="landingImage1"
          className="object-cover h-full hover:scale-125 transition-all duration-200"
        />
      </div>
    </div>
  );
};

export default LandingImages;
