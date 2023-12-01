import { Inter } from "next/font/google";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <div class="min-h-screen flex flex-col">
      <div className="flex flex-row ">
        <div class="w-60 bg-purple-200 min-h-screen">
          Sidebar here
          <div className="flex flex-col justify-between">
            <Link href="/MainPage/DietPlan">Diet Plan</Link>
            <Link href="/MainPage/Workout">Workout</Link>
          </div>
        </div>
        <div class="bg-red-50 w-full">
          <div className="bg-red-800 h-20">Header here</div>
          Content here
          {children}
        </div>
      </div>
    </div>
  );
}
