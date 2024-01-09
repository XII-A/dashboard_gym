import React from "react";
import Image from "next/image";
import { FaRegCirclePlay } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";

const ScheduleBookCard = ({
  imageData,
  exerciseName,
  exerciseTime,
  TrainerName,
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
            <div className="flex items-center gap-7">
              <div className=" gap-4">
                <div className="text-l">{exerciseName}</div>
                <div className="text-sm">{exerciseTime}</div>
              </div>
              <div className="text-sm">{TrainerName}</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {/* <div className="text-blue-text">
              Book
            </div> */}
            <button>
              <CiCirclePlus className="text-blue-text w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleBookCard;
