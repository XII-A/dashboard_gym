import React from "react";
import { FaAngleRight } from "react-icons/fa";

const ScheduleDayPicker = ({ day }) => {
  return (
    <div className=" bg-bgColor-secondary w-full p-2 rounded-lg">
      <div className="flex justify-between px-2 items-center">
        <div className="text-3xl text-gray-50">{day}</div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-4">
            <div className="text-blue-text">Pick a day</div>
            <div className="p-3">
            <FaAngleRight className="text-blue-text w-4 h-4" />
            </div>
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default ScheduleDayPicker;
