"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const Timeline = dynamic(
    () => import("react-ts-tradingview-widgets").then((w) => w.Timeline),
    { ssr: false }
);

interface TopStocksProps {
    symbol?: string;
}

export default function TopStocks({ symbol = "NASDAQ:AAPL" }: TopStocksProps) {
    return (
        <div className="w-full h-full overflow-hidden bg-card">
            <Timeline
                colorTheme="dark"
                feedMode="symbol"
                symbol={symbol}
                height="100%"
                width="100%"
                displayMode="adaptive"
                locale="en"
            />
        </div>
    );
}
