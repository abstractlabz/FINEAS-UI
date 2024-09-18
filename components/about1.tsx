import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/router";

export type About1Type = {
  className?: string;
};

const About1: NextPage<About1Type> = ({ className = "" }) => {
  const router = useRouter();

  const onAboutContainerClick = useCallback(() => {
    router.push("/about");
  }, [router]);

  return (
    <div
      className={`flex flex-row items-start justify-start cursor-pointer z-[4] text-left text-base text-silver font-public-sans ${className}`}
      onClick={onAboutContainerClick}
    >
      <a className="[text-decoration:none] relative font-bold text-[inherit]">
        About
      </a>
    </div>
  );
};

export default About1;
