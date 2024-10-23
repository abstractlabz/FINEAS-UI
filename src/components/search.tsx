import { FC, useState, InputHTMLAttributes } from "react";

// Define the props type
interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {}

const Search: FC<TextFieldProps & { onRocketClick: (message: string) => void }> = ({ onRocketClick, ...props }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      onRocketClick(inputValue);  // Pass inputValue when Enter is pressed
      setInputValue('');  // Clear input after sending
    }
  };

  const handleRocketClick = () => {
    if (inputValue.trim() !== '') {
      onRocketClick(inputValue);  // Pass inputValue when Rocket is clicked
      setInputValue('');  // Clear input after sending
    }
  };

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-[90%] md:max-w-[50%]">
      {/* Input Field */}
      <input
        {...props}
        type="text"
        placeholder="Type your question here..."
        className="w-full py-3 pl-5 pr-12 text-white bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-full placeholder-gray-300"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      {/* Rocket emoji */}
      <div className="absolute inset-y-0 right-3 flex items-center" onClick={handleRocketClick}>
        <span className="text-xl cursor-pointer">🚀</span>
      </div>
    </div>
  );
};

export default Search;
