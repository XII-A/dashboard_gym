import SideBar from "@/components/SideBar";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <div class="flex flex-col">
      <div className="flex flex-row min-h-screen">
        <div class="w-64 bg-purple-500">
          <SideBar />
        </div>
        <div class="bg-red-50 w-full">
          <div className="bg-red-800 h-20">
            <Header />
          </div>
          Content here
          {children}
        </div>
      </div>
    </div>
  );
}
