import type { NextPage } from "next";

const InsightsContainer: NextPage = () => {
  return (
    <section className="w-full flex flex-col items-center py-16 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Reliable insights, always.
      </h2>
      <p className="text-lg max-w-prose text-center mb-10">
        Fineas sources information from verified sites and APIs that rely on official company filings from the SEC.
      </p>
      <img
        className="w-full max-w-md object-cover"
        alt="Insights"
        src="/image-2@2x.png"
      />
    </section>
  );
};

export default InsightsContainer;
