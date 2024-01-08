"use client";
import InfoCard from "../../components/InfoCard";
import IntroCard from "../../components/IntroCard";
import image from "../../../public/girl.png";
import { FaAngleRight } from "react-icons/fa";
import ScheduleComponent from "@/components/ScheduleComponent";
import GoalComponent from "@/components/GoalComponent";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getDate } from "@/lib/utils";

export default function Home() {
  const { data: session } = useSession();
  const [workoutloading, setWorkoutloading] = useState(true);
  const [workoutHours, setWorkoutHours] = useState(0);
  const [stepsLoading, setStepsLoading] = useState(true);
  const [caloriesLoading, setCaloriesLoading] = useState(true);
  const [calories, setCalories] = useState(0);
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    if (session === undefined) {
      return;
    }
    fetch(
      `http://localhost:1337/api/workouts?filters[$and][0][datetime][$gte]=${getDate()}T00:00:00.000Z&filters[$and][1][member][id][$eq]=${
        session.user.user.id
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.jwt}`,
        },
      }
    ).then((response) => {
      response
        .json()
        .then((res) => res.data)
        .then((data) => {
          let workoutHours = 0;
          data.forEach((item) => {
            workoutHours += item.attributes.duration;
          });
          setWorkoutHours(workoutHours / 60);
          setWorkoutloading(false);
        });
    });
  }, [session]);

  useEffect(() => {
    if (session === undefined) {
      return;
    }
    const date = getDate();
    fetch(
      `http://localhost:1337/api/steps?filters[$and][0][datetime][$gte]=${date}T00:00:00.000&filters[$and][1][member][id][$eq]=${session.user.user.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.jwt}`,
        },
      }
    ).then((response) => {
      response
        .json()
        .then((res) => res.data)
        .then((data) => {
          let stepscount = 0;
          data.forEach((item) => {
            stepscount += item.attributes.count;
          });
          setSteps(stepscount);
          setStepsLoading(false);
        });
    });
  }),
    [session];

  useEffect(() => {
    if (session === undefined) {
      return;
    }
    const date = getDate();
    console.log(date);
    try {
      fetch(
        `http://localhost:1337/api/calories?filters[$and][0][dateofentry][$gte]=${date}T00:00:00.000&filters[$and][1][member][id][$eq]=${session.user.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.jwt}`,
          },
          cache: "no-cache",
        }
      ).then((response) => {
        response
          .json()
          .then((res) => res.data)
          .then((data) => {
            let calorirescount = 0;
            console.log(data);
            data.forEach((item) => {
              calorirescount += item.attributes.kcl;
            });
            setCalories(calorirescount);
            setCaloriesLoading(false);
          });
      });
    } catch (err) {
      console.log(err);
    }
  }, [session]);

  return (
    <div className="grid grid-cols-4  bg-bgColor-primary h-full ">
      <div className="col-span-3">
        <div className="flex flex-col w-full p-4">
          <div className="w-full mb-4 ">
            <IntroCard
              image={image}
              title={"Track Your Daily Activities"}
              subtitle={
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"
              }
            />
          </div>
          <div className="flex flex-row justify-between gap-4 h-52 text-white ">
            <InfoCard
              parameter={"workout"}
              value={`${workoutHours} hours`}
              loading={workoutloading}
            />
            <InfoCard
              parameter={"calories"}
              value={`${calories} kcl`}
              loading={caloriesLoading}
            />
            <InfoCard
              parameter={"steps"}
              value={`${steps} steps`}
              loading={stepsLoading}
            />
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
        {/* Goals */}
        <div className="w-full flex flex-col h-1/2 ">
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
          <div className="mt-3 flex flex-col gap-4 overflow-y-scroll px-2 pb-4">
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
