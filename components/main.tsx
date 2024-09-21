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
      <header className="w-full px-4 md:px-6 lg:px-8 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          {/* Logo on the left */}
          <img
            className="w-28 md:w-32 lg:w-40 h-auto"
            loading="lazy"
            alt="Logo"
            src="/white-logo--no-background-1@2x.png"
          />
          {/* Navigation buttons on the right */}
          <nav className="flex items-center space-x-2 md:space-x-4">
            {/* Wrap each navigation item in a div to control alignment */}
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
      <main className="flex flex-col md:flex-row items-center justify-between">
        {/* Left Section */}
        <div className="w-full md:w-[87%] relative">
          <img
            src="/component-1@2x.png"
            alt=""
            className="w-3/4 h-auto mb-8"
            style={{ position: "relative", top: "-25px", right: "-60px" }}
          />
          {/* Overlay Explore App Button */}
          <div className="absolute inset-x-4 md:inset-x-16 inset-y-16 bottom-8 flex items-center">
            <button className="bg-fuchsia text-white px-6 py-3 md:px-12 md:py-6 rounded-lg text-sm md:text-base">
              Explore App
            </button>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full md:w-1/3 mt-4 md:mt-0">
          <img
            src="/fineaschat-2@2x.png"
            alt=""
            className="w-3/4 h-auto"
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
