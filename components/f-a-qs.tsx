import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type FAQsType = {
  className?: string;

  /** Style props */
  propTop?: CSSProperties["top"];
  propLeft?: CSSProperties["left"];
};

const FAQs: NextPage<FAQsType> = ({ className = "", propTop, propLeft }) => {
  const fAQsStyle: CSSProperties = useMemo(() => {
    return {
      top: propTop,
      left: propLeft,
    };
  }, [propTop, propLeft]);

  return (
    <div
      className={`absolute top-[0px] left-[154px] h-[19px] flex flex-row items-start justify-start py-0 pl-0 pr-1 box-border text-left text-base text-silver font-sarabun ${className}`}
      style={fAQsStyle}
    >
      <a className="[text-decoration:none] relative font-bold text-[inherit] inline-block min-w-[37px]">
        FAQs
      </a>
    </div>
  );
};

export default FAQs;
