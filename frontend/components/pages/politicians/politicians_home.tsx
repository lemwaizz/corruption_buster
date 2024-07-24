import React from "react";
import Image from "next/image";
import sudi from "./images/mini_gathiru cropped.jpg";
import Link from "next/link";

const PoiticiansHome = () => {
  return (
    <div className="mt-[90px] max-w-screen-xl mx-auto">
      <div className="py-8 md:py-20 px-4">
        <h1 className="text-3xl">
          Access information on
          <br /> various politicians in the conuntry
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20 px-4">
        <SinglePolitician />
        <SinglePolitician />
        <SinglePolitician />
        <SinglePolitician />
        <SinglePolitician />
      </div>
    </div>
  );
};

const SinglePolitician = () => {
  return (
    <Link href="#">
      <div className="shadow-md rounded-xl pt-6">
        <div className="px-6">
          <p className="font-bold text-lg font-outfit">Gathiru Benjamin</p>
          <p className="text-base font-outfit line-clamp-2">
            A member of parliament from the Embakasi region in Kenya and one of
            the best orrators in the region. Claimed to also be one of the
            wealthiest politicians
          </p>
        </div>
        <div className="flex gap-2 flex-wrap mt-2 px-6">
          <PoliticalCategoryCard category="MP" />
          <PoliticalCategoryCard category="CEO" />
          <PoliticalCategoryCard category="Bussines" />
          <PoliticalCategoryCard category="Bussines" />
          <PoliticalCategoryCard category="Bussines" />
          <PoliticalCategoryCard category="Bussines" />
        </div>
        <div className="h-[250px] mt-5 overflow-hidden">
          <Image
            src={sudi}
            alt="politician image"
            className="object-cover w-full h-full rounded-b-xl object-center hover:scale-125 transition-all duration-300"
          />
        </div>
      </div>
    </Link>
  );
};

interface PoliticalCategoryCardProps {
  category: string;
}

const PoliticalCategoryCard: React.FC<PoliticalCategoryCardProps> = ({
  category,
}) => {
  return (
    <div className="flex rounded-full px-4 py-1 bg-slate-200">{category}</div>
  );
};

export default PoiticiansHome;
