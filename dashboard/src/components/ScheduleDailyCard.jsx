import React from "react";
import Image from "next/image";
import { CiCircleMinus } from "react-icons/ci";


const ScheduleDailyCard = ({
  
  imageData,
  exerciseName,
  exerciseStartTime,
  sets,
  goalSets,
}) => {
  return (
    <>
      <div className="flex-col  bg-bgColor-trinary/70  h-full rounded-lg text-white p-4">
        {/* <div className="text-lg mb-2"></div> */}
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
              <div className="text-sm">At {exerciseStartTime}</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-blue-text">
              {sets}/{goalSets} sets
            </div>
            <button>
              <CiCircleMinus className="text-[#FF0000] w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleDailyCard;
