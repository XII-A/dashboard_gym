import React from "react";

const AutoCompleteWorkOut = ({
  data,
  workoutInfo,
  setWorkoutInfo,
  setData,
  setLoading,
  loading,
  nothingFound,
  handleGetInfo,
}) => {
  const handleItemClick = async (activity) => {
    // console.log(activity);
    if (activity?.name) {
      setWorkoutInfo({
        ...workoutInfo,
        workoutName: activity.name,
        calories: activity.calories_per_hour,
      });
      setData([]);
    } else {
      handleGetInfo(activity);
    }
    // setInfoLoading(true);
  };

  return (
    <div className="absolute top-[100%] z-10 flex max-h-32 w-full flex-col overflow-y-auto rounded-b-3xl rounded-t-sm border border-t-0 border-gray-500 bg-bgColor-primary  shadow-2xl  ">
      {loading && (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
        </div>
      )}
      {nothingFound && (
        <div className="flex justify-center items-center h-full">
          <div className="text-white">Nothing found</div>
        </div>
      )}
      <>
        {data.map((activity, index) => {
          return (
            <div
              key={index}
              className="flex flex-col p-2 hover:bg-bgColor-trinary"
              onClick={() => {
                handleItemClick(activity);
              }}
            >
              {activity?.name ? (
                <div className="text-white">{activity.name}</div>
              ) : (
                <div className="text-white">{activity}</div>
              )}
              {activity?.calories_per_hour && (
                <div className="text-white text-sm">
                  calories per/h: {activity?.calories_per_hour}
                </div>
              )}
            </div>
          );
        })}
      </>
    </div>
  );
};

export default AutoCompleteWorkOut;
