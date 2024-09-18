import type { NextPage } from "next";
import Main from "../components/main";
import Content from "../components/content";
import InsightsContainer from "../components/insights-container";
import PortfolioDescription from "../components/portfolio-description";
import MarketResearchContainer from "../components/market-research-container";

const VERSION3HOME: NextPage = () => {
  return (
    <div className="w-full relative bg-midnightblue-200 overflow-hidden flex flex-col items-end justify-start gap-[152px] leading-[normal] tracking-[normal] mq450:gap-[38px] mq750:gap-[76px]">
      <div className="self-stretch h-[792px] relative hidden z-[2]" />
      <Main />
      <Content />
      <section className="w-[923px] h-[923px] absolute !m-[0] top-[2254px] left-[-334px] rounded-[50%] [background:radial-gradient(50%_50%_at_50%_50%,_rgba(217,_31,_255,_0.15),_rgba(217,_31,_255,_0))] z-[3]" />
      <div className="w-[654px] h-[654px] absolute !m-[0] top-[2204px] right-[-215px] rounded-[50%] [background:radial-gradient(50%_50%_at_50%_50%,_rgba(31,_85,_255,_0.25),_rgba(31,_85,_255,_0))] z-[3]" />
      <InsightsContainer />
      <img
        className="w-[368px] h-[366px] absolute !m-[0] right-[152px] bottom-[2236px] z-[1]"
        loading="lazy"
        alt=""
        src="/group-35.svg"
      />
      <PortfolioDescription />
      <div className="self-stretch flex flex-row items-start justify-center py-0 pl-5 pr-[22px]">
        <img
          className="h-[132px] w-[132px] relative rounded-[29px] object-cover z-[2]"
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
