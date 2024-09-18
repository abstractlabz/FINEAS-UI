import type { NextPage } from "next";
import Home1 from "./home1";
import About1 from "./about1";
import FAQs from "./f-a-qs";
import SignUp from "./sign-up";
import Discord from "./discord";

const Main: NextPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-start text-white">
      <nav className="w-full flex justify-between items-center p-6">
        <img
          className="h-11 w-40 object-cover"
          alt="Logo"
          src="/white-logo--no-background-1@2x.png"
        />
        <div className="flex space-x-6">
          <Home1 />
          <About1 />
          <FAQs />
          <Discord />
          <SignUp />
        </div>
      </nav>
      <div className="flex flex-col items-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Fineas.ai
        </h1>
        <p className="text-xl max-w-2xl">
          Your AI edge. Play the game, change the rules.
        </p>
      </div>
    </div>
  );
};

export default Main;
