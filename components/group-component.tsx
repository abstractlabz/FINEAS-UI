import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type GroupComponentType = {
  className?: string;

  /** Style props */
  propFlex?: CSSProperties["flex"];
  propAlignSelf?: CSSProperties["alignSelf"];
};

const GroupComponent: NextPage<GroupComponentType> = ({
  className = "",
  propFlex,
  propAlignSelf,
}) => {
  const groupDivStyle: CSSProperties = useMemo(() => {
    return {
      flex: propFlex,
      alignSelf: propAlignSelf,
    };
  }, [propFlex, propAlignSelf]);

  return (
    <div
      className={`flex-1 flex flex-row items-start justify-start pt-[18px] pb-[13px] pl-8 pr-[31px] relative text-center text-xl text-white font-sarabun w-[200px] left-[-700px] ${className}`}
      style={groupDivStyle}
    >
      <div className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-31xl-5 bg-mediumblue" />
      <b className="flex-1 relative tracking-[0.02em] z-[1]">Explore app*</b>
    </div>
  );
};

export default GroupComponent;
