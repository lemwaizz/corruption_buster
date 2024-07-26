import { botExampleQuestions } from "@/constants";
import React from "react";

const ExampleQuestions = () => {
  return (
    <div className="flex flex-col gap-3 my-6">
      <span>EXAMPLE QUESTIONS</span>
      {botExampleQuestions.map((qstn, index) => {
        return (
          <div
            key={index}
            className="w-full px-2 py-2 flex items-center justify-center border-[1px] border-black rounded-md text-gray-700"
          >
            {qstn}
          </div>
        );
      })}
    </div>
  );
};

export default ExampleQuestions;
