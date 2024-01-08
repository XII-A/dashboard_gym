import Image from "next/image";


const IntroCard = ({ image, title, subtitle }) => {
  return (
    <div className="overflow-hidden flex relative h-full rounded-xl   ">
      <div className=" p-7 bg-blue-default  rounded-xl flex-column  ">
        <div className="z-90 w-[64px] h-[64px] left-[-24px] bottom-[-24px] absolute bg-sky-500 bg-opacity-60 rounded-full" />
        <div className="z-90 w-[128px] h-[128px] left-[-32px] bottom-[-32px] absolute bg-sky-500 bg-opacity-60 rounded-full" />
        <div className="relative z-100 text-gray-50 text-3xl font-bold w-[50%]">
          {title}
        </div>
        <div className="relative z-100 text-gray-50 text-sm font-light w-[40%]">
          {subtitle}
        </div>
      </div>
      <div className=" absolute right-0  ">
        <div
          className="z-90 absolute w-[200px] h-[173px]  bg-gradient-to-r from-blue-default from-0% to-100%"
          style={{ zIndex: 90 }}
        ></div>
        <Image
          className="rounded-xl relative "
          width={450}
          style={{ zIndex: 80 }}
          height={173}
          src={image}
        />
      </div>
      <div className="">
        {/* <div className="z-30 w-[67px] h-[67px] left-[0] top-[0] absolute bg-sky-500 bg-opacity-60 rounded-full" />
        <div className="z-40 w-[134px] h-[134px] left-0 top-0 absolute bg-sky-500 bg-opacity-60 rounded-full" /> */}
      </div>
    </div>
  );
};

export default IntroCard;
