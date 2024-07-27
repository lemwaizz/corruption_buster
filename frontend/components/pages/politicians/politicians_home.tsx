import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { politicians } from "@/constants";

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
        {politicians.map(
          ({ description, imageUrl, name, politicalCategory }, index) => (
            <SinglePolitician
              key={index}
              categories={politicalCategory.map((category) => category.name)}
              description={description}
              image={imageUrl}
              name={name}
            />
          )
        )}
      </div>
    </div>
  );
};

interface SinglePoliticianProps {
  name: string;
  description: string;
  categories: string[];
  image: StaticImageData;
}

const SinglePolitician: React.FC<SinglePoliticianProps> = ({
  name,
  image,
  description,
  categories,
}) => {
  return (
    <Link href="#">
      <div className="shadow-md rounded-xl pt-6">
        <div className="px-6">
          <p className="font-bold text-lg font-outfit">{name}</p>
          <p className="text-base font-outfit line-clamp-2">{description}</p>
        </div>
        <div className="flex gap-2 flex-wrap mt-2 px-6">
          {categories.map((category, index) => (
            <PoliticalCategoryCard key={index} category={category} />
          ))}
        </div>
        <div className="h-[250px] mt-5 overflow-hidden">
          <Image
            src={image}
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
