import type { NextPage } from "next";
import Main from "../components/main";
import Content from "../components/content";
import InsightsContainer from "../components/insights-container";
import PortfolioDescription from "../components/portfolio-description";
import MarketResearchContainer from "../components/market-research-container";

const VERSION3HOME: NextPage = () => {
  return (
    <div className="w-full relative bg-midnightblue-200 overflow-hidden flex flex-col items-end justify-start gap-[100px] leading-[normal] tracking-[normal] mq450:gap-[30px] mq750:gap-[60px]">
      <div className="self-stretch h-[792px] relative hidden z-[2]" />
      <Main />
      <Content />
      <section className="w-[923px] h-[923px] absolute !m-[0] top-[2254px] left-[-334px] rounded-full bg-gradient-to-b from-purple-500 via-transparent to-transparent opacity-15 z-[3]" />
      <div className="w-[654px] h-[654px] absolute !m-[0] top-[2200px] right-[-215px] rounded-full bg-gradient-to-b from-blue-500 via-transparent to-transparent opacity-25 z-[3]" />
      <InsightsContainer />
      <div className="absolute !m-[0] right-[70px] bottom-[-125px] z-[1]">
      <img
        className="w-[340px] h-[345px] absolute !m-[0] right-[70px] bottom-[2160px] z-[1]"
        loading="lazy"
        alt=""
        src="/group-35.svg"
      />
      </div>
      <PortfolioDescription />
      <div className="self-stretch flex flex-row items-start justify-center py-0 pl-5 pr-[22px]">
        <img
          className="h-[132px] w-[132px] relative rounded-[29px] object-cover z-[2] drop-shadow-[0_0_5px_white]"
          loading="lazy"
          alt=""
          src="/iphone-1@2x.png"
        />
      </div>
      <MarketResearchContainer />
    </div>
  );
};

export default VERSION3HOME;
