import React from "react";
import WeekPlan from "./WeekPlan";

const weekPlans = [
    { day: "Monday", food_meal: "Meat | Breakfast", time: "08:00 AM" },
    { day: "Tuesday", food_meal: "Fish | Lunch", time: "12:30 PM" },
    { day: "Wednesday", food_meal: "Veggies | Dinner", time: "06:00 PM" },
    { day: "Thursday", food_meal: "Pasta | Snack", time: "03:45 PM" },
    { day: "Friday", food_meal: "Chicken | Breakfast", time: "09:15 AM" },
    { day: "Saturday", food_meal: "Pasta | Snack", time: "03:45 PM" },
    { day: "Sunday", food_meal: "Chicken | Breakfast", time: "09:15 AM" },
  ];
  
  const WeekPlanList = () => {
    return (
      <div>
        {weekPlans.map((plan, index) => (
          <WeekPlan
            key={index}
            day={plan.day}
            food_meal={plan.food_meal}
            time={plan.time}
          />
        ))}
      </div>
    );
  };
  
  export default WeekPlanList;
  