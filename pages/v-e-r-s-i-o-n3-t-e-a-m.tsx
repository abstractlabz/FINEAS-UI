import type { NextPage } from "next";
import Header from "../components/header";
import SignUp from "../components/sign-up";

const VERSION3TEAM: NextPage = () => {
  return (
    <div className="w-full relative bg-midnightblue-200 overflow-hidden flex flex-col items-end justify-start pt-7 px-0 pb-0 box-border gap-[873px] leading-[normal] tracking-[normal] mq450:gap-[218px] mq750:gap-[436px]">
      <Header />
      <main className="w-full h-[1373px] absolute !m-[0] top-[0px] right-[0px] left-[0px]">
        <div className="absolute top-[719px] left-[-28px] rounded-[50%] [background:radial-gradient(50%_50%_at_50%_50%,_rgba(31,_85,_255,_0.2),_rgba(31,_85,_255,_0))] w-[654px] h-[654px]" />
        <div className="absolute top-[214px] left-[822px] rounded-[50%] [background:radial-gradient(50%_50%_at_50%_50%,_rgba(31,_85,_255,_0.2),_rgba(31,_85,_255,_0))] w-[654px] h-[654px]" />
        <img
          className="absolute top-[568px] left-[96px] w-[1087px] h-[496px] object-cover z-[1]"
          alt=""
          src="/group-49@2x.png"
        />
        <div className="absolute top-[0px] left-[0px] w-[421px] h-[606px]">
          <div className="absolute top-[-48px] left-[-233px] rounded-[50%] [background:radial-gradient(50%_50%_at_50%_50%,_rgba(217,_31,_255,_0.1),_rgba(217,_31,_255,_0))] w-[654px] h-[654px]" />
        </div>
      </main>
      <footer className="self-stretch bg-mediumblue flex flex-row items-start justify-between pt-[57px] pb-10 pl-[58px] pr-[72px] box-border max-w-full gap-5 z-[1] text-left text-base text-white font-public-sans lg:flex-wrap mq750:pl-[29px] mq750:pr-9 mq750:box-border">
        <div className="h-[150px] w-[1280px] relative bg-mediumblue hidden max-w-full" />
        <div className="rounded-14xl-5 bg-indigo-100 flex flex-row items-start justify-start py-[5.7px] pl-[33px] pr-1.5 box-border gap-[55.9px] max-w-full z-[2] text-mini font-inter mq450:gap-7 mq750:flex-wrap">
          <div className="h-[53px] w-[443px] relative rounded-14xl-5 bg-indigo-100 hidden max-w-full" />
          <div className="flex flex-col items-start justify-start pt-[13.3px] px-0 pb-0">
            <div className="relative z-[1]">
              Email me about the Beta Launch!
            </div>
          </div>
          <SignUp />
        </div>
        <div className="w-[370px] flex flex-col items-start justify-start pt-[17px] pb-0 pl-0 pr-8 box-border max-w-full">
          <div className="self-stretch flex flex-row items-start justify-between gap-5 mq450:flex-wrap">
            <b className="relative inline-block min-w-[64px] z-[2]">Support</b>
            <a className="[text-decoration:none] relative font-bold text-[inherit] z-[2]">
              About
            </a>
            <b className="relative inline-block min-w-[42px] z-[2]">FAQs</b>
            <b className="relative z-[2]">Privacy Policy</b>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start pt-[17px] px-0 pb-0">
          <b className="relative z-[2]">© Fineas.Ai, 2024</b>
        </div>
      </footer>
    </div>
  );
};

export default VERSION3TEAM;
