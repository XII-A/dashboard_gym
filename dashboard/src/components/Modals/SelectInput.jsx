import React from "react";

const SelectInput = ({ options, foodInfo, setSelected, property }) => {
  return (
    <div>
      <select
        className="bg-white/5 text-white/60 text-sm rounded-lg block w-full px-2 py-1 shadow-lg"
        onChange={(e) => {
          setSelected({ ...foodInfo, [property]: e.target.value });
        }}
      >
        <option selected className="bg-[#2C3034] text-white/60 text-sm">
          {foodInfo[property]}
        </option>
        {options.map((val) => {
          if (foodInfo[property] !== val) {
            return (
              <option
                key={val}
                value={val}
                className="bg-[#2C3034] text-white/60 text-sm"
              >
                {val}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};

export default SelectInput;
