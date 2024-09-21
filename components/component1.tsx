import type { NextPage } from "next";
import GroupComponent from "./group-component";

export type Component1Type = {
  className?: string;
};

const Component1: NextPage<Component1Type> = ({ className = "" }) => {
  return (
    <div
      className={`w-[680px] !m-[0] absolute top-[-703.6px] right-[38.3px] flex flex-row items-start justify-between max-w-full gap-5 z-[0] mq1050:flex-wrap ${className}`}
    >
      <div className="w-[206px] flex flex-col items-start justify-start pt-[395.6px] px-0 pb-0 box-border">
        <GroupComponent propFlex="unset" propAlignSelf="stretch" />
      </div>
    </div>
  );
};

export default Component1;
