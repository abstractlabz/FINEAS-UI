"use client"
import React, { useEffect, useRef, memo } from 'react';

interface CandleChartProps {
  ticker: string;
}

function removePrefixSuffix(ticker: string): string {
  // Remove prefix 'x:' if it exists
  let cleanTicker = ticker.replace(/^x:/, "");

  return cleanTicker;
}

const CandleChart: React.FC<CandleChartProps> = ({ ticker }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptId = 'tradingview-widget-script';

  const cleanedTicker = removePrefixSuffix(ticker);

  useEffect(() => {
    // Cleanup previous chart instance if it exists
    const container = containerRef.current;
    if (container) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    }

    // Create a new script element
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.type = 'text/javascript';
    script.innerHTML = JSON.stringify({
      "width": "100%",
      "height": "455",
      "symbol": cleanedTicker, // Use the ticker prop
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "backgroundColor": "rgba(8, 7, 51, 1)",
      "save_image": false,
      "calendar": true,
      "support_host": "https://www.tradingview.com",
      "withdateranges": true,
      "hide_side_toolbar": true,
      "hide_bottom_toolbar": true,
      "barStyleOptions": {
        "barWidth": 2,
        "barType": 1,
        "openVisible": true,
        "closeVisible": true,
        "color": "rgba(255, 255, 255, 1)"
      }
    });

    // Append the script to the container
    if (container) {
      container.appendChild(script);
    }
  }, [ticker]); // Depend on ticker prop to re-render chart when it changes

  return (
    <div className="tradingview-widget-container rounded-xl overflow-hidden" ref={containerRef} style={{ height: "100%", width: "100%" }}>
      {/* The container where the TradingView widget will be rendered */}
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
    </div>
  );
}

export default memo(CandleChart);
