import React from "react";
import faqData from "../../../components/faqDataList";

const page = () => {
  return (
    <div className="flex flex-col justify-between h-[88vh] py-2 px-4 overflow-y-scroll max-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-400">
        Frequently Asked Questions
      </h1>

      {faqData.map((item) => (
        <div key={item.number} className="mb-4">
          <h2 className="text-xl font-semibold mb-2 text-blue-text">
            {`${item.number}. ${item.question}`}
          </h2>
          <p className="text-blue-light">{item.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default page;
