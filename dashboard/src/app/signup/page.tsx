import React from "react";
import SignUpForm from "@/components/SignUpForm";
type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-manrope bg-bgColor-secondary items-center">
      <SignUpForm />
    </div>
  );
};

export default page;
