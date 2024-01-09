import React from "react";
import ProgressBarCard from "@/components/ProgressBar";

const page = () => {
  return (
    <div className="bg-bgColor-primary h-full p-5">
      <ProgressBarCard
        workoutCurrent={60}
        workoutGoal={120}
        stepsCurrent={1000}
        stepsGoal={10000}
        caloriesCurrent={2000}
        caloriesGoal={2000}
      />
    </div>
  );
};

export default page;
