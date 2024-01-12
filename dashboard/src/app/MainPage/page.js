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
import { getDate } from "@/lib/timeutils";
import { getWeek } from "@/lib/timeutils";
import { getDayFromDate } from "@/lib/timeutils";
import { CiDumbbell } from "react-icons/ci";
import { RiFireLine } from "react-icons/ri";
import { IoFootstepsOutline } from "react-icons/io5";
import dynamic from "next/dynamic";

const DailyChartComponent = dynamic(
  () => import("@/components/DailyChartComponent"),
  { ssr: false }
);

export default function Home() {
  const { data: session } = useSession();
  const [workoutloading, setWorkoutloading] = useState(true);
  const [workoutHours, setWorkoutHours] = useState(0);
  const [stepsLoading, setStepsLoading] = useState(true);
  const [caloriesLoading, setCaloriesLoading] = useState(true);
  const [calories, setCalories] = useState(0);
  const [steps, setSteps] = useState(0);
  const [weekCalories, setWeekCalories] = useState([]);
  const [weekWorkout, setWeekWorkout] = useState([]);
  const [weekSteps, setWeekSteps] = useState([]);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const styles = [
    {
      bgColor: "#F97316",
      iconColor: "#EA580C",
      icon: <RiFireLine className="w-8 h-8" />,
    },
    {
      bgColor: "#06B6D4",
      iconColor: "#0891B2",
      icon: <CiDumbbell className="w-8 h-8" />,
    },
    {
      bgColor: "#8B5CF6",
      iconColor: "#6D28D9",
      icon: <IoFootstepsOutline className="w-8 h-8" />,
    },
  ];
  useEffect(() => {
    console.log(session);
    if (session === undefined) {
      return;
    }
    fetch(
      `http://localhost:1337/api/workouts?filters[$and][0][date][$eq]=${getDate()}&filters[$and][1][member][id][$eq]=${
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
      `http://localhost:1337/api/steps?filters[$and][0][date][$gte]=${date}&filters[$and][1][member][id][$eq]=${session.user.user.id}`,
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
        `http://localhost:1337/api/calories?filters[$and][0][date][$eq]=${date}&filters[$and][1][member][id][$eq]=${session.user.user.id}&filters[$and][2][isBurnedCalories][$eq]=false`,
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

  useEffect(() => {
    if (session === undefined) {
      return;
    }
    const [firstDay, lastDay] = getWeek();
    console.log(firstDay, lastDay);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/calorie/weekly?startDate=${firstDay}&endDate=${lastDay}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.jwt}`,
        },
      }
    ).then((response) => {
      response.json().then((res) => {
        //check if the date day is equal to the day of the week and then add the calories to the array of calories if not add 0
        const calories = [];
        daysOfWeek.forEach((day) => {
          const dayCalories = res.find(
            (item) => getDayFromDate(item.date) === day
          );
          if (dayCalories) {
            calories.push(dayCalories.total_calories);
          } else {
            calories.push(0);
          }
        });
        console.log(calories);
        setWeekCalories(calories);
      });
    });
  }, [session]);

  useEffect(() => {
    if (session === undefined) {
      return;
    }
    const [firstDay, lastDay] = getWeek();
    console.log(firstDay, lastDay);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/workout/weekly?startDate=${firstDay}&endDate=${lastDay}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.jwt}`,
        },
      }
    ).then((response) => {
      response.json().then((res) => {
        //check if the date day is equal to the day of the week and then add the calories to the array of calories if not add 0
        const workout = [];
        daysOfWeek.forEach((day) => {
          const daySteps = res.find(
            (item) => getDayFromDate(item.date) === day
          );
          if (daySteps) {
            workout.push(daySteps.total_duration / 60);
          } else {
            workout.push(0);
          }
        });
        console.log(workout);
        setWeekWorkout(workout);
      });
    });
  }, [session]);

  useEffect(() => {
    if (session === undefined) {
      return;
    }
    const [firstDay, lastDay] = getWeek();
    console.log(firstDay, lastDay);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/step/weekly?startDate=${firstDay}&endDate=${lastDay}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.jwt}`,
        },
      }
    ).then((response) => {
      response.json().then((res) => {
        //check if the date day is equal to the day of the week and then add the calories to the array of calories if not add 0
        const steps = [];
        daysOfWeek.forEach((day) => {
          const daySteps = res.find(
            (item) => getDayFromDate(item.date) === day
          );
          if (daySteps) {
            steps.push(daySteps.total_steps);
          } else {
            steps.push(0);
          }
        });
        console.log(steps);

        setWeekSteps(steps);
      });
    });
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
          <div
            className="flex flex-row justify-between mt-4 gap-x-4 "
            style={{
              height: "calc(100vh - 36rem)",
            }}
          >
            <div className="w-full">
              <DailyChartComponent
                data={weekWorkout}
                label={"Workout Hours"}
                bgColor={styles[1].bgColor}
                iconColor={styles[1].iconColor}
                icon={styles[1].icon}
                title={"Workout Analysis"}
              />
            </div>
            <div className="w-full ">
              <DailyChartComponent
                data={weekCalories}
                label={"Calories"}
                bgColor={styles[0].bgColor}
                iconColor={styles[0].iconColor}
                icon={styles[0].icon}
                title={"Calories Analysis"}
              />
            </div>
            <div className="w-full ">
              <DailyChartComponent
                data={weekSteps}
                label={"Steps"}
                bgColor={styles[2].bgColor}
                iconColor={styles[2].iconColor}
                icon={styles[2].icon}
                title={"Steps Analysis"}
              />
            </div>
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
