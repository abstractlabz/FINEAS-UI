import { CornerRightDown } from "lucide-react";
import { useEffect, useState } from "react";

type OutputProps = {
    input: string;
    output: string[];
}
const AnimatedText = ({ text, delay = 30 }) => {
    const [displayedText, setDisplayedText] = useState('');
  
    useEffect(() => {
      let index = 0;
      const intervalId = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(displayedText => displayedText + text.charAt(index));
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, delay);
  
      return () => clearInterval(intervalId);
    }, [text, delay]);
  
    return <span>{displayedText}</span>;
  };

  const ChatGPTOutputComponent = ({ input, output }: OutputProps) => {
    // Concatenate all elements of the output array into a single string
    const outputText = output.join(" "); // You can adjust the separator if needed

    return (
        <>
            <div className="flex items-center justify-between px-6 py-2 border-b border-t">
                <p>{input}</p>
                <CornerRightDown className="w-6 h-6 text-gray-500" />
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 overflow-y-scroll lg:grid-cols-2">
                <AnimatedText text={outputText} />
            </div>
        </>
    );
};

export default ChatGPTOutputComponent;


