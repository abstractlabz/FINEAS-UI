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
      className={`relative max-w-full text-left text-base text-white font-public-sans ${className}`}
    >
      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 py-4">
        {/* Logo on the left */}
        <img
          className="w-32 h-auto"
          loading="lazy"
          alt="Logo"
          src="/white-logo--no-background-1@2x.png"
        />
        {/* Navigation buttons on the right */}
        <nav className="flex items-center space-x-6">
          {/* Wrap each navigation item in a div to control alignment */}
          <div>
            <Home1 />
          </div>
          <div>
            <About1 />
          </div>
          <div>
            <Discord
              propFlex="unset"
              propWidth="auto"
              icbaselineDiscord="/icbaselinediscord.svg"
            />
          </div>
          <div>
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
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row items-center justify-between">
        {/* Left Section */}
        <div className="w-full md:w-2/3 relative">
          <img
            src="/component-1@2x.png"
            alt=""
            className="w-full h-auto"
          />
          {/* Overlay Explore App Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Replace this button with your existing Explore App button component if needed */}
            {/* Ensure the button has higher z-index if necessary */}
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg">
              Explore App
            </button>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full md:w-1/3 mt-8 md:mt-0">
          <img
            src="/fineaschat-2@2x.png"
            alt=""
            className="w-full h-auto"
          />
        </div>
      </main>

      {/* FAQs Section moved back to main content */}
      <section className="w-full px-6 py-8">
        <FAQs />
      </section>
    </div>
  );
};

export default Main;
