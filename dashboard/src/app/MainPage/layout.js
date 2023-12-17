import SideBar from "@/components/SideBar";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <div class="flex flex-row h-full ">
      <div className="flex flex-row ">
        <div class="w-64 bg-purple-500">
          <SideBar />
        </div>
      </div>
      <div class="bg-bgColor-primary w-full h-full flex flex-col">
        <div className="bg-red-800 h-20">
          <Header />
        </div>

        <div className="h-full">{children}</div>
      </div>
    </div>
  );
}
