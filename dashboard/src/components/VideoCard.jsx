import React from "react";
import Image from "next/image";
import { FaRegCirclePlay } from "react-icons/fa6";

const VideoCard = ({
  day,
  imageData,
  exerciseName,
  exerciseTime,
  sets,
  goalSets,
}) => {
  return (
    <>
      <div className="flex-col  bg-bgColor-trinary/70  h-28 rounded-lg text-white p-4">
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
              <div className="text-sm">{exerciseTime}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-blue-text">
              {sets}/{goalSets}
            </div>
            <button>
              <FaRegCirclePlay className="text-blue-text" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
