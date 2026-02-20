"use client";

import React, { memo } from 'react';
import dynamic from 'next/dynamic';

const AdvancedRealTimeChart = dynamic(
    () => import("react-ts-tradingview-widgets").then((w) => w.AdvancedRealTimeChart),
    { ssr: false }
);

interface TradingViewWidgetProps {
    symbol?: string;
    theme?: "light" | "dark";
    autosize?: boolean;
    locale?: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({
    symbol = "NASDAQ:AAPL",
    theme = "dark",
    autosize = true,
    locale = "en"
}) => {
    return (
        <div style={{ height: '100%', width: '100%' }}>
            <AdvancedRealTimeChart
                key={symbol}
                symbol={symbol}
                theme={theme}
                autosize={autosize}
                // @ts-ignore
                locale={locale}
                interval="D"
                timezone="Etc/UTC"
                style="1"
                toolbar_bg="#f1f3f6"
                enable_publishing={false}
                hide_side_toolbar={false}
                allow_symbol_change={true}
                save_image={false}
                container_id="tradingview_chart"
            />
        </div>
    );
};

export default memo(TradingViewWidget);
