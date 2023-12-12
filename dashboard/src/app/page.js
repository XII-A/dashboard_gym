import React from "react";
import { redirect } from "next/navigation";
const page = () => {
  redirect("/signin");
  return <div className="flex"></div>;
};

export default page;
