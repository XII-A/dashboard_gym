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

const InfoCard = ({ parameter, value, loading }) => {
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
            {loading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="inline w-5 h-5 text-gray-700 animate-spin dark:text-gray-600 fill-blue-default"
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
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              <div className="font-thin text-sm">{subtitle}</div>
            )}
          </div>
        </div>
        <AddButton iconColor={iconColor} />
      </div>
    </div>
  );
};

export default InfoCard;
