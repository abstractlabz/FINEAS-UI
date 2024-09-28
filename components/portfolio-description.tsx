import type { NextPage } from "next";

export type PortfolioDescriptionType = {
  className?: string;
};

const PortfolioDescription: NextPage<PortfolioDescriptionType> = ({
  className = "",
}) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-center pt-0 pb-[221px] pl-5 pr-6 box-border max-w-full text-left text-29xl text-white font-sarabun mq750:pb-36 mq750:box-border ${className}`}
    >
      <div className="w-[980px] flex flex-row items-start justify-start gap-6 max-w-full mq1050:flex-wrap">
        {/* Left Column */}
        <div className="flex-1 flex flex-col items-start justify-start relative max-w-full mq750:min-w-full">
          {/* Background Gradient */}
          <div className="h-[923px] w-[923px] absolute bottom-[-393px] left-[-482px] rounded-full bg-gradient-to-b from-purple-500 via-transparent to-transparent opacity-15" />
          {/* Heading */}
          <h1 className="m-0 flex-1 relative text-inherit tracking-[0.02em] top-[-100px] font-bold inline-block max-w-full z-[3] mq450:text-10xl mq750:text-19xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              A portfolio crafted to suit your unique interests.
            </span>
            <span>
              Fineas integrates your finance apps with analyst insights for tailored support.
            </span>
          </h1>
        </div>
        {/* Right Column */}
        <div className="flex flex-col items-start justify-start pt-6 px-0 pb-0 box-border max-w-full mq750:min-w-full mq1050:flex-1">
          <div className="self-stretch flex items-start justify-start top-[30px] relative max-w-full">
            {/* Background Gradient */}
            <div className="h-[654px] w-[654px] absolute right-[-367px] rounded-full bg-gradient-to-b from-blue-500 via-transparent to-transparent opacity-25" />
            {/* Image */}
            <img
              className="w-[70%] h-auto max-w-full relative overflow-hidden object-cover shrink-0 z-[2] mx-auto"
              loading="lazy"
              alt=""
              src="/group-43@2x.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioDescription;
