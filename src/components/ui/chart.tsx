"use client"
import React, { useEffect, useRef, memo } from 'react';

interface CandleChartProps {
  ticker: string;
}

const CandleChart: React.FC<CandleChartProps> = ({ ticker }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptId = 'tradingview-widget-script';

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
      "height": "500",
      "symbol": ticker, // Use the ticker prop
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
      "withdateranges": true
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
