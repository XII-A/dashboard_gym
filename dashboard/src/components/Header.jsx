"use client";
import React, { useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import { IoIosNotifications } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
const Header = () => {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (session) {
      setImage(session.user.user.profilepicUrl);
      setLoading(false);
    }
  }, [session]);
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

        {loading ? (
          <div className="bg-transparent rounded-full w-16 h-16 flex flex-row items-center justify-center">
            <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-blue-default"></div>
          </div>
        ) : image ? (
          <Image
            src={image}
            width={40}
            height={40}
            className="rounded-full"
            alt="profileimage"
          />
        ) : (
          <Image
            src="/emptyAvatar.svg"
            width={40}
            height={40}
            className="rounded-full"
            alt="profileimage"
          />
        )}
      </div>
    </div>
  );
};

export default Header;
