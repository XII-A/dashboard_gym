import React from "react";
import IntroCard from "@/components/introCard";
import FoodList from "@/components/FoodList";
import WeekPlanList from "@/components/WeekPlanList";
import foodImage from "../../../../public/food.png";

const page = () => {
  return (
    <div className="grid grid-cols-4  bg-bgColor-primary h-full ">
      <div className="col-span-3">
        <div className="flex flex-col w-full p-4">
          <div className="w-full mb-2 ">
            <IntroCard
              image={foodImage}
              title={"Track Your Daily Activities"}
              subtitle={
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"
              }
            />
          </div>

          <div className="flex  items-center bg-bgColor-primary p-4">
            <div className="w-10"></div> 
            <div className="grid grid-cols-5 flex-row justify-between w-full text-blue-default">
              <div>Food</div>
              <div>Meal</div>
              <div>Calories</div>
              <div>Time</div>
              <div>Carbs</div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 h-52 text-white">
            <FoodList />
          </div>
        </div>
      </div>
      <div className="col-span-1 px-4 py-2 min-h-full flex flex-col items-center">
        <div className="w-full  flex flex-col h-1/2 gap-4">
          <div className="text-xl font-medium text-white px-2">Week Plan</div>
          <WeekPlanList />
        </div>
      </div>
    </div>
  );
};

export default page;
