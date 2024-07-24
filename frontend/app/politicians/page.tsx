import { PoliticiansHome } from "@/components/pages/politicians";
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import React from "react";

const Page = () => {
  return (
    <>
      <Header />
      <PoliticiansHome />
      <Footer />
    </>
  );
};

export default Page;
