"use client";

import React, { memo } from 'react';
import dynamic from 'next/dynamic';

const MarketOverview = dynamic(
    () => import("react-ts-tradingview-widgets").then((w) => w.MarketOverview),
    { ssr: false }
);

function TopStocks() {
    return (
        <div className="w-full h-full bg-card border-t p-4 overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg text-foreground">Market Overview</h2>
            </div>

            <div className="flex-1 h-full w-full overflow-hidden">
                <MarketOverview
                    colorTheme="dark"
                    height="100%"
                    width="100%"
                    showChart={true}
                    locale="en"
                    largeChartUrl=""
                    isTransparent={true}
                    showSymbolLogo={true}
                    tabs={[
                        {
                            title: "Indices",
                            symbols: [
                                { s: "FOREXCOM:SPXUSD", d: "S&P 500" },
                                { s: "FOREXCOM:NSXUSD", d: "US 100" },
                                { s: "FOREXCOM:DJI", d: "Dow 30" },
                                { s: "INDEX:NKY", d: "Nikkei 225" },
                                { s: "INDEX:DEU40", d: "DAX Index" },
                                { s: "FOREXCOM:UKXGBP", d: "UK 100" }
                            ],
                            originalTitle: "Indices"
                        },
                        {
                            title: "Futures",
                            symbols: [
                                { s: "CME_MINI:ES1!", d: "S&P 500" },
                                { s: "CME:6E1!", d: "Euro" },
                                { s: "COMEX:GC1!", d: "Gold" },
                                { s: "NYMEX:CL1!", d: "Crude Oil" },
                                { s: "NYMEX:NG1!", d: "Natural Gas" },
                                { s: "CBOT:ZC1!", d: "Corn" }
                            ],
                            originalTitle: "Futures"
                        },
                        {
                            title: "Bonds",
                            symbols: [
                                { s: "CME:GE1!", d: "Eurodollar" },
                                { s: "CBOT:ZB1!", d: "T-Bond" },
                                { s: "CBOT:UB1!", d: "Ultra T-Bond" },
                                { s: "EUREX:FGBL1!", d: "Euro Bund" },
                                { s: "EUREX:FBTP1!", d: "Euro BTP" },
                                { s: "EUREX:FGBM1!", d: "Euro BOBL" }
                            ],
                            originalTitle: "Bonds"
                        },
                        {
                            title: "Forex",
                            symbols: [
                                { s: "FX:EURUSD", d: "EUR/USD" },
                                { s: "FX:GBPUSD", d: "GBP/USD" },
                                { s: "FX:USDJPY", d: "USD/JPY" },
                                { s: "FX:USDCHF", d: "USD/CHF" },
                                { s: "FX:AUDUSD", d: "AUD/USD" },
                                { s: "FX:USDCAD", d: "USD/CAD" }
                            ],
                            originalTitle: "Forex"
                        }
                    ]}
                />
            </div>
        </div>
    );
}

export default memo(TopStocks);
