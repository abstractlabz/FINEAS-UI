import type { NextPage } from "next";

export type PortfolioDescriptionType = {
  className?: string;
};

const PortfolioDescription: NextPage<PortfolioDescriptionType> = ({
  className = "",
}) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-center pt-0 pb-[221px] pl-5 pr-6 box-border max-w-full text-left text-29xl text-white font-sarabun mq750:pb-36 mq750:box-border ${className}`}
    >
      <div className="w-[980px] flex flex-row items-start justify-start [row-gap:20px] max-w-full mq1050:flex-wrap">
        <div className="flex-1 flex flex-row items-start justify-start relative max-w-full mq750:min-w-full">
          <div className="h-[923px] w-[923px] absolute !m-[0] bottom-[-393px] left-[-482px] rounded-[50%] [background:radial-gradient(50%_50%_at_50%_50%,_rgba(217,_31,_255,_0.15),_rgba(217,_31,_255,_0))]" />
          <h1 className="m-0 flex-1 relative text-inherit tracking-[0.02em] font-bold font-[inherit] inline-block shrink-0 max-w-full z-[3] mq450:text-10xl mq750:text-19xl">
            <span className="text-transparent !bg-clip-text [background:linear-gradient(-90deg,_#ff5de5,_#7d49ff)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">{`A portfolio crafted to suit your unique interests. `}</span>
            <span>
              Fineas integrates your finance apps with analyst insights for
              tailored support.
            </span>
          </h1>
        </div>
        <div className="flex flex-col items-start justify-start pt-6 px-0 pb-0 box-border max-w-full ml-[-15px] mq750:min-w-full mq750:ml-0 mq1050:flex-1">
          <div className="self-stretch flex flex-row items-start justify-start relative max-w-full">
            <div className="h-[654px] w-[654px] absolute !m-[0] top-[-232px] right-[-367px] rounded-[50%] [background:radial-gradient(50%_50%_at_50%_50%,_rgba(31,_85,_255,_0.25),_rgba(31,_85,_255,_0))]" />
            <img
              className="h-[482px] flex-1 relative max-w-full overflow-hidden object-cover shrink-0 z-[2]"
              loading="lazy"
              alt=""
              src="/group-43@2x.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioDescription;
