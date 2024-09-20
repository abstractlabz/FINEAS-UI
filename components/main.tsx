import type { NextPage } from "next";
import Home1 from "./home1";
import About1 from "./about1";
import FAQs from "./f-a-qs";
import SignUp from "./sign-up";
import Discord from "./discord";

export type MainType = {
  className?: string;
};

const Main: NextPage<MainType> = ({ className = "" }) => {
  return (
    <div
      className={`w-[629px] flex flex-row items-start justify-start relative max-w-full text-left text-base text-white font-public-sans ${className}`}
    >
      <img
        className="h-[436px] w-[681px] absolute !m-[0] bottom-[-35px] left-[-800px] object-cover z-[4]"
        alt=""
        src="/component-1@2x.png"
      />
      <div className="h-[975px] w-[1153px] absolute !m-[0] bottom-[-370px] left-[-651px]">
        <div className="absolute top-[321px] left-[499px] rounded-[50%] [background:radial-gradient(50%_50%_at_50%_50%,_rgba(31,_85,_255,_0.25),_rgba(31,_85,_255,_0))] w-[654px] h-[654px] z-[1]" />
        <div className="absolute top-[0px] left-[0px] w-[589px] h-[823px]">
          <div className="absolute top-[-100px] left-[-334px] rounded-[50%] [background:radial-gradient(50%_50%_at_50%_50%,_rgba(217,_31,_255,_0.15),_rgba(217,_31,_255,_0))] w-[923px] h-[923px]" />
          <img
            className="absolute top-[28px] left-[46px] w-[165px] h-11 object-cover z-[4]"
            loading="lazy"
            alt=""
            src="/white-logo--no-background-1@2x.png"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-row items-start justify-start flex-wrap content-start pt-0 px-0 pb-[105px] box-border gap-[30px] max-w-full mq750:pb-[68px] mq750:box-border">
        <div className="flex flex-col items-start justify-start pt-[41px] px-0 pb-0">
          <Home1 />
        </div>
        <div className="flex flex-col items-start justify-start pt-[41px] px-0 pb-0 text-silver">
          <About1 />
        </div>
        <div className="h-[500px] flex-1 relative min-w-[309px] max-w-full">
          <FAQs propTop="39px" propLeft="0px" />
          <div className="absolute top-[0px] left-[36px] w-[439px] h-[500px] flex flex-col items-end justify-start py-7 pl-[35px] pr-[43px] box-border max-w-full">
            <div className="w-[654px] h-[654px] absolute !m-[0] top-[-154px] right-[-215px] rounded-[50%] [background:radial-gradient(50%_50%_at_50%_50%,_rgba(31,_85,_255,_0.25),_rgba(31,_85,_255,_0))] z-[2]" />
            <SignUp
              propWidth="unset"
              propTextDecoration="none"
              propFontWeight="700"
              propDisplay="inline-block"
              propMinWidth="62px"
              signUpPosition="relative"
              signUpTop="unset"
              signUpLeft="unset"
              signUpHeight="unset"
              signUpDisplay="flex"
              signUpFlexDirection="row"
              signUpPadding="12px 26px"
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
            <header className="self-stretch flex flex-row items-start justify-start mt-[-44px]">
              <Discord
                propFlex="unset"
                propWidth="180px"
                icbaselineDiscord="/icbaselinediscord.svg"
              />
            </header>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
