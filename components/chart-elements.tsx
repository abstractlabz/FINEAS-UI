import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type ChartElementsType = {
  className?: string;
  instantAnswersToYourFinancial?: string;

  /** Style props */
  propHeight?: CSSProperties["height"];
  propWidth?: CSSProperties["width"];
  propWidth1?: CSSProperties["width"];
  propGap?: CSSProperties["gap"];
  propWidth2?: CSSProperties["width"];
  propPadding?: CSSProperties["padding"];
  propMinWidth?: CSSProperties["minWidth"];
  propHeight1?: CSSProperties["height"];
  propPadding1?: CSSProperties["padding"];
};

const ChartElements: NextPage<ChartElementsType> = ({
  className = "",
  propHeight,
  propWidth,
  propWidth1,
  propGap,
  propWidth2,
  propPadding,
  instantAnswersToYourFinancial,
  propMinWidth,
  propHeight1,
  propPadding1,
}) => {
  const chartElementsStyle: CSSProperties = useMemo(() => {
    return {
      height: propHeight,
    };
  }, [propHeight]);

  const frameDivStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const descriptionItemsStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth1,
      gap: propGap,
    };
  }, [propWidth1, propGap]);

  const descriptionItemOneStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth2,
      padding: propPadding,
    };
  }, [propWidth2, propPadding]);

  const checkmarkOneStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  const rectangleDivStyle: CSSProperties = useMemo(() => {
    return {
      height: propHeight1,
    };
  }, [propHeight1]);

  const descriptionItemTwoStyle: CSSProperties = useMemo(() => {
    return {
      padding: propPadding1,
    };
  }, [propPadding1]);

  return (
    <div
      className={`self-stretch h-[135px] flex flex-col items-start justify-start gap-[5px] max-w-full text-center text-xl text-white font-quicksand mq1050:h-auto ${className}`}
      style={chartElementsStyle}
    >
      <div className="self-stretch h-[5px] relative border-mediumblue border-t-[5px] border-solid box-border z-[2]" />
      <div
        className="w-full flex flex-row items-start justify-start py-0 px-7 box-border max-w-full"
        style={frameDivStyle}
      >
        <div className="flex-1 flex flex-row items-end justify-between max-w-full gap-5 px-[100px] mq1050:flex-wrap">
          <div
            className="w-[79%] flex flex-row items-start justify-start gap-[30px] max-w-full mq750:flex-wrap"
            style={descriptionItemsStyle}
          >
            <div
              className="w-[307px] flex flex-col items-start justify-start pt-10 px-0 pb-0 box-border"
              style={descriptionItemOneStyle}
            >
              <div className="relative tracking-[0.02em] font-medium z-[1] mq450:text-base">
                {instantAnswersToYourFinancial}
              </div>
            </div>
            <div
              className="flex-1 bg-indigo-200 flex flex-row items-start justify-center pt-[45px] px-5 pb-9 box-border min-w-[231px] max-w-full z-[3]"
              style={checkmarkOneStyle}
            >
              <div
                className="h-[130px] w-[355px] relative bg-indigo-200 hidden max-w-full"
                style={rectangleDivStyle}
              />
              <img
                className="h-[49px] w-full relative overflow-hidden shrink-0 z-[4]"
                alt=""
                src="/materialsymbolscheck.svg"
              />
            </div>
          </div>
          <div
            className="flex flex-col items-start justify-end pt-0 px-0 pb-[35px]"
            style={descriptionItemTwoStyle}
          >
            <img
              className="w-[50px] h-[50px] relative overflow-hidden shrink-0 z-[1]"
              alt=""
              src="/bxx.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartElements;
