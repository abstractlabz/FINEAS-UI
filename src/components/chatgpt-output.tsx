import { CornerRightDown } from "lucide-react";
import { useEffect, useState } from "react";

type OutputProps = {
    input: string;
    output: string[];
}

const AnimatedText = ({ text = "" }) => {
  const [displayedText, setDisplayedText] = useState('');
  const delay = 30; // Delay in milliseconds between each character

  useEffect(() => {
    setDisplayedText(''); // Reset displayed text on text change
    if (text) {
      const words = text.split(' ');
      const firstWord = words.shift(); // Extract the first word
      let index = -1;
      setDisplayedText(firstWord + ' '); // Start with the first word
      const intervalId = setInterval(() => {
        if (index < words.join(' ').length) {
          setDisplayedText(currentText => currentText + words.join(' ').charAt(index));
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, delay);

      return () => clearInterval(intervalId);
    }
  }, [text]);

  return <p>{displayedText}</p>;
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


