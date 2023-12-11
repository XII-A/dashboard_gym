import React from "react";
import Food from "./Food";
import meatImage from "../../public/foodImages/taco.png";

const foodItems = [
    {
      image: meatImage,
      food: "Meat",
      meal: "Breakfast",
      calories: "200",
      time: "08:00 AM",
      carbs: "24 mg",
    },
    {
      image: meatImage,
      food: "Fish",
      meal: "Lunch",
      calories: "540",
      time: "12:30 PM",
      carbs: "12 mg",
    },
    {
      image: meatImage,
      food: "Veggies",
      meal: "Dinner",
      calories: "120",
      time: "06:00 PM",
      carbs: "30 mg",
    },
    {
      image: meatImage,
      food: "Pasta",
      meal: "Snack",
      calories: "300",
      time: "03:45 PM",
      carbs: "45 mg",
    },
    {
      image: meatImage,
      food: "Chicken",
      meal: "Breakfast",
      calories: "400",
      time: "09:15 AM",
      carbs: "20 mg",
    },
    {
      image: meatImage,
      food: "Meat",
      meal: "Breakfast",
      calories: "200",
      time: "08:00 AM",
      carbs: "24 mg",
    },
    {
      image: meatImage,
      food: "Fish",
      meal: "Lunch",
      calories: "540",
      time: "12:30 PM",
      carbs: "12 mg",
    },
    {
      image: meatImage,
      food: "Veggies",
      meal: "Dinner",
      calories: "120",
      time: "06:00 PM",
      carbs: "30 mg",
    },
    {
      image: meatImage,
      food: "Pasta",
      meal: "Snack",
      calories: "300",
      time: "03:45 PM",
      carbs: "45 mg",
    },
    {
      image: meatImage,
      food: "Chicken",
      meal: "Breakfast",
      calories: "400",
      time: "09:15 AM",
      carbs: "20 mg",
    },
  ];
  
  const FoodList = () => {
    return (
      <div className="flex flex-col justify-between gap-4 h-52 text-white">
        {foodItems.map((item, index) => (
          <Food
            key={index}
            image={item.image}
            food={item.food}
            meal={item.meal}
            calories={item.calories}
            time={item.time}
            carbs={item.carbs}
          />
        ))}
      </div>
    );
  };
  
  export default FoodList;
  