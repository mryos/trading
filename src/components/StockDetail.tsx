"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { LayoutDashboard, Info } from 'lucide-react';

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

interface StockDetailProps {
    symbol: string;
    theme: "light" | "dark";
}

type TabType = 'profile' | 'financial';

export default function StockDetail({ symbol, theme }: StockDetailProps) {
    const [activeTab, setActiveTab] = useState<TabType>('profile');

    const tabs = [
        { id: 'profile' as TabType, label: 'Company Profile', icon: Info },
        { id: 'financial' as TabType, label: 'Financial Data', icon: LayoutDashboard },
    ];

    return (
        <div className="w-full h-full flex flex-col bg-background overflow-hidden">
            {/* Header: Symbol Info */}
            <div className="w-full border-b shrink-0" style={{ height: "80px" }} key={`info-${symbol}`}>
                <SymbolInfo
                    symbol={symbol}
                    colorTheme={theme}
                    locale="en"
                    autosize
                />
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center px-4 border-b bg-card gap-1 shrink-0">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all relative ${activeTab === tab.id
                            ? 'text-accent border-b-2 border-accent'
                            : 'text-muted hover:text-foreground'
                            }`}
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
                <div className="h-full w-full">
                    {activeTab === 'profile' && (
                        <div className="h-full" key={`profile-${symbol}`}>
                            <CompanyProfile
                                symbol={symbol}
                                colorTheme={theme}
                                locale="en"
                                height="100%"
                                width="100%"
                            />
                        </div>
                    )}

                    {activeTab === 'financial' && (
                        <div className="h-full" key={`financial-${symbol}`}>
                            <FundamentalData
                                symbol={symbol}
                                colorTheme={theme}
                                locale="en"
                                height="100%"
                                width="100%"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
