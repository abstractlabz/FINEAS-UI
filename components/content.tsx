import type { NextPage } from "next";
import GroupComponent1 from "./group-component1";
import Component1 from "./component1";

export type ContentType = {
  className?: string;
};

const Content: NextPage<ContentType> = ({ className = "" }) => {
  // Define the data to pass to GroupComponent1
  const groupData = [
    { title: "Inexpensive startup and management fees" },
    { title: "Easy-to-use AI tools" },
    { title: "Customizable insights and reports" },
  ];

  return (
    <section
      className={`self-stretch flex flex-row items-start justify-end pt-0 pb-[185px] pl-0 pr-px box-border max-w-full text-center text-45xl text-white font-sarabun mq450:pb-[51px] mq450:box-border mq1050:pb-[78px] mq1050:box-border mq1225:pb-[120px] mq1225:box-border ${className}`}
    >
      <div className="flex-1 bg-mediumblue flex flex-col items-start justify-start pt-[200px] pb-[154px] pl-[87px] pr-20 box-border relative gap-[139px] max-w-full z-[2] mq450:gap-[35px] mq450:pl-5 mq450:box-border mq750:gap-[69px] mq750:pt-[84px] mq750:pb-[65px] mq750:pl-[43px] mq750:pr-10 mq750:box-border mq1225:pt-[130px] mq1225:pb-[100px] mq1225:box-border">
        <div className="w-[1280px] h-[1510px] relative bg-mediumblue hidden max-w-full z-[0]" />
        <div className="self-stretch flex flex-col items-start justify-start gap-[92px] max-w-full mq750:gap-[23px] mq1225:gap-[46px]">
          <h1 className="m-0 self-stretch relative text-inherit tracking-[0.02em] font-bold font-[inherit] z-[3] mq450:text-19xl mq750:text-32xl">
            <p className="m-0">{`Your AI edge. `}</p>
            <p className="m-0 ">Play the game, change the rules.</p>
          </h1>
          <div className="self-stretch flex flex-row items-start justify-start py-0 px-36 box-border max-w-full text-13xl mq750:pl-9 mq750:pr-9 mq750:box-border mq1225:pl-[72px] mq1225:pr-[72px] mq1225:box-border">
            <h1 className="m-0 flex-1 relative text-inherit tracking-[0.02em] font-bold font-[inherit] inline-block max-w-full z-[3] mq450:text-lgi mq750:text-7xl">
              Trust the data, not the drama. Fineas offers instant insights at a
              fraction of the cost.
            </h1>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start py-0 pl-[13px] pr-[19px] box-border max-w-full text-xl font-quicksand relative z-1000">
          <GroupComponent1/>
        </div>
        <Component1 />
      </div>
    </section>
  );
};

export default Content;
