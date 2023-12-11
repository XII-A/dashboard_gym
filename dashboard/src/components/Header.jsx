"use client";
import React from "react";
import { RiSearchLine } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import { IoIosNotifications } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";
import { app } from "@/app/firebase";
import { getStorage, ref as storageRef } from "firebase/storage";
import { useDownloadURL } from "react-firebase-hooks/storage";
const Header = () => {
  const [user] = useAuthState(auth);
  const storage = getStorage(app);
  const [value, loading, error] = useDownloadURL(
    storageRef(storage, `ProfilePics/${user?.uid}`)
  );

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
          <div className="bg-white rounded-full w-16 h-16 flex flex-row items-center justify-center">
            <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-blue-default"></div>
          </div>
        ) : (
          <Image src={value} width={40} height={40} className="rounded-full" />
        )}
      </div>
    </div>
  );
};

export default Header;
