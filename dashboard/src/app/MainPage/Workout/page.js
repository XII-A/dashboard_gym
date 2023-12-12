import React from "react";
import Achievement from "../../../components/Achievement";

const page = () => {
  return (
    <div>
      <div className="text-3xl text-white mt-3 mx-5">Achievements</div>
      <div className="flex flex-wrap justify-between mt-3 mx-5">
        <Achievement icon="steps" value="123" />
        <Achievement icon="sets" value={"50"} />
        <Achievement icon="calories" value="10K" />
        <Achievement icon="hours" value="100" />
        <Achievement icon="poses" value="69" />
      </div>
    </div>
  );
};

export default page;
