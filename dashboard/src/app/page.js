import React from "react";
import { redirect } from "next/navigation";
import SignInForm from "@/components/SignInForm";
const page = () => {
  redirect("/signin");
  return (
    <div className="flex h-full">
      <SignInForm />
    </div>
  );
};

export default page;
