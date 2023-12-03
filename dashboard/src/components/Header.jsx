import React from "react";
import { RiSearchLine } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import { IoIosNotifications } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import Image from "next/image";
const Header = () => {
  return (
    <div className="flex flex-row items-center py-6 px-8 bg-bgColor-secondary h-full ">
      {/* Welcome Message */}
      <div className="flex flex-col items-start justify-center mr-auto ">
        <div className="text-xs text-[#E9ECEF]">Good morning</div>
        <div className="text-base font-medium text-white mt-1">
          Welcome back!
        </div>
      </div>
      {/* Search */}

      <div className="flex flex-row items-center bg-bgColor-trinary  w-6/12  px-2  rounded-md">
        <RiSearchLine className="text-white " />
        <Input className="outline-none border-none text-white" />
      </div>
      <div className="flex flex-row gap-2 ml-4 items-center">
        <IoIosNotifications size={24} className="text-white cursor-pointer" />
        <IoMdSettings size={24} className="text-white cursor-pointer" />

        <Image
          class="w-10 h-10 rounded-full cursor-pointer"
          src="/person3.png"
          alt="Rounded avatar"
          width={40}
          height={40}
        />
      </div>
    </div>
  );
};

export default Header;
