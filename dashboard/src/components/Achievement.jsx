import React from "react";
import { GiFrostfire } from "react-icons/gi";
import { IoFootstepsOutline } from "react-icons/io5";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { GiWeightLiftingUp } from "react-icons/gi";
import { CiStopwatch } from "react-icons/ci";

const Achievement = ({ icon, value }) => {
  let title, subtitle;

  switch (icon) {
    case "steps":
      icon = <IoFootstepsOutline className="w-16 h-16" />;
      title = "Steps";
      subtitle = `${value}`;
      break;
    case "calories":
      icon = <GiFrostfire className="w-16 h-16" />;
      title = "Calories";
      subtitle = `${value}`;
      break;
    case "poses":
      icon = <MdOutlineSportsGymnastics className="w-16 h-16" />;
      title = "Poses";
      subtitle = `${value}`;
      break;
    case "sets":
      icon = <GiWeightLiftingUp className="w-16 h-16 " />;
      title = "Sets";
      subtitle = `${value}`;
      break;
    case "hours":
      icon = <CiStopwatch className="w-16 h-16 " />;
      title = "Hours";
      subtitle = `${value}`;
      break;
  }

  return (
    <div className="achievement w-[100px] h-[160px] flex-col rounded-full justify-between p-7 bg-gradient-to-b from-blue-text to-blue-dark ">
      <div className="icon text-gray-50 flex justify-center">{icon}</div>
      <div className="text text-gray-50 flex justify-center text-md font-thin">
        {title}
      </div>
      <div className="value text-gray-50 flex justify-center text-2xl">
        {subtitle}
      </div>
    </div>
  );
};

export default Achievement;
