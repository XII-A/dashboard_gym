import React from "react";
import Food from "./Food";
import meatImage from "../../public/foodImages/taco.png";

const FoodList = ({ foodList, setfoodList }) => {
  const handleHourFormat = (timeString) => {
    // change 09:00:00.000 to 09:00 AM
    const timeString12hr = new Date(
      "1970-01-01T" + timeString + "Z"
    ).toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });

    return timeString12hr;
  };
  return (
    <div className="flex flex-col justify-between gap-4   w-full text-white">
      {foodList.map((item, index) => (
        <Food
          id={item.id}
          food={item.attributes.foodName}
          meal={item.attributes.meal}
          calories={item.attributes.kcl}
          time={handleHourFormat(item.attributes.hour)}
          carbs={item.attributes.carbs}
          setfoodList={setfoodList}
          foodList={foodList}
        />
      ))}
    </div>
  );
};

export default FoodList;
