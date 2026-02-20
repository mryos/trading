"use client";

import React, { useEffect, useRef, memo } from 'react';

interface TradingViewWidgetProps {
    symbol: string;
    theme: 'light' | 'dark';
}

function TradingViewWidget({ symbol, theme }: TradingViewWidgetProps) {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!container.current) return;

        // Clear previous widget
        container.current.innerHTML = '';

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify({
            "autosize": true,
            "symbol": symbol,
            "interval": "D",
            "timezone": "Asia/Jakarta",
            "theme": theme,
            "style": "1",
            "locale": "en",
            "enable_publishing": false,
            "hide_top_toolbar": true, // Hide top clutter
            "hide_side_toolbar": true, // Hide drawing tools clutter
            "allow_symbol_change": false,
            "save_image": false,
            "calendar": false,
            "hide_volume": false,
            "support_host": "https://www.tradingview.com",
            "container_id": "tradingview_advanced_chart",
            "loading_screen": {
                "backgroundColor": theme === 'dark' ? "#0f172a" : "#ffffff"
            },
            "overrides": {
                "paneProperties.background": theme === 'dark' ? "#0f172a" : "#ffffff",
                "paneProperties.vertGridProperties.color": "transparent", // Clean look
                "paneProperties.horzGridProperties.color": "transparent", // Clean look
                "mainSeriesProperties.candleStyle.upColor": "#22c55e",
                "mainSeriesProperties.candleStyle.downColor": "#ef4444",
                "mainSeriesProperties.candleStyle.borderUpColor": "#22c55e",
                "mainSeriesProperties.candleStyle.borderDownColor": "#ef4444",
                "mainSeriesProperties.candleStyle.wickUpColor": "#22c55e",
                "mainSeriesProperties.candleStyle.wickDownColor": "#ef4444",
            }
        });
        container.current.appendChild(script);
    }, [symbol, theme]);

    return (
        <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
            <div id="tradingview_advanced_chart" style={{ height: "calc(100%)", width: "100%" }} />
        </div>
    );
}

export default memo(TradingViewWidget);
