import type { NextPage } from "next";
import GroupComponent from "./group-component";
import SignUp from "./sign-up";

export type MarketResearchContainerType = {
  className?: string;
};

const MarketResearchContainer: NextPage<MarketResearchContainerType> = ({
  className = "",
}) => {
  return (
    <section
      className={`self-stretch flex flex-col items-start justify-start gap-[51px] max-w-full text-center text-53xl text-white font-sarabun mq750:gap-[25px] ${className}`}
    >
      <div className="self-stretch flex flex-row items-start justify-start pt-0 pb-[33px] pl-44 pr-[177px] box-border max-w-full mq450:pl-5 mq450:pr-5 mq450:box-border mq750:pl-[88px] mq750:pr-[88px] mq750:box-border">
        <h1 className="m-0 flex-1 relative text-inherit font-bold font-[inherit] text-transparent !bg-clip-text [background:linear-gradient(180deg,_#fff,_#6b31ff)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block max-w-full z-[2] mq450:text-24xl mq750:text-39xl">{`Master market research with Fineas. `}</h1>
      </div>
      <div className="self-stretch flex flex-row items-start justify-center py-0 pl-5 pr-[23px] text-xl">
        <div className="w-[295px] flex flex-col items-end justify-start gap-[88px] mq450:gap-11">
          <div className="self-stretch flex flex-row items-start justify-end py-0 pl-[45px] pr-11 mq450:pl-5 mq450:pr-5 mq450:box-border">
            <GroupComponent />
          </div>
          <div className="self-stretch flex flex-row items-start justify-start gap-[42px] text-left font-public-sans mq450:gap-[21px]">
            <div className="flex flex-col items-start justify-start pt-1.5 px-0 pb-0">
              <b className="relative inline-block min-w-[91px] mq450:text-base">
                Follow us
              </b>
            </div>
            <div className="flex-1 flex flex-row items-start justify-between gap-5">
              <img
                className="h-9 w-9 relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/raphaelfacebook.svg"
              />
              <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
                <img
                  className="w-[30px] h-[30px] relative overflow-hidden shrink-0 object-cover"
                  loading="lazy"
                  alt=""
                  src="/primetwitter@2x.png"
                />
              </div>
              <img
                className="h-[37px] w-[37px] relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/mdiinstagram.svg"
              />
            </div>
          </div>
        </div>
      </div>
      <footer className="self-stretch bg-mediumblue flex flex-row items-start justify-between pt-[57px] pb-10 pl-[58px] pr-[72px] box-border max-w-full gap-5 text-left text-base text-white font-public-sans mq750:pl-[29px] mq750:pr-9 mq750:box-border mq1225:flex-wrap mq1225:justify-center">
        <div className="h-[150px] w-[1280px] relative bg-mediumblue hidden max-w-full" />
        <div className="rounded-14xl-5 bg-indigo-100 flex flex-row items-start justify-center py-[5.7px] pl-[33px] pr-1.5 box-border gap-[55.9px] max-w-full z-[1] text-mini font-inter mq450:gap-7 mq750:flex-wrap">
          <div className="h-[53px] w-[443px] relative rounded-14xl-5 bg-indigo-100 hidden max-w-full" />
          <div className="flex flex-col items-start justify-start pt-[13.3px] px-0 pb-0">
            <div className="relative z-[1]">
              Email me about the Beta Launch!
            </div>
          </div>
          <SignUp
            propWidth="108.5px"
            propTextDecoration="unset"
            propFontWeight="unset"
            propDisplay="unset"
            propMinWidth="unset"
            signUpPosition="relative"
            signUpTop="unset"
            signUpLeft="unset"
            signUpHeight="unset"
            signUpDisplay="flex"
            signUpFlexDirection="row"
            signUpPadding="11.3px 24px 11.4px"
            rectangleDivTop="0px"
            rectangleDivRight="0px"
            rectangleDivBottom="0px"
            rectangleDivLeft="0px"
            rectangleDivMargin="0 !important"
            signUpPosition1="relative"
            signUpHeight1="unset"
            signUpWidth="unset"
            signUpTop1="unset"
            signUpLeft1="unset"
            signUpFlex="1"
          />
        </div>
        <div className="w-[370px] flex flex-col items-start justify-start pt-[17px] pb-0 pl-0 pr-8 box-border max-w-full">
          <div className="self-stretch flex flex-row items-start justify-between gap-5 mq450:flex-wrap">
            <b className="relative inline-block min-w-[64px] z-[1]">Support</b>
            <b className="relative z-[1]">About</b>
            <b className="relative inline-block min-w-[42px] z-[1]">FAQs</b>
            <b className="relative z-[1]">Privacy Policy</b>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start pt-[17px] px-0 pb-0">
          <b className="relative z-[1]">© Fineas.Ai, 2024</b>
        </div>
      </footer>
    </section>
  );
};

export default MarketResearchContainer;
