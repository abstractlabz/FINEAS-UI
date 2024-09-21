import type { NextPage } from "next";
import Home1 from "./home1";
import About1 from "./about1";
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
      <header className="w-full px-4 md:px-6 lg:px-6 py-4">
        <div className="max-w-screen-lg mx-auto flex flex-wrap items-center justify-between">
          {/* Logo */}
          <img
            className="w-28 md:w-32 lg:w-40 h-auto"
            loading="lazy"
            alt="Logo"
            src="/white-logo--no-background-1@2x.png"
          />
          {/* Navigation */}
          <nav className="flex flex-row flex-wrap items-center space-x-2 md:space-x-4 mt-2 md:mt-0">
            {/* Navigation items */}
            <div>
              <Home1 />
            </div>
            <div>
              <About1 />
            </div>
            <div>
              {/* FAQs link */}
              <a href="#faqs" className="text-white hover:text-gray-300">
                FAQs
              </a>
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
                propMinWidth="80px"
                signUpPosition="relative"
                signUpTop="unset"
                signUpLeft="unset"
                signUpHeight="unset"
                signUpDisplay="flex"
                signUpFlexDirection="row"
                signUpPadding="8px 20px"
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
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex flex-col md:flex-row items-center justify-between">
        {/* Left Section */}
        <div className="w-full md:w-[87%] relative flex items-center justify-center">
          <img
            src="/component-1@2x.png"
            alt=""
            className="w-11/12 h-auto"
          />
          {/* Overlay Explore App Button */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 1 }}
          >
            <button className="bg-fuchsia text-white px-6 py-3 md:px-12 md:py-6 rounded-lg text-sm md:text-base">
              Explore App
            </button>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full md:w-1/3 mt-4 md:mt-0 flex items-center justify-center">
          <img
            src="/fineaschat-2@2x.png"
            alt=""
            className="w-11/12 h-auto"
          />
        </div>
      </main>

      {/* FAQs Section */}
      <section id="faqs" className="w-full px-6 py-8">
        {/* Include your FAQs component here */}
      </section>
    </div>
  );
};

export default Main;
