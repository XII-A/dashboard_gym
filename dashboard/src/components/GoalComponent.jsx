const GoalComponent = ({ exerciseName, exerciseTime, sets }) => {
  return (
    <>
      <div className="flex flex-row items-center justify-between  bg-bgColor-trinary/70  h-auto rounded-lg text-white py-4 px-3">
        <div className="flex-col  items-start">
          <div className="text-lg">{exerciseName}</div>
          <div className="text-xs">{exerciseTime}</div>
        </div>
        <div className="text-blue-text">{sets}</div>
      </div>
    </>
  );
};

export default GoalComponent;
