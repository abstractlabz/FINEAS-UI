import type { NextPage } from "next";

export type InsightsContainerType = {
  className?: string;
};

const InsightsContainer: NextPage<InsightsContainerType> = ({
  className = "",
}) => {
  return (
    <section
      className={`flex flex-col items-start justify-start pt-0 px-0 pb-[289px] box-border gap-[70px] max-w-full text-left text-29xl text-white font-sarabun mq750:gap-[17px] mq750:pb-[122px] mq750:box-border mq1225:gap-[35px] mq1225:pb-[188px] mq1225:box-border ${className}`}
    >
      <div className="w-[704px] flex flex-row items-start justify-start py-0 pl-0 pr-5 box-border relative max-w-full">
        <img
          className="h-[529px] w-[529px] absolute !m-[0] top-[-127px] right-[-316px] object-cover z-[4]"
          loading="lazy"
          alt=""
          src="/image-2@2x.png"
        />
        <h1 className="m-0 flex-1 relative text-inherit tracking-[0.02em] font-bold font-[inherit] inline-block max-w-full z-[5] mq450:text-10xl mq750:text-19xl">
          <span className="text-transparent !bg-clip-text [background:linear-gradient(-90deg,_#ff5de5,_#7d49ff)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">{`Reliable insights, always. `}</span>
          <span>
            Fineas sources information from verified sites and APIs that rely on
            official company 10- filings from the SEC.
          </span>
        </h1>
      </div>
      <div className="flex flex-row items-start justify-start py-0 pl-1 pr-0 box-border max-w-full font-public-sans">
        <div className="w-[1128px] flex flex-row items-start justify-start gap-[95px] max-w-full mq750:gap-6 mq1225:gap-[47px] mq1225:flex-wrap">
          <div className="flex flex-col items-start justify-start pt-[311px] px-0 pb-0 box-border max-w-full mq750:pt-[202px] mq750:box-border mq750:min-w-full mq1225:flex-1">
            <div className="flex flex-row items-start justify-start relative max-w-full">
              <div className="h-[923px] w-[923px] absolute !m-[0] bottom-[-382px] left-[-486px] rounded-[50%] [background:radial-gradient(50%_50%_at_50%_50%,_rgba(217,_31,_255,_0.15),_rgba(217,_31,_255,_0))] z-[4]" />
              <h1 className="m-0 w-[594px] relative text-inherit tracking-[0.02em] font-bold font-[inherit] inline-block shrink-0 max-w-full z-[5] mq450:text-10xl mq750:text-19xl">
                <span className="text-transparent !bg-clip-text [background:linear-gradient(-90deg,_#ff5de5,_#7d49ff)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">{`We simplify your data for you. `}</span>
                <span>
                  Say goodbye to complex charts and thousands of rows of data.
                </span>
              </h1>
            </div>
          </div>
          <div className="h-[654px] relative rounded-[50%] [background:radial-gradient(50%_50%_at_50%_50%,_rgba(31,_85,_255,_0.25),_rgba(31,_85,_255,_0))] min-w-[654px] shrink-0 max-w-full mq750:min-w-full mq1225:flex-1" />
        </div>
      </div>
    </section>
  );
};

export default InsightsContainer;
