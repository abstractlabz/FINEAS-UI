import React, { useEffect, useState, useRef } from 'react';

interface TypewriterEffectProps {
  text: string;  // Using plain text that will be converted to HTML
  speed: number; // Speed in milliseconds
  animate: boolean; // New prop to control animation
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text, speed, animate }) => {
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
    // Remove all hashtags
    const textWithoutHashtags = inputText.replace(/#/g, '');

    // Color words "bullish," "bearish," and "neutral"
    const coloredText = textWithoutHashtags
      .replace(/\bbullish\b/g, '<span style="color: #64f8ad;">bullish</span>')
      .replace(/\bbearish\b/g, '<span style="color: #ff5757;">bearish</span>')
      .replace(/\bneutral\b/g, '<span style="color: #ccd188;">neutral</span>')
      .replace(/\bBullish\b/g, '<span style="color: #64f8ad;">Bullish</span>')
      .replace(/\bBearish\b/g, '<span style="color: #ff5757;">Bearish</span>')
      .replace(/\bNeutral\b/g, '<span style="color: #ccd188;">Neutral</span>');

    const boldText = coloredText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    const lines = convertLinksToHyperlinks(boldText).split('\n');
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
    const htmlText = formatTextToHTML(text);

    if (!animate) {
      // If not animating, set the full text immediately
      if (spanRef.current) {
        spanRef.current.innerHTML = htmlText;
      }
      return;
    }

    if (index > htmlText.length) return;

    const timer = setTimeout(() => {
      setIndex(prevIndex => prevIndex + 1);
    }, speed);

    if (spanRef.current) {
      spanRef.current.innerHTML = htmlText.slice(0, index);
    }

    return () => clearTimeout(timer);
  }, [index, text, speed, animate]);

  return <span ref={spanRef} style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}></span>;
};

export default TypewriterEffect;
