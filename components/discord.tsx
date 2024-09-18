import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type DiscordType = {
  className?: string;
  icbaselineDiscord?: string;

  /** Style props */
  propFlex?: CSSProperties["flex"];
  propWidth?: CSSProperties["width"];
};

const Discord: NextPage<DiscordType> = ({
  className = "",
  propFlex,
  propWidth,
  icbaselineDiscord,
}) => {
  const discordStyle: CSSProperties = useMemo(() => {
    return {
      flex: propFlex,
      width: propWidth,
    };
  }, [propFlex, propWidth]);

  return (
    <div
      className={`flex-1 flex flex-row items-end justify-start py-2 px-[22px] relative gap-3.5 text-center text-base text-white font-sarabun ${className}`}
      style={discordStyle}
    >
      <div className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-31xl-5 bg-mediumslateblue" />
      <img
        className="h-7 w-7 relative overflow-hidden shrink-0 z-[1]"
        loading="lazy"
        alt=""
        src={icbaselineDiscord}
      />
      <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[3px]">
        <a className="[text-decoration:none] self-stretch relative font-bold text-[inherit] z-[1]">
          Join with Discord
        </a>
      </div>
    </div>
  );
};

export default Discord;
