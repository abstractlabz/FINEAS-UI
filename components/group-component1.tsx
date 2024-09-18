import type { NextPage } from "next";
import ChartElements from "./chart-elements";

export type GroupComponent1Type = {
  className?: string;
};

const GroupComponent1: NextPage<GroupComponent1Type> = ({ className = "" }) => {
  return (
    <div
      className={`flex-1 rounded-21xl bg-blueviolet flex flex-col items-start justify-start relative max-w-full z-[3] text-center text-xl text-white font-quicksand ${className}`}
    >
      <div className="self-stretch h-[675px] relative rounded-21xl bg-blueviolet hidden z-[0]" />
      <div className="w-[5px] h-[calc(100%_+_5px)] absolute !m-[0] top-[0px] right-[355px] bottom-[-5px] border-mediumblue border-r-[5px] border-solid box-border z-[1]" />
      <div className="w-[5px] h-[calc(100%_+_5px)] absolute !m-[0] top-[0px] bottom-[-5px] left-[360px] border-mediumblue border-r-[5px] border-solid box-border z-[1]" />
      <div className="self-stretch flex flex-row items-start justify-start gap-[5px] max-w-full text-5xl mq1050:flex-wrap">
        <img
          className="h-[135px] flex-1 relative max-w-full overflow-hidden object-contain z-[3]"
          loading="lazy"
          alt=""
          src="/rectangle-79.svg"
        />
        <div className="self-stretch flex-[0.8873] bg-midnightblue-100 flex flex-row items-start justify-center pt-[45px] px-5 pb-[37px] box-border max-w-full z-[4]">
          <img
            className="h-[135px] w-[355px] relative hidden max-w-full"
            alt=""
            src="/rectangle-84.svg"
          />
          <img
            className="h-[53px] w-[60px] relative object-cover z-[5]"
            loading="lazy"
            alt=""
            src="/loogggg-1@2x.png"
          />
        </div>
        <div className="flex-[0.6028] bg-darkblue flex flex-row items-start justify-start pt-[41px] pb-[34px] pl-[72px] pr-[69px] box-border max-w-full z-[3] mq450:pl-5 mq450:pr-5 mq450:box-border mq750:flex-1">
          <img
            className="h-[135px] w-[355px] relative hidden max-w-full"
            alt=""
            src="/rectangle-75.svg"
          />
          <h3 className="m-0 flex-1 relative text-inherit tracking-[0.02em] font-bold font-[inherit] z-[4] mq450:text-lgi">
            Traditional Financial Analyst
          </h3>
        </div>
      </div>
      <div className="w-[355px] h-[135px] relative bg-mediumblue hidden max-w-full z-[4]" />
      <img
        className="w-[360px] relative max-h-full hidden max-w-full z-[5]"
        alt=""
        src="/rectangle-82.svg"
      />
      <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[5px] box-border max-w-full">
        <div className="self-stretch flex-1 relative border-mediumblue border-t-[5px] border-solid box-border max-w-full z-[2]" />
      </div>
      <div className="w-[925px] flex flex-row items-end justify-between max-w-full gap-5 mq1050:flex-wrap">
        <div className="w-[720px] flex flex-row items-start justify-start gap-[5px] max-w-full mq750:flex-wrap">
          <div className="flex-[0.8781] bg-blueviolet flex flex-row items-start justify-start pt-10 pb-[30px] pl-[41px] pr-[38px] box-border min-w-[234px] max-w-full z-[4] mq450:flex-1">
            <img
              className="h-[120px] w-[360px] relative hidden max-w-full"
              alt=""
              src="/rectangle-81.svg"
            />
            <div className="flex-1 relative tracking-[0.02em] font-medium z-[5] mq450:text-base">
              Inexpensive startup and management fees
            </div>
          </div>
          <div className="flex-1 bg-indigo-200 flex flex-row items-start justify-center pt-9 px-5 pb-[35px] box-border min-w-[231px] max-w-full z-[3]">
            <div className="h-[120px] w-[355px] relative bg-indigo-200 hidden max-w-full" />
            <img
              className="h-[49px] w-[49px] relative overflow-hidden shrink-0 z-[4]"
              loading="lazy"
              alt=""
              src="/materialsymbolscheck.svg"
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[34px]">
          <img
            className="w-[50px] h-[50px] relative overflow-hidden shrink-0 z-[1]"
            loading="lazy"
            alt=""
            src="/bxx.svg"
          />
        </div>
      </div>
      <ChartElements instantAnswersToYourFinancial="Instant answers to your financial questions" />
      <div className="self-stretch h-[135px] flex flex-col items-start justify-start gap-[5px] max-w-full mq1050:h-auto">
        <div className="self-stretch h-[5px] relative border-mediumblue border-t-[5px] border-solid box-border z-[2]" />
        <div className="w-[985px] flex flex-row items-start justify-start py-0 px-[60px] box-border max-w-full mq1050:pl-[30px] mq1050:pr-[30px] mq1050:box-border">
          <div className="flex-1 flex flex-row items-start justify-start relative gap-16 max-w-full mq450:gap-4 mq750:gap-8 mq1050:flex-wrap">
            <div className="w-[241px] flex flex-col items-start justify-start pt-10 px-0 pb-0 box-border">
              <div className="relative tracking-[0.02em] font-medium z-[1] mq450:text-base">
                Accurate data accessible 24/7
              </div>
            </div>
            <img
              className="h-[50px] w-[50px] absolute !m-[0] right-[0px] bottom-[37px] overflow-hidden shrink-0 z-[1]"
              alt=""
              src="/bxx.svg"
            />
            <div className="bg-indigo-200 flex flex-row items-start justify-center pt-11 px-5 pb-[37px] box-border min-w-[355px] max-w-full z-[3] mq750:min-w-full mq1050:flex-1">
              <div className="h-[130px] w-[355px] relative bg-indigo-200 hidden max-w-full" />
              <img
                className="h-[49px] w-[49px] relative overflow-hidden shrink-0 z-[4] mq1050:flex-1"
                alt=""
                src="/materialsymbolscheck.svg"
              />
            </div>
          </div>
        </div>
      </div>
      <ChartElements
        propHeight="145px"
        propWidth="985px"
        propWidth1="660px"
        propGap="64px"
        propWidth2="241px"
        propPadding="45px 0px 0px"
        instantAnswersToYourFinancial="Defining characteristic here"
        propMinWidth="49px"
        propHeight1="140px"
        propPadding1="42px 0px 0px"
      />
    </div>
  );
};

export default GroupComponent1;
