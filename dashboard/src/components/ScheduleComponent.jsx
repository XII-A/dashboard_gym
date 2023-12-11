import React from "react";
import Image from "next/image";

const ScheduleComponent = ({
  day,
  imageData,
  exerciseName,
  exerciseTime,
  sets,
}) => {
  return (
    <>
      <div className="flex-col  bg-bgColor-trinary/70  h-28 rounded-lg text-white p-4   drop-shadow-gray">
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
          <div className="text-blue-text">{sets}</div>
        </div>
      </div>
    </>
  );
};

export default ScheduleComponent;
