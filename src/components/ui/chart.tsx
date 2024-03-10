"use client"
import React, { useEffect, useRef, memo } from 'react';

function CandleChart() {
  const containerRef = useRef();
  const scriptId = 'tradingview-widget-script'; // A unique ID for the script tag

  useEffect(() => {
    // Check if the script is already appended
    if (document.getElementById(scriptId)) return;

    // Create a new script element
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.type = 'text/javascript';
    script.innerHTML = JSON.stringify({
      "width": "100%",
      "height": "500",
      "symbol": "NASDAQ:AAPL",
      "interval": "1",
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "backgroundColor": "rgba(0, 0, 0, 1)",
      "save_image": false,
      "calendar": false,
      "support_host": "https://www.tradingview.com",
      //edit crosshair
      "withdateranges": true
    });

    // Append the script to the container
    containerRef.current.appendChild(script);

    // Cleanup function: remove the script when the component unmounts
    return () => {
      if (containerRef.current) {
        const scriptElement = document.getElementById(scriptId);
        if (scriptElement) {
          containerRef.current.removeChild(scriptElement);
        }
      }
    };
  }, []); // The empty dependency array ensures this effect runs once on mount

  return (
    <div className="tradingview-widget-container rounded-xl overflow-hidden" ref={containerRef} style={{ height: "100%", width: "100%" }}>
      {/* The container where the TradingView widget will be rendered */}
      <div id="tradingview_c35a6" className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
    </div>
  );
}

export default memo(CandleChart);
