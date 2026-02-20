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
        <div style={{ height: "100%", width: "100%", position: 'relative' }}>
            <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
                <div id="tradingview_advanced_chart" style={{ height: "100%", width: "100%" }} />
            </div>

            {/* Floating Action Buttons over Chart (Shifted Right for OHLC Visibility) */}
            <div style={{
                position: 'absolute',
                top: '12px',
                left: '65%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                zIndex: 10,
                padding: '4px',
                borderRadius: '8px',
                backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(4px)',
                border: '1px solid var(--border)'
            }}>
                {/* Sell Button */}
                <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-broker-selector'))}
                    style={{
                        padding: '6px 16px',
                        backgroundColor: 'transparent',
                        border: '1.5px solid #ef4444',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 900,
                        color: '#ef4444'
                    }}
                >
                    SELL
                </button>

                {/* Buy Button */}
                <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-broker-selector'))}
                    style={{
                        padding: '6px 16px',
                        backgroundColor: 'transparent',
                        border: '1.5px solid #3b82f6',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 900,
                        color: '#3b82f6'
                    }}
                >
                    BUY
                </button>
            </div>
        </div>
    );
}

export default memo(TradingViewWidget);
