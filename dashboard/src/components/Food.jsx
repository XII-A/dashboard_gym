import React from "react";
import Image from "next/image";

const Food = ({ image, food, meal, calories, time, carbs }) => {
  return (
    <div className="flex-col  bg-bgColor-trinary  h-auto rounded-lg text-white p-4   drop-shadow-gray">
      <div className="flex  items-center">
        <div className="flex relative w-10 h-10 bg-blue-text overflow-hidden rounded-full items-center justify-center">
          <Image
            src={image}
            className="object-contain"
            width={30}
            height={30}
          />
        </div>
        <div className="grid grid-cols-5 flex-row justify-between w-full ml-2 ">
          <div className="text-sm">{food}</div>
          <div className="text-sm">{meal}</div>
          <div className="text-sm">{calories}</div>
          <div className="text-sm">{time}</div>
          <div className="text-sm">{carbs}</div>
        </div>
      </div>
    </div>
  );
};

export default Food;
