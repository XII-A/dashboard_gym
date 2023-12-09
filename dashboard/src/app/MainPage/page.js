"use client";
import InfoCard from "../../components/InfoCard";
import IntroCard from "../../components/IntroCard";
import image from "../../../public/girl.png";
import { FaAngleRight } from "react-icons/fa";
import ScheduleComponent from "@/components/ScheduleComponent";
import GoalComponent from "@/components/GoalComponent";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });
  return (
    <div className="grid grid-cols-4  bg-bgColor-primary h-full ">
      <div className="col-span-3">
        <div>
          <h1>Testing auth</h1>
          <div className="w-full text-red-500 bg-white">
            {session.data?.user?.email}
          </div>
          <button onClick={() => signOut()}>Logout</button>
        </div>
        <div className="flex flex-col w-full p-4">
          <div className="w-full mb-2 ">
            <IntroCard
              image={image}
              title={"Track Your Daily Activities"}
              subtitle={
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"
              }
            />
          </div>
          <div className="flex flex-row justify-between gap-4 h-52 text-white ">
            <InfoCard parameter={"workout"} value={"4 hours"} />
            <InfoCard parameter={"calories"} value={"1800 kcl"} />
            <InfoCard parameter={"steps"} value={"5000 steps"} />
          </div>
        </div>
      </div>
      <div className="col-span-1  py-2  min-h-full flex flex-col items-center">
        {/* My Schedule */}
        <div className="w-full  flex flex-col h-1/2">
          {/* Header */}
          <div className="flex flex-row items-center justify-between px-2">
            <div className="text-xl font-medium text-white">My Schedule</div>
            <button className="text-blue-600 flex flex-row  items-center justify-between">
              <div className="text-sm mr-1">View All</div>
              <div>
                <FaAngleRight />
              </div>
            </button>
          </div>
          {/* Body */}
          <div className="mt-3 flex flex-col gap-4 overflow-y-scroll px-2">
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
        {/* Goals */}
        <div className="w-full flex flex-col h-1/2">
          {/* Header */}
          <div className="flex flex-row items-center justify-between px-2 mt-2">
            <div className="text-xl font-medium text-white">Goals</div>
            <button className="text-blue-600 flex flex-row  items-center justify-between">
              <div className="text-sm mr-1">View All</div>
              <div>
                <FaAngleRight />
              </div>
            </button>
          </div>
          {/* Body */}
          <div className="mt-3 flex flex-col gap-4 overflow-y-scroll px-2">
            <GoalComponent
              exerciseName={"ABS & Stretch"}
              exerciseTime={"Saturday, April 14 | 08:00 AM"}
              sets={"30Min/day"}
            />
            <GoalComponent
              exerciseName={"ABS & Stretch"}
              exerciseTime={"Saturday, April 14 | 08:00 AM"}
              sets={"30Min/day"}
            />
            <GoalComponent
              exerciseName={"ABS & Stretch"}
              exerciseTime={"Saturday, April 14 | 08:00 AM"}
              sets={"30Min/day"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
Home.requireAuth = true;
