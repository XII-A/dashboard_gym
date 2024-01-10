import React from "react";

const AutoComplete = ({
  data,
  foodInfo,
  setFoodInfo,
  setData,
  setInfoLoading,
}) => {
  const handleItemClick = async (foodName) => {
    console.log(foodName);
    setData([]);
    setInfoLoading(true);
    try {
      const res = await fetch(
        `https://api.api-ninjas.com/v1/nutrition?query=${foodName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": process.env.NEXT_PUBLIC_NINJA_API_KEY,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setFoodInfo({
        ...foodInfo,
        food: data[0].name,
        calories: data[0].calories ,
        carbs: data[0].carbohydrates_total_g,
      });
      setInfoLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="absolute top-[100%] z-10 flex max-h-32 w-full flex-col overflow-y-auto rounded-b-3xl rounded-t-sm border border-t-0 border-gray-500 bg-bgColor-primary  shadow-2xl  ">
      <>
        {data.map((foodItem, index) => {
          return (
            <div
              key={index}
              className="flex flex-col p-2 hover:bg-bgColor-trinary"
            >
              <div
                className="text-white"
                onClick={() => {
                  handleItemClick(foodItem.title);
                }}
              >
                {foodItem.title}
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
};

export default AutoComplete;
