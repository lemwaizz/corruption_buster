import SinglePolitician from "@/components/pages/politicians/single_politician";
import React from "react";

interface Props {
  params: {
    politicianId: string;
  };
}

const Page: React.FC<Props> = ({ params }) => {
  const politicianId = params.politicianId;
  return <SinglePolitician politicianId={politicianId} />;
};

export default Page;
