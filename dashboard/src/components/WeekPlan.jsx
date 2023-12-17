const WeekPlan = ({ day, food_meal, time }) => {
    return (
      <>
        <div className="flex flex-row items-center justify-between  bg-bgColor-trinary  h-auto rounded-lg text-white py-4 px-3 mb-4">
          <div className="flex-col  items-start">
            <div className="text-lg">{day}</div>
            <div className="text-xs">{food_meal}</div>
          </div>
          <div className="text-blue-text">{time}</div>
        </div>
      </>
    );
  };
  
  export default WeekPlan;
  