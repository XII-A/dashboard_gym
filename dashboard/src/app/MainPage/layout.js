import SideBar from "@/components/SideBar";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <div class="flex flex-row h-full ">
      <div className="flex flex-row ">
        <div class="w-64 bg-purple-500 ">
          <SideBar />
        </div>
      </div>
      <div class="bg-red-50 w-full  flex flex-col box-border">
        <div className="h-20">
          <Header />
        </div>

        <div
          style={{
            height: "calc(100vh - 5rem)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
