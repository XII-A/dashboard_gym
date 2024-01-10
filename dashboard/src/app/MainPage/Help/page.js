import React from "react";
import faqData from "../../../components/faqDataList";

const page = () => {
  return (
    <div
      className="flex flex-col justify-start items-start py-2 px-4 overflow-y-scroll"
      style={{ height: "calc(100vh - 5rem)" }}
    >
      <div className="text-2xl font-bold text-white my-4">
        Frequently Asked Questions :
      </div>
      <ul className="w-full divide-y     rounded-xl text-white">
        {faqData.map((faq, index) => {
          return (
            <li className="border-none mb-4 " key={index}>
              <details className="group ">
                <summary className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer bg-blue-default/85 rounded-xl">
                  <svg
                    className="w-5 h-5 text-white transition group-open:rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    ></path>
                  </svg>
                  <span>{faq.question}</span>
                </summary>

                <article className="px-4 pb-4 border-none mt-4">
                  <p className="border-none">{faq.answer}</p>
                </article>
              </details>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default page;
