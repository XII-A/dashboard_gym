import React from "react";
import AddButton from "../components/AddButton";
import { CiDumbbell } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";
import { RiFireLine } from "react-icons/ri";
import { IoFootstepsOutline } from "react-icons/io5";
import { AiOutlinePercentage } from "react-icons/ai";
import { IoWaterOutline } from "react-icons/io5";
import lines1 from "../../public/lines1.svg";
import lines2 from "../../public/lines2.svg";
import lines3 from "../../public/lines3.svg";
import lines4 from "../../public/lines4.svg";
import lines5 from "../../public/lines5.svg";
import lines6 from "../../public/lines6.svg";

const InfoCard = ({ parameter, value }) => {
  let icon, title, subtitle, bgColor, iconColor, gradient;

  switch (parameter) {
    case "workout":
      icon = <CiDumbbell className="h-8 w-8" />;
      title = "Workout";
      subtitle = `${value}`;
      bgColor = "#06B6D4";
      iconColor = "#0891B2";
      gradient = <img src={lines1.src} />;
      break;
    case "steps":
      icon = <IoFootstepsOutline className="w-8 h-8" />;
      title = "Steps";
      subtitle = `${value}`;
      bgColor = "#8B5CF6";
      iconColor = "#6D28D9";
      gradient = <img src={lines3.src} />;
      break;
    case "calories":
      icon = <RiFireLine className="w-8 h-8" />;
      title = "Calories";
      subtitle = `${value}`;
      bgColor = "#F97316";
      iconColor = "#EA580C";
      gradient = <img src={lines2.src} />;
      break;
    case "water":
      icon = <IoWaterOutline className="w-8 h-8" />;
      title = "Water";
      subtitle = `${value}`;
      bgColor = "#007EA7";
      iconColor = "#1D669B";
      gradient = <img src={lines4.src} />;
      break;
    case "sleep":
      icon = <IoMoonOutline className="w-8 h-8 " />;
      title = "Sleep";
      subtitle = `${value}`;
      bgColor = "#383838";
      iconColor = "#131313";
      gradient = <img className="mt-3" src={lines5.src} />;
      break;
    case "fat":
      icon = <AiOutlinePercentage className="w-8 h-8" />;
      title = "Body Fat %";
      subtitle = `${value}`;
      bgColor = "#D1D51F";
      iconColor = "#AFBD0D";
      gradient = <img src={lines6.src} />;
      break;

    default:
      icon = <CiDumbbell className="w-8 h-8" />;
      title = "Workout";
      subtitle = `${value}`;
      bgColor = "#06B6D4";
  }

  return (
    <div className="rounded-xl m-5" style={{ backgroundColor: bgColor }}>
      <div className="flex justify-between p-5">
        <div className="flex">
          {icon && (
            <div
              style={{ backgroundColor: iconColor }}
              className="rounded-md text-gray-50 p-2 mr-3"
            >
              {icon}
            </div>
          )}
          <div>
            <div className="text-xl text-gray-50">{title}</div>
            <div className="font-thin text-sm text-gray-50">{subtitle}</div>
          </div>
        </div>
        <AddButton iconColor={iconColor} />
      </div>
      {gradient && <div>{gradient}</div>}
    </div>
  );
};

export default InfoCard;
