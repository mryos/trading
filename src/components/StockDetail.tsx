"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const SymbolInfo = dynamic(
    () => import("react-ts-tradingview-widgets").then((w) => w.SymbolInfo),
    { ssr: false }
);

const CompanyProfile = dynamic(
    () => import("react-ts-tradingview-widgets").then((w) => w.CompanyProfile),
    { ssr: false }
);

const FundamentalData = dynamic(
    () => import("react-ts-tradingview-widgets").then((w) => w.FundamentalData),
    { ssr: false }
);

const TechnicalAnalysis = dynamic(
    () => import("react-ts-tradingview-widgets").then((w) => w.TechnicalAnalysis),
    { ssr: false }
);

const Timeline = dynamic(
    () => import("react-ts-tradingview-widgets").then((w) => w.Timeline),
    { ssr: false }
);

interface StockDetailProps {
    symbol: string;
    theme: "light" | "dark";
}

export default function StockDetail({ symbol, theme }: StockDetailProps) {
    // Using key={symbol} on each widget container forces React to
    // unmount and remount the widget when the symbol changes.
    // This is necessary because TradingView iframe widgets don't
    // respond to prop changes — they must be recreated.
    return (
        <div className="w-full h-full overflow-y-auto custom-scrollbar bg-background">
            {/* Symbol Info Bar */}
            <div className="w-full border-b" style={{ height: "80px" }} key={`info-${symbol}`}>
                <SymbolInfo
                    symbol={symbol}
                    colorTheme={theme}
                    locale="en"
                    autosize
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-3 gap-0 w-full" style={{ minHeight: "calc(100% - 80px)" }}>
                {/* Left Column: Company Profile + Fundamental Data */}
                <div className="col-span-1 border-r flex flex-col">
                    <div className="border-b" style={{ height: "350px" }} key={`profile-${symbol}`}>
                        <CompanyProfile
                            symbol={symbol}
                            colorTheme={theme}
                            locale="en"
                            height="100%"
                            width="100%"
                        />
                    </div>
                    <div className="flex-1" style={{ minHeight: "350px" }} key={`fundamental-${symbol}`}>
                        <FundamentalData
                            symbol={symbol}
                            colorTheme={theme}
                            locale="en"
                            height="100%"
                            width="100%"
                        />
                    </div>
                </div>

                {/* Center Column: Technical Analysis */}
                <div className="col-span-1 border-r" style={{ minHeight: "700px" }} key={`ta-${symbol}`}>
                    <TechnicalAnalysis
                        symbol={symbol}
                        colorTheme={theme}
                        locale="en"
                        height="100%"
                        width="100%"
                    />
                </div>

                {/* Right Column: Top Stories / News */}
                <div className="col-span-1" style={{ minHeight: "700px" }} key={`news-${symbol}`}>
                    <Timeline
                        colorTheme={theme}
                        feedMode="symbol"
                        symbol={symbol}
                        height="100%"
                        width="100%"
                        locale="en"
                    />
                </div>
            </div>
        </div>
    );
}
