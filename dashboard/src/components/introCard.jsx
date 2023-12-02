import React from "react";
import Image from "next/image";

const introCard = () => {
  return (
    <div className="h-screen w-screen">
      <div className="text-white">hello</div>
      <div>
        <Image width={500} height={500} src="public/GirlStretching.png" />
      </div>
    </div>
  );
};

export default introCard;
