import React from "react";
import Image from "next/image";
import { CiCircleMinus } from "react-icons/ci";

const UpcomingCoursesCard = ({
  day,
  date,
  exerciseStartTime,
  duration,
  id,
  imageData,
  exerciseName,

  trainerName,
  trainerSurname,
}) => {
  return (
    <>
      <div
        className="flex-col  bg-bgColor-trinary/70  h-21 rounded-lg text-white p-4"
        id={id}
      >
        <div className="text-lg mb-2">
          {day} {date}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex  items-center gap-2">
            <Image
              src={imageData}
              className="w-16 h-16 rounded-full object-cover"
              width={200}
              height={200}
            />
            <div>
              <div className="text-l">{exerciseName}</div>
              <div className="text-l">
                {trainerName} {trainerSurname}
              </div>
              <div className="text-sm">
                {exerciseStartTime}, for {duration} mins
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpcomingCoursesCard;
