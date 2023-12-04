import InfoCard from "../../components/InfoCard";
import IntroCard from "../../components/IntroCard";
import image from "../../../public/girl.png";

export default function Home() {
  const number = "2 hours";
  return (
    <div className="">
      <h1 className="text-3xl text-blue-text">Overview Page</h1>
      <div className="flex">
        <IntroCard
          image={image}
          title={"Track Your Daily Activities"}
          subtitle={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"
          }
        />
      </div>
      <div className="flex flex-wrap">
        <InfoCard className="w-[252px] h-[168px]" parameter={"sleep"} value={number} />
        <InfoCard className="w-[252px] h-[168px]" parameter={"steps"} value={number} />
        <InfoCard className="w-[252px] h-[168px]" parameter={"calories"} value={number} />
        <InfoCard className="w-[252px] h-[168px]" parameter={"water"} value={number} />
        <InfoCard className="w-[252px] h-[168px]" parameter={"workout"} value={number} />
        <InfoCard className="w-[252px] h-[168px]" parameter={"fat"} value={number} />
      </div>
    </div>
  );
}
