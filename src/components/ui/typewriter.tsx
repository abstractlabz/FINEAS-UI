import React, { useEffect, useState } from 'react';

interface TypewriterEffectProps {
  text: string;
  speed: number; // Speed in milliseconds
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (text.length === 0) return;

    const timer = setTimeout(() => {
      setDisplayedText((prev) => text.substring(0, prev.length + 1));
    }, speed);

    // Cleanup timeout if the component unmounts or text changes
    return () => clearTimeout(timer);
  }, [displayedText, text, speed]);

  return <span>{displayedText}</span>;
};

export default TypewriterEffect;
