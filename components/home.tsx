import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/router";

export type HomeType = {
  className?: string;
};

const Home: NextPage<HomeType> = ({ className = "" }) => {
  const router = useRouter();

  const onHomeContainerClick = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div
      className={`absolute top-[2px] left-[0px] w-[47px] flex flex-row items-start justify-start cursor-pointer text-left text-base text-silver font-public-sans ${className}`}
      onClick={onHomeContainerClick}
    >
      <a className="[text-decoration:none] relative font-bold text-[inherit]">
        Home
      </a>
    </div>
  );
};

export default Home;
