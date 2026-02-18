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
        { proName: "IDX:BBCA", title: "BCA" },
        { proName: "IDX:BBRI", title: "BRI" },
        { proName: "IDX:BMRI", title: "Mandiri" },
        { proName: "IDX:TLKM", title: "Telkom" },
        { proName: "IDX:ASII", title: "Astra" },
        { proName: "IDX:UNVR", title: "Unilever" },
        { proName: "IDX:GOTO", title: "GoTo" },
        { proName: "IDX:BBNI", title: "BNI" },
        { proName: "IDX:ICBP", title: "Indofood CBP" },
        { proName: "IDX:KLBF", title: "Kalbe Farma" },
        { proName: "IDX:HMSP", title: "HM Sampoerna" },
        { proName: "IDX:ANTM", title: "Aneka Tambang" },
        { proName: "IDX:PGAS", title: "PGN" },
        { proName: "IDX:MDKA", title: "Merdeka Copper" },
        { proName: "IDX:ACES", title: "Ace Hardware" },
    ];

    return (
        <div className="w-full overflow-hidden bg-card" style={{ height: "46px" }}>
            <TickerTape
                colorTheme={theme}
                symbols={symbols}
                displayMode="adaptive"
                locale="en"
            />
        </div>
    );
}
