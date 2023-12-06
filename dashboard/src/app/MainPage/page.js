import InfoCard from "../../components/InfoCard";
import IntroCard from "../../components/IntroCard";
import image from "../../../public/girl.png";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <div className="flex flex-col w-full p-4">
            <div className="w-full mb-2 ">
              <IntroCard
                image={image}
                title={"Track Your Daily Activities"}
                subtitle={
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"
                }
              />
            </div>
            <div className="flex flex-row justify-between gap-4 h-44 text-white ">
              <InfoCard parameter={"workout"} value={"4 hours"} />
              <InfoCard parameter={"calories"} value={"1800 kcl"} />
              <InfoCard parameter={"steps"} value={"5000 steps"} />
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-slate-600 ">
          <div>test</div>
        </div>
      </div>
    </>
  );
}
