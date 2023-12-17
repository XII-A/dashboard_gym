import React from "react";
import { FaAngleRight } from "react-icons/fa";
import ScheduleComponent from "../../../components/ScheduleComponent";
import Achievement from "../../../components/Achievement";
import VideoCard from "@/components/VideoCard";
import IntroCard from "@/components/IntroCard";

const page = () => {
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-3">
        <div className="flex-col w-full p-4">
          <div className="w-full my-4 ">
            <IntroCard
              image="/workout.jpg"
              title={"Track Your Daily Activities"}
              subtitle={
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"
              }
            />
          </div>
          <div className="text-2xl text-gray-50 ">Achievements</div>
          <div className="flex flex-wrap justify-between mt-3 mx-5">
            <Achievement icon="steps" value="123" />
            <Achievement icon="sets" value={"50"} />
            <Achievement icon="calories" value="10K" />
            <Achievement icon="hours" value="100" />
            <Achievement icon="poses" value="69" />
          </div>

          <div className="mt-3 flex flex-col gap-4 overflow-y-scroll px-2 py-1 h-full ">
            <VideoCard
              imageData={"/back&Stretch.png"}
              day={"Monday"}
              sets={"20"}
              goalSets={"30 sets"}
              exerciseName={"Stretch"}
              exerciseTime={"At 08:00"}
            />
            <VideoCard
              imageData={"/back&Stretch.png"}
              day={"Monday"}
              sets={"20"}
              goalSets={"30 sets"}
              exerciseName={"Stretch"}
              exerciseTime={"At 08:00"}
            />
          </div>
        </div>
      </div>
      <div className="col-span-1 py-2  min-h-full flex flex-col items-center">
        <div className="w-full  flex flex-col h-1/2">
          {/* Header */}
          <div className="flex flex-row items-center justify-between px-2">
            <div className="text-xl font-medium text-white">My Schedule</div>
            <button className="text-blue-default flex flex-row  items-center justify-between">
              <div className="text-sm mr-1">View All</div>
              <div>
                
                  <FaAngleRight />
                
              </div>
            </button>
          </div>
          {/* Body */}
          <div className="mt-3 flex flex-col gap-4 overflow-y-scroll px-2 pb-1 h-full ">
            <ScheduleComponent
              imageData={"/back&Stretch.png"}
              day={"Monday"}
              sets={"20 sets"}
              exerciseName={"Stretch"}
              exerciseTime={"At 08:00"}
            />
            <ScheduleComponent
              imageData={"/back&Stretch.png"}
              day={"Monday"}
              sets={"20 sets"}
              exerciseName={"Stretch"}
              exerciseTime={"At 08:00"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
