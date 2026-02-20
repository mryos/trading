"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { LayoutDashboard, Info, Newspaper, ExternalLink, Globe2, TrendingUp, Search } from 'lucide-react';

const CompanyProfile = dynamic(
    () => import("react-ts-tradingview-widgets").then((w) => w.CompanyProfile),
    { ssr: false }
);

const FundamentalData = dynamic(
    () => import("react-ts-tradingview-widgets").then((w) => w.FundamentalData),
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

type TabType = 'news' | 'profile' | 'financial';

export default function StockDetail({ symbol, theme }: StockDetailProps) {
    const isCrypto = symbol.includes('BINANCE') || symbol.includes('COINBASE') || symbol.includes('COIN');
    const isForex = symbol.includes('FX') || symbol.includes('OANDA');
    const isStock = !isCrypto && !isForex;
    const isIDX = symbol.startsWith('IDX:');

    const [activeTab, setActiveTab] = useState<TabType>('news');

    const tabs = [
        { id: 'news' as TabType, label: 'Market News', icon: Newspaper, visible: true },
        { id: 'profile' as TabType, label: 'Profile', icon: Info, visible: isStock },
        { id: 'financial' as TabType, label: 'Financials', icon: LayoutDashboard, visible: isStock },
    ];

    // Determine the most informative market feed based on the searched symbol
    const marketType = isCrypto ? "crypto" : isForex ? "forex" : "stock";
    const marketLocale = isIDX ? "id" : "en";

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--card)',
            overflow: 'hidden'
        }}>

            {/* Premium Header Bar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
                gap: '8px',
                backgroundColor: 'var(--card)',
                height: '64px',
                borderBottom: '1px solid var(--border)',
                flexShrink: 0
            }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                    {tabs.filter(t => t.visible).map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '0 18px',
                                height: '38px',
                                fontSize: '13px',
                                fontWeight: 600,
                                border: 'none',
                                borderRadius: '10px',
                                background: activeTab === tab.id ? 'var(--accent)' : 'transparent',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                color: activeTab === tab.id ? 'white' : 'var(--text-muted)',
                            }}
                        >
                            <tab.icon style={{ width: '16px', height: '16px' }} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div style={{ flex: 1 }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 14px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(var(--accent-rgb), 0.1)',
                        border: '1px solid rgba(var(--accent-rgb), 0.2)',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: 'var(--accent)',
                    }}>
                        <Globe2 style={{ width: '14px', height: '14px' }} />
                        {symbol}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="custom-scrollbar" style={{
                flex: 1,
                overflow: 'hidden',
                backgroundColor: 'var(--background)'
            }}>
                <div style={{ height: '100%', width: '100%' }}>

                    {activeTab === 'news' && (
                        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }} key={`news-${symbol}`}>
                            {/* Live News Summary Header */}
                            <div style={{
                                padding: '12px 20px',
                                backgroundColor: 'var(--card)',
                                borderBottom: '1px solid var(--border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444', animation: 'pulse 2s infinite' }} />
                                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--foreground)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Live {marketType.toUpperCase()} FEED: {isIDX ? 'PASAR INDONESIA' : 'GLOBAL MARKET'}
                                    </span>
                                </div>
                                <div style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <TrendingUp style={{ width: '12px', height: '12px' }} /> Terkini untuk {symbol.split(':')[1]}
                                </div>
                            </div>

                            {/* Main News Area - Using Market Feed for guaranteed internal content */}
                            <div style={{ flex: 1, minHeight: 0 }}>
                                <Timeline
                                    colorTheme={theme}
                                    feedMode="market" // Fixed to market for consistent results
                                    market={marketType as any}
                                    width="100%"
                                    height="100%"
                                    locale={marketLocale}
                                    isTransparent
                                    displayMode="regular"
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'profile' && isStock && (
                        <div style={{ height: '100%', width: '100%' }} key={`profile-${symbol}`}>
                            <CompanyProfile
                                symbol={symbol}
                                colorTheme={theme}
                                locale={marketLocale}
                                height="100%"
                                width="100%"
                                isTransparent
                            />
                        </div>
                    )}

                    {activeTab === 'financial' && isStock && (
                        <div style={{ height: '100%', width: '100%' }} key={`financial-${symbol}`}>
                            <FundamentalData
                                symbol={symbol}
                                colorTheme={theme}
                                locale={marketLocale}
                                height="100%"
                                width="100%"
                                isTransparent
                            />
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes pulse {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(0.9); }
                    100% { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
}
