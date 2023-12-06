import React from "react";
import AddButton from "../components/AddButton";
import { CiDumbbell } from "react-icons/ci";
import { IoMoonOutline } from "react-icons/io5";
import { RiFireLine } from "react-icons/ri";
import { IoFootstepsOutline } from "react-icons/io5";
import { AiOutlinePercentage } from "react-icons/ai";
import { IoWaterOutline } from "react-icons/io5";
import Image from "next/image";
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
      gradient = "/lines1.svg";

      break;
    case "steps":
      icon = <IoFootstepsOutline className="w-8 h-8" />;
      title = "Steps";
      subtitle = `${value}`;
      bgColor = "#8B5CF6";
      iconColor = "#6D28D9";
      gradient = "/lines3.svg";

      break;
    case "calories":
      icon = <RiFireLine className="w-8 h-8" />;
      title = "Calories";
      subtitle = `${value}`;
      bgColor = "#F97316";
      iconColor = "#EA580C";
      gradient = "/lines2.svg";

      break;
    case "water":
      icon = <IoWaterOutline className="w-8 h-8" />;
      title = "Water";
      subtitle = `${value}`;
      bgColor = "#007EA7";
      iconColor = "#1D669B";
      gradient = "/lines4.svg";
      break;
    case "sleep":
      icon = <IoMoonOutline className="w-8 h-8 " />;
      title = "Sleep";
      subtitle = `${value}`;
      bgColor = "#383838";
      iconColor = "#131313";
      gradient = "/lines5.svg";
      break;
    case "fat":
      icon = <AiOutlinePercentage className="w-8 h-8" />;
      title = "Body Fat %";
      subtitle = `${value}`;
      bgColor = "#D1D51F";
      iconColor = "#AFBD0D";
      gradient = "/lines6.svg";
      break;

    default:
      icon = <CiDumbbell className="w-8 h-8" />;
      title = "Workout";
      subtitle = `${value}`;
      bgColor = "#06B6D4";
  }

  return (
    <div
      className="rounded-xl w-full h-full bg-no-repeat bg-cover"
      style={{
        backgroundColor: bgColor,
        backgroundImage: `url(${gradient})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex justify-between p-5">
        <div className="flex">
          {icon && (
            <div
              style={{ backgroundColor: iconColor }}
              className="rounded-md p-2 mr-3"
            >
              {icon}
            </div>
          )}
          <div>
            <div className="text-xl">{title}</div>
            <div className="font-thin text-sm">{subtitle}</div>
          </div>
        </div>
        <AddButton iconColor={iconColor} />
      </div>
    </div>
  );
};

export default InfoCard;
