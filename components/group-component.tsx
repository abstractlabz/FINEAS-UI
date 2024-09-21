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
    </div>
  );
};

export default GroupComponent;
