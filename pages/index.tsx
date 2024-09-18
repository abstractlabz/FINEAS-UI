import type { NextPage } from "next";
import Main from "../components/main";
import Content from "../components/content";
import InsightsContainer from "../components/insights-container";
import PortfolioDescription from "../components/portfolio-description";
import MarketResearchContainer from "../components/market-research-container";

const HomePage: NextPage = () => {
  return (
    <div className="w-full bg-midnightblue-200 overflow-hidden flex flex-col items-center justify-start gap-10">
      <Main />
      <Content />
      <InsightsContainer />
      <PortfolioDescription />
      <MarketResearchContainer />
    </div>
  );
};

export default HomePage;
