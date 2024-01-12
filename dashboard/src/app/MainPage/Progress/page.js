"use client";
import React from "react";
import dynamic from "next/dynamic";
import { getDate } from "@/lib/timeutils";
import { getWeek } from "@/lib/timeutils";
import { getDayFromDate } from "@/lib/timeutils";
import { CiDumbbell } from "react-icons/ci";
import { RiFireLine } from "react-icons/ri";
import { IoFootstepsOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const DailyChartComponent = dynamic(
  () => import("@/components/DailyChartComponent"),
  { ssr: false }
);

const GoalChart = dynamic(() => import("@/components/GoalChart"), {
  ssr: false,
});

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const page = () => {
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

  const { data: session } = useSession();
  const [weekCalories, setWeekCalories] = useState([]);
  const [weekWorkout, setWeekWorkout] = useState([]);
  const [weekSteps, setWeekSteps] = useState([]);

  const [weekCaloriesGoal, setWeekCaloriesGoal] = useState([]);
  const [weekWorkoutGoal, setWeekWorkoutGoal] = useState([]);
  const [weekStepsGoal, setWeekStepsGoal] = useState([]);

  const [weeklyBurnedCalories, setWeeklyBurnedCalories] = useState([]);

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
        const caloriesGoal = [];
        daysOfWeek.forEach((day) => {
          const dayCalories = res.find(
            (item) => getDayFromDate(item.date) === day
          );
          if (dayCalories) {
            calories.push(dayCalories.total_calories);
            caloriesGoal.push(
              parseFloat(
                (dayCalories.total_calories / session.user.user.caloriesGoal) *
                  100
              ).toFixed(2)
            );
          } else {
            calories.push(0);
            caloriesGoal.push(0);
          }
        });
        console.log(calories);
        setWeekCalories(calories);
        setWeekCaloriesGoal(caloriesGoal);
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
        const workoutGoal = [];
        daysOfWeek.forEach((day) => {
          const daySteps = res.find(
            (item) => getDayFromDate(item.date) === day
          );
          if (daySteps) {
            workout.push(daySteps.total_duration / 60);
            workoutGoal.push(
              parseFloat(
                (daySteps.total_duration /
                  60 /
                  session.user.user.workoutsGoal) *
                  100
              ).toFixed(2)
            );
          } else {
            workout.push(0);
            workoutGoal.push(0);
          }
        });
        console.log(workout);
        setWeekWorkout(workout);
        setWeekWorkoutGoal(workoutGoal);
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
        const stepsGoal = [];
        const goalSteps = parseInt(session.user.user.stepsGoal);
        daysOfWeek.forEach((day) => {
          const daySteps = res.find(
            (item) => getDayFromDate(item.date) === day
          );
          if (daySteps) {
            steps.push(daySteps.total_steps);
            stepsGoal.push(
              parseFloat((daySteps.total_steps / goalSteps) * 100).toFixed(2)
            );
          } else {
            steps.push(0);
            stepsGoal.push(0);
          }
        });
        console.log(steps);
        console.log(stepsGoal);
        setWeekSteps(steps);
        setWeekStepsGoal(stepsGoal);
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/calorie/weekly/burned?startDate=${firstDay}&endDate=${lastDay}`,
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
            calories.push(dayCalories.total_calories * -1);
          } else {
            calories.push(0);
          }
        });

        setWeeklyBurnedCalories(calories);
      });
    });
  }, [session]);

  return (
    <div className="grid grid-cols-4   h-full">
      <div className="col-span-3 ">
        <div className="flex flex-col  h-full">
          <div className="w-full my-4 ml-4">
            <GoalChart
              workOutData={weekWorkoutGoal}
              workOutLabel={"% of workout goal"}
              calorieData={weekCaloriesGoal}
              calorieLabel={"% of calorie goal"}
              stepData={weekStepsGoal}
              stepLabel={"% of steps goal"}
            />
          </div>
          <div className="ml-4 flex flex-row justify-between gap-4 w-full">
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
                data={weeklyBurnedCalories}
                label={"Burned Calories"}
                bgColor={styles[0].bgColor}
                iconColor={styles[0].iconColor}
                icon={styles[0].icon}
                title={"Calories Burned Analysis"}
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
      <div className="col-span-1 py-2  min-h-full flex flex-col items-center"></div>
    </div>
  );
};

export default page;
