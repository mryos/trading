"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const TickerTape = dynamic(
    () => import("react-ts-tradingview-widgets").then((w) => w.TickerTape),
    { ssr: false }
);

interface TopStocksProps {
    theme?: "light" | "dark";
}

export default function TopStocks({ theme = "dark" }: TopStocksProps) {
    const symbols = [
        { proName: "BINANCE:BTCUSDT", title: "BTC/USDT" },
        { proName: "BINANCE:ETHUSDT", title: "ETH/USDT" },
        { proName: "NASDAQ:AAPL", title: "Apple" },
        { proName: "NASDAQ:TSLA", title: "Tesla" },
        { proName: "IDX:BBCA", title: "BBCA" },
        { proName: "IDX:GOTO", title: "GoTo" },
        { proName: "IDX:BBRI", title: "BBRI" },
        { proName: "NASDAQ:NVDA", title: "Nvidia" },
        { proName: "BINANCE:SOLUSDT", title: "Solana" },
        { proName: "FX:EURUSD", title: "EUR/USD" },
    ];

    return (
        <div style={{ width: '100%', overflow: 'hidden', backgroundColor: 'var(--card)', height: '46px' }}>
            <TickerTape
                colorTheme={theme}
                symbols={symbols}
                displayMode="adaptive"
                locale="en"
            />
        </div>
    );
}
