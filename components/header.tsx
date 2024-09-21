import type { NextPage } from "next";
import FAQs from "./f-a-qs";
import About from "./about";
import Home from "./home";
import Discord from "./discord";
import SignUp from "./sign-up";

export type HeaderType = {
  className?: string;
};

const Header: NextPage<HeaderType> = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex flex-row items-start justify-end py-0 pl-[46px] pr-[43px] box-border max-w-full text-center text-53xl text-white font-sarabun mq750:pl-[23px] mq750:pr-[21px] mq750:box-border ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start gap-[132px] max-w-full lg:gap-[66px] mq450:gap-4 mq750:gap-[33px]">
        <header className="self-stretch flex flex-row items-start justify-between max-w-full gap-5 text-center text-base text-white font-sarabun">
          <img
            className="h-11 w-[165px] relative object-cover z-[1]"
            loading="lazy"
            alt=""
            src="/white-logo--no-background-1@2x.png"
          />
          <div className="w-[586px] flex flex-row items-start justify-start gap-7 max-w-full mq750:w-[391px]">
            <nav className="m-0 w-[195px] flex flex-col items-start justify-start pt-[11px] px-0 pb-0 box-border mq750:hidden">
              <nav className="m-0 self-stretch h-[21px] relative text-left text-base text-silver font-public-sans">
                <About />
                <Home />
              </nav>
            </nav>
            <Discord icbaselineDiscord="/icbaselinediscord1.svg" />
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
          </div>
        </header>
        <div className="w-[1173px] flex flex-row items-start justify-start py-0 px-[60px] box-border max-w-full lg:pl-[30px] lg:pr-[30px] lg:box-border">
          <div className="flex-1 flex flex-col items-start justify-start gap-[47px] max-w-full mq750:gap-[23px]">
            <div className="self-stretch flex flex-row items-start justify-start py-0 pl-[134px] pr-[133px] box-border max-w-full mq750:pl-[33px] mq750:pr-[33px] mq750:box-border mq1050:pl-[67px] mq1050:pr-[66px] mq1050:box-border">
              <h1 className="m-0 flex-1 relative text-inherit font-bold font-[inherit] inline-block max-w-full z-[1] mq450:text-24xl mq1050:text-39xl">
                Meet the Fineas Team.
              </h1>
            </div>
            <h3 className="m-0 relative text-5xl tracking-[0.02em] font-bold font-[inherit] text-darkgray z-[1] mq450:text-lgi">
              We are dedicated to making financial knowledge accessible to
              everyone, driven by a passion for empowering individuals through
              informed decision-making. United by a shared mission, we strive to
              break down barriers and bring financial confidence to all.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
