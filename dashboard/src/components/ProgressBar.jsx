import React from "react";

const ProgressBarCard = ({
  workoutCurrent,
  workoutGoal,
  caloriesCurrent,
  caloriesGoal,
  stepsCurrent,
  stepsGoal,
}) => {
  const calculateProgress = (current, goal) => {
    return (current / goal) * 100;
  };

  const generateLines = () => {
    const lines = [];
    for (let i = 0; i <= 100; i += 20) {
      lines.push(
        <div
          key={i}
          className="absolute h-0.1 w-[95%] rounded-full border-dashed border"
          style={{ top: `${100 - i}%` }}
        ></div>,
        <div
          key={`text-${i}`}
          className="absolute text-sm text-gray-50 font-extralight"
          style={{
            top: `${100 - i - 3}%`,
            right: "96.5%",
            transform: "translateX(-5px)",
          }}
        >
          {i}%
        </div>
      );
    }
    return lines;
  };

  return (
    <div className="bg-bgColor-trinary rounded-xl p-6 relative ">
      <div className="text-2xl text-gray-50 mb-5">Goal Progress</div>
      <div className="flex space-x-4 relative justify-between ">
        <div className="flex gap-2 h-64 ml-12 ">
          {generateLines()}
          <div className="flex h-64">
            <div className="flex gap-2 justify-center">
              <div className="flex flex-col items-center justify-end z-10">
                <div
                  className="bg-[#06B6D4] w-3 rounded-lg"
                  style={{
                    height: `${calculateProgress(
                      workoutCurrent,
                      workoutGoal
                    )}%`,
                  }}
                ></div>
              </div>
              <div className="flex flex-col items-center justify-end z-10">
                <div
                  className="bg-[#F97316] w-3 rounded-lg"
                  style={{
                    height: `${calculateProgress(
                      caloriesCurrent,
                      caloriesGoal
                    )}%`,
                  }}
                ></div>
              </div>
              <div className="flex flex-col items-center justify-end z-10">
                <div
                  className="bg-[#8B5CF6] w-3 rounded-lg"
                  style={{
                    height: `${calculateProgress(stepsCurrent, stepsGoal)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="flex text-sm text-gray-50 ml-12 justify-between">
              Mon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBarCard;
