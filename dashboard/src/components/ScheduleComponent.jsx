import React from "react";

const ScheduleComponent = ({ day, imageData, exerciseName, exerciseTime, sets }) => {
  return (
    <>
      <div className="flex-col  bg-bgColor-trinary w-full h-20 rounded-lg text-white px-2 py-1" style={{ height: 'auto' }}>
        <div className="text-lg">{day}</div>
        <div className="flex justify-between items-center">
          <div className="flex  items-center">
            <img src={imageData} className="w-10 h-10 mr-2" />
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
