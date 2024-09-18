import type { NextPage } from "next";

export type AboutType = {
  className?: string;
};

const About: NextPage<AboutType> = ({ className = "" }) => {
  return (
    <div
      className={`absolute top-[2px] left-[77px] flex flex-row items-start justify-start text-left text-base text-white font-public-sans ${className}`}
    >
      <a className="[text-decoration:none] relative font-bold text-[inherit]">
        About
      </a>
    </div>
  );
};

export default About;
