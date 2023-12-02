import Image from "next/image";
import Link from "next/link";
import introCard from "../../components/introCard.jsx";

export default function Home() {
  return (
    <div className="">
      <h1 className="text-3xl text-blue-text">Overview Page</h1>
      <introCard />
    </div>
  );
}
