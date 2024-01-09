import React from "react";
import { FaAngleRight } from "react-icons/fa";
import ScheduleComponent from "../../../components/ScheduleComponent";
import ScheduleDailyCard from "@/components/ScheduleDailyCard";
import ScheduleBookCard from "@/components/ScheduleBookCard";
import UpcomingCoursesCard from "@/components/UpcomingCoursesCard";
import ScheduleDayPicker from "@/components/ScheduleDayPicker";
import IntroCard from "@/components/IntroCard";

const page = () => {
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-3">
        <div
          className="flex-col w-full h-[100vh-5rem] overflow-hidden p-4"
          style={{
            height: "calc(100vh - 5rem)",
          }}
        >
          <div className="w-full mt-4 ">
            <IntroCard
              image="/workout.jpg"
              title={"Track Your Daily Activities"}
              subtitle={
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"
              }
            />
          </div>
          <div className="text-2xl text-gray-50 px-2 pt-5">
            Edit your daily workout
          </div>
            <div className="px-2 pt-4 ">
            <ScheduleDayPicker day={"Monday"}/>
            </div>
          <div className="mt-3 flex flex-col gap-4 overflow-y-scroll h-[29%] px-2 py-1 ">
            <ScheduleDailyCard
              imageData={"/back&Stretch.png"}
              sets={"20"}
              goalSets={"30"}
              exerciseName={"Stretch"}
              exerciseStartTime={"08:00"}
            />
            <ScheduleDailyCard
              imageData={"/back&Stretch.png"}
              sets={"20"}
              goalSets={"30"}
              exerciseName={"Stretch"}
              exerciseStartTime={"08:00"}
            />
            <ScheduleDailyCard
              imageData={"/back&Stretch.png"}
              sets={"20"}
              goalSets={"30"}
              exerciseName={"Stretch"}
              exerciseStartTime={"08:00"}
            />
            <ScheduleDailyCard
              imageData={"/back&Stretch.png"}
              sets={"20"}
              goalSets={"30"}
              exerciseName={"Stretch"}
              exerciseStartTime={"08:00"}
            />
            <ScheduleDailyCard
              imageData={"/back&Stretch.png"}
              sets={"20"}
              goalSets={"30"}
              exerciseName={"Stretch"}
              exerciseStartTime={"08:00"}
            />
          </div>
          <div className="text-2xl text-gray-50 pt-3 px-2 ">Book a course</div>
          <div className="mt-3 flex flex-col gap-4 overflow-y-scroll h-[28%] px-2 py-1 ">
            <ScheduleBookCard
              imageData={"/back&Stretch.png"}
              day={"Monday"}
              sets={"20"}
              goalSets={"30"}
              exerciseName={"Stretch"}
              exerciseDate={"1/9/2024"}
              exerciseStartTime={"08:00"}
              exerciseEndTime={"09:00"}
              trainerName={"Dwayne"}
              trainerSurname={"Johnson"}
            />
            <ScheduleBookCard
              imageData={"/back&Stretch.png"}
              day={"Monday"}
              sets={"20"}
              goalSets={"30"}
              exerciseName={"Stretch"}
              exerciseDate={"1/9/2024"}
              exerciseStartTime={"08:00"}
              exerciseEndTime={"09:00"}
              trainerName={"Dwayne"}
              trainerSurname={"Johnson"}
            />
            <ScheduleBookCard
              imageData={"/back&Stretch.png"}
              day={"Monday"}
              sets={"20"}
              goalSets={"30"}
              exerciseName={"Stretch"}
              exerciseDate={"1/9/2024"}
              exerciseStartTime={"08:00"}
              exerciseEndTime={"09:00"}
              trainerName={"Dwayne"}
              trainerSurname={"Johnson"}
            />
            <ScheduleBookCard
              imageData={"/back&Stretch.png"}
              day={"Monday"}
              sets={"20"}
              goalSets={"30"}
              exerciseName={"Stretch"}
              exerciseDate={"1/9/2024"}
              exerciseStartTime={"08:00"}
              exerciseEndTime={"09:00"}
              trainerName={"Dwayne"}
              trainerSurname={"Johnson"}
            />
            <ScheduleBookCard
              imageData={"/back&Stretch.png"}
              day={"Monday"}
              sets={"20"}
              goalSets={"30"}
              exerciseName={"Stretch"}
              exerciseDate={"1/9/2024"}
              exerciseStartTime={"08:00"}
              exerciseEndTime={"09:00"}
              trainerName={"Dwayne"}
              trainerSurname={"Johnson"}
            />
            <ScheduleBookCard
              imageData={"/back&Stretch.png"}
              day={"Monday"}
              sets={"20"}
              goalSets={"30"}
              exerciseName={"Stretch"}
              exerciseDate={"1/9/2024"}
              exerciseStartTime={"08:00"}
              exerciseEndTime={"09:00"}
              trainerName={"Dwayne"}
              trainerSurname={"Johnson"}
            />
          </div>
        </div>
      </div>
      <div
        className="col-span-1 py-2 flex flex-col items-center"
        style={{
          height: "calc(100vh - 5rem)",
        }}
      >
        <div className="w-full flex flex-col h-[50%] overflow-hidden">
          {/* Header */}
          <div className="flex flex-row items-center justify-between pt-5 px-2">
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
        <div className="w-full  flex flex-col h-[50%] pt-4 overflow-hidden">
          {/* Header */}
          <div className="flex flex-row items-center justify-between px-2">
            <div className="text-xl font-medium text-white">
              My Upcoming Courses
            </div>
            <button className="text-blue-default flex flex-row  items-center justify-between">
              <div className="text-sm mr-1">View All</div>
              <div>
                <FaAngleRight />
              </div>
            </button>
          </div>
          {/* Body */}
          <div className="mt-3 flex flex-col gap-4 overflow-y-scroll px-2 pb-1 h-full ">
            <UpcomingCoursesCard
              imageData={"/back&Stretch.png"}
              day={"Monday"}
              date={"1/9/2024"}
              sets={"20 sets"}
              exerciseName={"Stretch"}
              exerciseStartTime={"08:00"}
              exerciseEndTime={"09:00"}
              TrainerName={"Dwayne Johnson"}
            />
            <UpcomingCoursesCard
              imageData={"/back&Stretch.png"}
              day={"Monday"}
              date={"1/9/2024"}
              sets={"20 sets"}
              exerciseName={"Stretch"}
              exerciseStartTime={"08:00"}
              exerciseEndTime={"09:00"}
              TrainerName={"Dwayne Johnson"}
            />
            <UpcomingCoursesCard
              imageData={"/back&Stretch.png"}
              day={"Monday"}
              date={"1/9/2024"}
              sets={"20 sets"}
              exerciseName={"Stretch"}
              exerciseStartTime={"08:00"}
              exerciseEndTime={"09:00"}
              TrainerName={"Dwayne Johnson"}
            />
            <UpcomingCoursesCard
              imageData={"/back&Stretch.png"}
              day={"Monday"}
              date={"1/9/2024"}
              sets={"20 sets"}
              exerciseName={"Stretch"}
              exerciseStartTime={"08:00"}
              exerciseEndTime={"09:00"}
              TrainerName={"Dwayne Johnson"}
            />
            <UpcomingCoursesCard
              imageData={"/back&Stretch.png"}
              day={"Monday"}
              date={"1/9/2024"}
              sets={"20 sets"}
              exerciseName={"Stretch"}
              exerciseStartTime={"08:00"}
              exerciseEndTime={"09:00"}
              TrainerName={"Dwayne Johnson"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
