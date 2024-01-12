import React from "react";
import { FaAngleRight } from "react-icons/fa";

const ScheduleDayPicker = ({
  setSelectedDay,
  selectedDay,
  daysOfWeek,
  setOpenModal,
  turnOnButton,
}) => {
  return (
    <div className=" bg-bgColor-secondary w-full p-2 rounded-lg">
      <div className="flex justify-between px-2 items-center">
        <div className="text-3xl text-gray-50">{selectedDay}</div>
        <div className="flex items-center gap-2">
          <div>
            <select
              id="days"
              className="bg-blue-default text-white text-sm rounded-lg block w-full p-2.5"
              onChange={(e) => {
                setSelectedDay(e.target.value);
              }}
            >
              <option selected className="bg-[#2C3034] text-white/60 text-sm">
                {selectedDay}
              </option>
              {daysOfWeek.map((day) => {
                if (day !== selectedDay) {
                  return (
                    <option
                      key={day}
                      value={day}
                      className="bg-[#2C3034] text-white/60 text-sm"
                    >
                      {day}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          {turnOnButton && (
            <button
              className="disabled:opacity-40 flex w-fit justify-center rounded-md bg-blue-default px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-light"
              onClick={() => setOpenModal(true)}
            >
              Add Workout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleDayPicker;
