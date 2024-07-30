import React from "react";
import { MoonLoader } from "react-spinners";

export const MoonLoadingSpinner = () => {
  return (
    <div>
      <div className="flex items-center justify-center my-10">
        <MoonLoader color="#9dd02f" size={28} />
      </div>
    </div>
  );
};
