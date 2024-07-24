"use client";

import { Button } from "@/components/ui/button";
import { slideImages } from "@/constants";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styles from "./slider.module.css";
import { addLineBreak } from "@/utils";

const HomeLanding = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-[100vw]">
        <Slide easing="ease" arrows={false} indicators={true}>
          {slideImages.map((slide, index) => {
            return (
              <div className={styles.slide} key={index}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.192), rgba(3, 3, 3, 0.801)), url(${slideImages[index].image.src})`,
                  }}
                >
                  <section className="absolute flex flex-col gap-3 bottom-20 left-4 md:left-10">
                    <p className="md:text-8xl text-5xl font-bold text-white font-montserrat text-start">
                      {addLineBreak(slideImages[index].title)}
                    </p>
                    <p className="text-2xl text-white text-start">
                      {addLineBreak(slideImages[index].description)}
                    </p>
                    <Button className="self-start">Get Started</Button>
                  </section>
                </div>
              </div>
            );
          })}
        </Slide>
      </div>
    </div>
  );
};

export default HomeLanding;
