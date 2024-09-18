import type { NextPage } from "next";

const Content: NextPage = () => {
  return (
    <section className="w-full flex flex-col items-center bg-mediumblue text-white py-16 px-4">
      <h2 className="text-3xl font-bold mb-6">
        Trust the data, not the drama
      </h2>
      <p className="text-lg max-w-prose text-center">
        Fineas offers instant insights at a fraction of the cost.
      </p>
      <div className="mt-10">
        {/* Include any additional content or components here */}
      </div>
    </section>
  );
};

export default Content;
