import type { NextPage } from "next";

export type GroupComponent1Type = {
  className?: string;
};

const GroupComponent1: NextPage<GroupComponent1Type> = ({ className = "" }) => {
  return (
    <div
      className={`w-full mx-auto mt-8 px-2 ${className} max-w-full md:max-w-screen-md`}
    >
      {/* First Row */}
      <div className="flex w-full gap-1 mb-1">
        {/* Empty Cell */}
        <div className="flex-1 min-w-0"></div>

        {/* Fineas Logo */}
        <div className="flex-1 min-w-0 flex items-center justify-center bg-indigo-200">
          <img
            src="/loogggg-1@2x.png"
            alt="Fineas Logo"
            className="mb-8 m-8 h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 drop-shadow-[0_0_5px_white]"
            loading="lazy"
          />
        </div>

        {/* Traditional Financial Analyst */}
        <div className="flex-1 min-w-0 flex items-center justify-center bg-darkblue">
          <h3 className="text-sm xs:text-sm sm:text-xl md:text-2xl font-bold text-white text-center px-2">
            Traditional Financial Analyst
          </h3>
        </div>
      </div>

      {/* Second Row */}
      <div className="flex w-full gap-1 mb-1">
        {/* Text Content */}
        <div className="flex-1 min-w-0 flex items-center justify-center bg-blueviolet p-2 sm:p-4 md:p-6">
          <div className="text-center text-sm sm:text-base md:text-lg font-medium text-white">
            Inexpensive startup and management fees
          </div>
        </div>

        {/* Check Logo */}
        <div className="flex-1 min-w-0 flex items-center justify-center bg-indigo-200 p-2 sm:p-4 md:p-6">
          <img
            src="/materialsymbolscheck.svg"
            alt="Check"
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
            loading="lazy"
          />
        </div>

        {/* X Logo */}
        <div className="flex-1 min-w-0 flex items-center justify-center bg-darkblue p-2 sm:p-4 md:p-6">
          <img
            src="/bxx.svg"
            alt="X"
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
            loading="lazy"
          />
        </div>
      </div>

      {/* Third Row */}
      <div className="flex w-full gap-1 mb-1">
        {/* Text Content */}
        <div className="flex-1 min-w-0 flex items-center justify-center bg-blueviolet p-2 sm:p-4 md:p-6">
          <div className="text-center text-sm sm:text-base md:text-lg font-medium text-white">
            Accurate data accessible 24/7
          </div>
        </div>

        {/* Check Logo */}
        <div className="flex-1 min-w-0 flex items-center justify-center bg-indigo-200 p-2 sm:p-4 md:p-6">
          <img
            src="/materialsymbolscheck.svg"
            alt="Check"
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
            loading="lazy"
          />
        </div>

        {/* X Logo */}
        <div className="flex-1 min-w-0 flex items-center justify-center bg-darkblue p-2 sm:p-4 md:p-6">
          <img
            src="/bxx.svg"
            alt="X"
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
            loading="lazy"
          />
        </div>
      </div>

      {/* Fourth Row */}
      <div className="flex w-full gap-1 mb-1">
        {/* Text Content */}
        <div className="flex-1 min-w-0 flex items-center justify-center bg-blueviolet p-2 sm:p-4 md:p-6">
          <div className="text-center text-sm sm:text-base md:text-lg font-medium text-white">
            Instant answers to your financial questions
          </div>
        </div>

        {/* Check Logo */}
        <div className="flex-1 min-w-0 flex items-center justify-center bg-indigo-200 p-2 sm:p-4 md:p-6">
          <img
            src="/materialsymbolscheck.svg"
            alt="Check"
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
            loading="lazy"
          />
        </div>

        {/* X Logo */}
        <div className="flex-1 min-w-0 flex items-center justify-center bg-darkblue p-2 sm:p-4 md:p-6">
          <img
            src="/bxx.svg"
            alt="X"
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
            loading="lazy"
          />
        </div>
      </div>

      {/* Fifth Row */}
      <div className="flex w-full gap-1 mb-4">
        {/* Text Content */}
        <div className="flex-1 min-w-0 flex items-center justify-center bg-blueviolet p-2 sm:p-4 md:p-6">
          <div className="text-center text-sm sm:text-base md:text-lg font-medium text-white">
            Defining characteristic here
          </div>
        </div>

        {/* Check Logo */}
        <div className="flex-1 min-w-0 flex items-center justify-center bg-indigo-200 p-2 sm:p-4 md:p-6">
          <img
            src="/materialsymbolscheck.svg"
            alt="Check"
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
            loading="lazy"
          />
        </div>

        {/* X Logo */}
        <div className="flex-1 min-w-0 flex items-center justify-center bg-darkblue p-2 sm:p-4 md:p-6">
          <img
            src="/bxx.svg"
            alt="X"
            className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default GroupComponent1;
