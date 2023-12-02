import React from "react";
import Image from "next/image";
import image from "../../public/girl.png";
import { eslint } from "../../next.config";

const IntroCard = ({ icon }) => {
  return (
    <div className="">
      <div className="text-white">hello</div>
      <div>
        <Image width={500} height={500} src={image} />
      </div>
    </div>
  );
};

export default IntroCard;
