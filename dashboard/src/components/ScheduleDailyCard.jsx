"use client";
import React from "react";
import Image from "next/image";
import { CiCircleMinus } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdSportsTennis } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { getCurrentUserTime } from "@/lib/timeutils";
import { getDate } from "../lib/timeutils";

const ScheduleDailyCard = ({
  id,
  imageData,
  exerciseName,
  exerciseStartTime,
  sets,
  duration,
  caloriesPerHour,
  setScheduleList,
}) => {
  const { data: session } = useSession();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setDeleteLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schedules/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.jwt}`,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    setDeleteLoading(false);
    setScheduleList((prev) => prev.filter((item) => item.id !== id));
  };
  const handleAdd = async () => {
    setLoading(true);
    const date = getDate();
    console.log(date);
    const caloriesRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/calories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.jwt}`,
        },
        body: JSON.stringify({
          data: {
            kcl: parseInt(caloriesPerHour * (duration / 60) * -1),
            member: session.user.user.id,
            date: date,
            isBurnedCalories: true,
          },
        }),
      }
    );
    const caloriesData = await caloriesRes.json();
    const workoutRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/workouts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.jwt}`,
        },
        body: JSON.stringify({
          data: {
            name: exerciseName,
            member: session.user.user.id,
            duration: duration,
            date: date,
          },
        }),
      }
    );

    console.log("cal data: ", caloriesData);
    const workOutData = await workoutRes.json();
    console.log("workout data:", workOutData);

    setLoading(false);
    setChecked(true);
    setTimeout(() => {
      setChecked(false);
    }, 500);
  };
  return (
    <>
      <div className="flex-col  bg-bgColor-trinary/70  h-21 rounded-lg text-white p-4">
        {/* <div className="text-lg mb-2"></div> */}
        <div className="flex justify-between items-center">
          <div className="flex  items-center gap-2">
            {imageData ? (
              <Image
                src={imageData}
                className="w-16 h-16 rounded-full object-cover"
                width={200}
                height={200}
              />
            ) : (
              <div className="w-16 h-16 rounded-full text-center flex flex-row justify-center items-center">
                <MdSportsTennis className="text-3xl text-blue-text" />
              </div>
            )}
            <div>
              <div className="text-l">{exerciseName}</div>
              <div className="text-sm">At {exerciseStartTime}</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-blue-text">{`${
              caloriesPerHour ? caloriesPerHour : "-"
            } cal/h`}</div>
            <div className="text-white">{duration} mins</div>
            <div className="flex flex-row gap-x-2 items-center justify-center">
              <button
                onClick={() => {
                  handleAdd();
                }}
                disabled={loading || checked}
              >
                {loading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-5 h-5 text-gray-700 animate-spin dark:text-gray-600 fill-blue-default"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : checked ? (
                  <FaRegCheckCircle className="text-2xl text-green-600 " />
                ) : (
                  <IoMdAddCircleOutline className="text-2xl hover:text-blue-light transition-all duration-150 " />
                )}
              </button>
              <button
                disabled={false}
                onClick={() => {
                  handleDelete();
                }}
              >
                {deleteLoading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-5 h-5 text-gray-700 animate-spin dark:text-gray-600 fill-blue-default"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <FaTrash className="text-lg transition-all duration-150 hover:text-red-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleDailyCard;
