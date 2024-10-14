import { FC, InputHTMLAttributes } from "react";

// Define the props type
interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {}

const Search: FC<TextFieldProps> = ({ ...props }) => {
  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-[50%]">
      {/* Input Field */}
      <input
        {...props}
        type="text"
        placeholder="Type your question here..."
        className="w-full py-3 pl-5 pr-12 text-white bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-full placeholder-gray-300"
      />
      {/* Rocket emoji */}
      <div className="absolute inset-y-0 right-3 flex items-center">
        <span className="text-xl">🚀</span>
      </div>
    </div>
  );
};

export default Search;