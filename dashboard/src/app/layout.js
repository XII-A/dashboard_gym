import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"font-manrope"}>
        <div class="min-h-screen flex flex-col">
          <div className="flex flex-row ">
            <div class="w-60 bg-purple-200 min-h-screen">Sidebar here</div>
            <div class="bg-red-50 w-full">
              <div className="bg-red-800 h-20">Header here</div>
              Content here
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
