import React from "react";
import { FaPlus } from "react-icons/fa";

function Button({ extraClassNames, onClick }) {
  return (
    <button
      onClick={onClick}
      className={` text-white px-4 py-1.5 ${extraClassNames}`}
    >
      <FaPlus />
    </button>
  );
}

export default Button;
