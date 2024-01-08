"use client";
import React, { useState } from "react";
import IntroCard from "@/components/IntroCard";
import FoodList from "@/components/FoodList";
import WeekPlanList from "@/components/WeekPlanList";
import foodImage from "../../../../public/food.png";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { GoPlus } from "react-icons/go";
import DietPlanModal from "@/components/Modals/DietPlanModal";
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
  const [loading, setLoading] = useState(false);
  const [pickedDay, setPickedDay] = useState(null);
  const [foodList, setfoodList] = useState([]);
  const { data: session } = useSession();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const date = new Date();

    const currentDayOfWeek = daysOfWeek[date.getDay()];
    setPickedDay(currentDayOfWeek);
  }, []);

  useEffect(() => {
    console.log(foodList);
  }, [foodList]);

  useEffect(() => {
    if (pickedDay !== null && session !== undefined) {
      setLoading(true);
      const url = `http://localhost:1337/api/diet-plans?filters[$and][0][member][id][$eq]=${session.user.user.id}&filters[$and][1][day][$eq]=${pickedDay}`;
      try {
        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.jwt}`,
          },
        }).then((response) => {
          response
            .json()
            .then((res) => res.data)
            .then((data) => {
              setfoodList(data);
              setLoading(false);
            });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [pickedDay]);

  return (
    <>
      <div className="grid grid-cols-4  bg-bgColor-primary box-border  overflow-hidden relative ">
        <div
          className="col-span-3   "
          style={{
            height: "calc(100vh - 5rem)",
          }}
        >
          <div className="flex flex-col w-full p-4  ">
            <div className="w-full mb-2 ">
              <IntroCard
                image={foodImage}
                title={"Track Your Daily Activities"}
                subtitle={
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"
                }
              />
            </div>
            <div className="flex flex-row justify-between w-full items-center my-2 ">
              <div className="text-4xl font-medium text-white px-2 ">
                {pickedDay}
              </div>
              <div>
                <select
                  id="days"
                  className="bg-white/5 text-white/60 text-sm rounded-lg block w-full p-2.5"
                  onChange={(e) => {
                    setPickedDay(e.target.value);
                  }}
                >
                  <option
                    selected
                    className="bg-[#2C3034] text-white/60 text-sm"
                  >
                    {pickedDay}
                  </option>
                  {daysOfWeek.map((day) => {
                    if (day !== pickedDay) {
                      return (
                        <option
                          key={day}
                          value={day}
                          className="bg-[#2C3034] text-white/60 text-sm"
                        >
                          {day}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-5   w-11/12 text-blue-default  pl-6">
              <div>Food</div>
              <div>Meal</div>
              <div>Kcal</div>
              <div>Time</div>
              <div>Carbs</div>
            </div>

            <div
              className="flex flex-col  gap-4   pb-4  text-white overflow-y-scroll w-full  "
              style={{
                height: "calc(100vh - 24rem)",
              }}
            >
              {loading ? (
                <div className="text-white text-center">Loading...</div>
              ) : (
                <>
                  <FoodList foodList={foodList} setfoodList = {setfoodList} />
                  <div className="w-full flex flex-row  justify-center">
                    <button
                      className="bg-blue-default text-white/80 p-2 rounded-full"
                      onClick={() => setOpenModal(true)}
                    >
                      <GoPlus className="text-2xl" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div
          className="col-span-1 px-4 py-2 min-  flex flex-col items-center"
          style={{
            height: "calc(100vh - 5rem)",
          }}
        >
          <div className="w-full  flex flex-col  gap-4 h-full">
            <div className="text-xl font-medium text-white px-2">Week Plan</div>
            <div className="overflow-y-scroll h-full px-1">
              <WeekPlanList />
            </div>
          </div>
        </div>
      </div>
      <DietPlanModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        currentDay={pickedDay}
        setfoodList={setfoodList}
        foodList={foodList}
      />
    </>
  );
};

export default page;
