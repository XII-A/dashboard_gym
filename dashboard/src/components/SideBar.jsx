"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { PiNotepad } from "react-icons/pi";
import { CiDumbbell } from "react-icons/ci";
import { SlBadge } from "react-icons/sl";
import { LuCalendarDays } from "react-icons/lu";
import { BsBarChartLine } from "react-icons/bs";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { HiOutlineLogout } from "react-icons/hi";

const SideBar = () => {
  const pathname = usePathname();
  const routes = [
    {
      path: "/MainPage",
      name: "Overview",
      icon: <HiOutlineSquares2X2 size={20} />,
    },
    {
      path: "/MainPage/Workout",
      name: "Workout",
      icon: <CiDumbbell size={20} />,
    },
    {
      path: "/MainPage/DietPlan",
      name: "Diet Plan",
      icon: <PiNotepad size={20} />,
    },
    {
      path: "/MainPage/Goals",
      name: "Goals",
      icon: <SlBadge size={20} />,
    },
    {
      path: "/MainPage/MySchedule",
      name: "My Schedule",
      icon: <LuCalendarDays size={20} />,
    },
    {
      path: "/MainPage/Progress",
      name: "Progress",
      icon: <BsBarChartLine size={20} />,
    },
  ];

  return (
    <div className="h-full w-full bg-bgColor-secondary flex flex-col">
      {/* Icon & title */}
      <div className="flex flex-row items-center justify-center p-8">
        <Image src="/AppIcon.svg" width={32} height={32} />
        <div className="text-blue-text font-bold text-lg ml-4">Fitness</div>
      </div>

      {/* Menu */}
      <div className="flex flex-col items-center justify-center gap-4 ">
        {routes.map((route, index) => {
          return (
            <Link
              href={route.path}
              className={
                "flex flex-row items-center  justify-start gap-4 text-white px-4 py-3  border border-transparent rounded-md  w-5/6 transition duration-300 ease-linear " +
                (pathname === route.path ? "bg-blue-default" : "")
              }
            >
              {route.icon}
              <div className="font-medium text-sm">{route.name}</div>
            </Link>
          );
        })}
      </div>
      {/* Help & Logout */}
      <div className="flex flex-col items-center justify-center gap-4 mt-auto">
        <div className="flex flex-row items-center justify-start gap-4 text-white px-4 py-3  border border-transparent rounded-md bg-transparent w-5/6 transition duration-300 ease-linear cursor-pointer">
          <IoMdHelpCircleOutline size={20} />
          <div className="font-medium text-sm">Help</div>
        </div>
        <div className="flex flex-row items-center justify-start gap-4 text-white px-4 py-3  border border-transparent rounded-md bg-transparent w-5/6 transition duration-300 ease-linear cursor-pointer">
          <HiOutlineLogout size={20} style={{ transform: "rotate(180deg)" }} />
          <div className="font-medium text-sm">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
