import type { NextPage } from "next";

export type Home1Type = {
  className?: string;
};

const Home1: NextPage<Home1Type> = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex flex-row items-start justify-start z-[4] text-left text-base text-white font-public-sans ${className}`}
    >
      <a className="[text-decoration:none] relative font-bold text-[inherit]">
        Home
      </a>
    </div>
  );
};

export default Home1;
