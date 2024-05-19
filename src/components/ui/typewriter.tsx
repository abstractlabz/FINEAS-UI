import React, { useEffect, useState, useRef } from 'react';

interface TypewriterEffectProps {
  text: string;  // Using plain text that will be converted to HTML
  speed: number; // Speed in milliseconds
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text, speed }) => {
  const [index, setIndex] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);

  // Function to convert https links in parentheses to clickable hyperlinks
  const convertLinksToHyperlinks = (inputText: string) => {
    const linkRegex = /\((https:\/\/[^\s)]+)\)/g;
    return inputText.replace(linkRegex, (match, p1) => {
      return `<a href="${p1}" target="_blank" style="color: #0000EE;">${p1}</a>`;
    });
  };

  // Function to format text with special rules
  const formatTextToHTML = (inputText: string) => {
    const boldText = inputText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    const headerText = boldText.replace(/###(.*?)(?=\n|$)/g, '<h1>$1</h1>');
    const lines = convertLinksToHyperlinks(headerText).split('\n');
    let inList = false;
    let htmlText = "";

    lines.forEach(line => {
      if (line.trim().startsWith('-')) {
        if (!inList) {
          htmlText += "<ul>";
          inList = true;
        }
        // Remove the dash and trim the start of the line
        htmlText += `<li>${line.trim().substring(1).trim()}</li>`;
      } else {
        if (inList) {
          htmlText += "</ul>";
          inList = false;
        }
        htmlText += `<p>${line}</p>`;
      }
    });

    if (inList) {
      htmlText += "</ul>"; // Close the list if the text ends in list items
    }

    return htmlText;
  };

  useEffect(() => {
    const htmlText = formatTextToHTML(text); // Format the text first

    if (index > htmlText.length) return;

    const timer = setTimeout(() => {
      setIndex(prevIndex => prevIndex + 1);
    }, speed);

    // Update innerHTML up to the current index
    if (spanRef.current) {
      spanRef.current.innerHTML = htmlText.slice(0, index);
    }

    return () => clearTimeout(timer);
  }, [index, text, speed]);

  return <span ref={spanRef}></span>;
};

export default TypewriterEffect;
