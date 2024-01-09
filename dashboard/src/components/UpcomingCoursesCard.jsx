import React from "react";
import Image from "next/image";
import { CiCircleMinus } from "react-icons/ci";

const ScheduleComponent = ({
  day,
  imageData,
  exerciseName,
  exerciseTime,
  TrainerName,
}) => {
  return (
    <>
      <div className="flex-col  bg-bgColor-trinary/70  h-full rounded-lg text-white p-4">
        <div className="text-lg mb-2">{day}</div>
        <div className="flex justify-between items-center">
          <div className="flex  items-center gap-2">
            <Image
              src={imageData}
              className="object-contain mr-2"
              width={40}
              height={40}
            />
            <div>
              <div className="text-l">{exerciseName}</div>
              <div className="text-l">{TrainerName}</div>
              <div className="text-sm">{exerciseTime}</div>
            </div>
          </div>
          <button>
            <CiCircleMinus className="text-[#FF0000] w-6 h-6" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ScheduleComponent;
