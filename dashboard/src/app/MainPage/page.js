
import IntroCard from "../../components/IntroCard";
import image from "../../../public/girl.png";

export default function Home() {
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
    </div>
  );
}
