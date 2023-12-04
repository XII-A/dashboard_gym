const GoalComponent = ({ exerciseName, exerciseTime, sets }) => {
  return (
    <>
      <div
        className="flex justify-between items-center bg-bgColor-trinary w-full h-20 rounded-lg text-white px-2 py-1"
        style={{ height: "auto" }}
      >
        <div className="flex-col  items-start">
          <div className="text-l">{exerciseName}</div>
          <div className="text-sm">{exerciseTime}</div>
        </div>
        <div className="text-blue-text">{sets}</div>
      </div>
    </>
  );
};

export default GoalComponent;
