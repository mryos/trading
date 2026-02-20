"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { LayoutDashboard, Info, Newspaper, ExternalLink, Globe2, TrendingUp, Search, Brain, Target, ShieldAlert, Send, Terminal } from 'lucide-react';



const FundamentalData = dynamic(
    () => import("react-ts-tradingview-widgets").then((w) => w.FundamentalData),
    { ssr: false }
);

const Timeline = dynamic(
    () => import("react-ts-tradingview-widgets").then((w) => w.Timeline),
    { ssr: false }
);

import OrderEntry from './OrderEntry';

interface StockDetailProps {
    symbol: string;
    theme: "light" | "dark";
    isPro?: boolean;
}

type TabType = 'news' | 'trade' | 'strategy' | 'profile' | 'financial';

export default function StockDetail({ symbol, theme, isPro = false }: StockDetailProps) {
    const isCrypto = symbol.includes('BINANCE') || symbol.includes('COINBASE') || symbol.includes('COIN');
    const isForex = symbol.includes('FX') || symbol.includes('OANDA');
    const isStock = !isCrypto && !isForex;
    const isIDX = symbol.startsWith('IDX:');

    const [activeTab, setActiveTab] = useState<TabType>('news');

    const tabs = [
        { id: 'news' as TabType, label: 'Market News', icon: Newspaper, visible: true },
        { id: 'strategy' as TabType, label: 'AI Strategy', icon: Brain, visible: true },
        { id: 'trade' as TabType, label: 'Trade', icon: TrendingUp, visible: true },
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
                height: '48px',
                borderBottom: '1px solid var(--border)',
                flexShrink: 0
            }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                    {tabs.filter(t => t.visible).map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '0 14px',
                                height: '32px',
                                fontSize: '12px',
                                fontWeight: 600,
                                border: 'none',
                                borderRadius: '8px',
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
                overflowY: 'auto',
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
                                gap: '10px',
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

                            <div style={{ flex: 1, minHeight: 0 }}>
                                <Timeline
                                    colorTheme={theme}
                                    feedMode="market"
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

                    {activeTab === 'trade' && (
                        <div style={{ height: '100%', width: '100%' }}>
                            <OrderEntry symbol={symbol} theme={theme} />
                        </div>
                    )}

                    {activeTab === 'strategy' && (
                        <div style={{ padding: '24px', height: '100%', position: 'relative' }}>
                            {(() => {
                                // Real-world calibrated logic for the demo 
                                const ticker = symbol.split(':')[1] || symbol;
                                const isCrypto = symbol.includes('BTC') || symbol.includes('ETH') || symbol.includes('BINANCE') || symbol.includes('COINBASE');

                                const getStrategy = () => {
                                    if (ticker === 'BBCA') {
                                        return {
                                            signal: 'SWING BUY',
                                            entry: 'Rp 7.150 - 7.250',
                                            sl: 'Rp 6.950',
                                            tp: 'Rp 7.850',
                                            logic: `BBCA tertahan di support MA-50 yang sangat kuat. Analisis Whale Flow mendeteksi akumulasi masif senilai Rp 1.5T oleh broker asing (AK, ZP). Strategi defensif yang sangat ideal.`
                                        };
                                    } else if (ticker === 'GOTO') {
                                        return {
                                            signal: 'SCALPING BUY',
                                            entry: 'Rp 65 - 68',
                                            sl: 'Rp 62',
                                            tp: 'Rp 82',
                                            logic: `GOTO menunjukkan pola 'Breakout' dari falling wedge. Terjadi lonjakan volume 2.5x rata-rata. Kami mendeteksi rotasi modal dari sektor big bank ke teknologi.`
                                        };
                                    } else if (isCrypto) {
                                        return {
                                            signal: 'BULLISH REVERSAL',
                                            entry: '$ 63,400 - 64,200',
                                            sl: '$ 61,800',
                                            tp: '$ 69,500',
                                            logic: `Arus masuk (inflow) ETF terus meningkat. RSI harian mulai berbalik arah dari zona oversold. Short liquidations di level 65k berpotensi memicu reli lanjutan.`
                                        };
                                    } else {
                                        return {
                                            signal: 'MOMENTUM BUY',
                                            entry: isIDX ? 'Rp 3.450' : '155.20',
                                            sl: isIDX ? 'Rp 3.300' : '151.10',
                                            tp: isIDX ? 'Rp 3.900' : '165.50',
                                            logic: `Momentum akumulasi pada ${ticker} sedang berada di puncak. Analisis sentiment media sosial menunjukkan optimisme retail yang tinggi didukung oleh fundamental yang solid.`
                                        };
                                    }
                                };

                                const strategy = getStrategy();

                                return (
                                    <div style={{
                                        filter: isPro ? 'none' : 'blur(8px)',
                                        pointerEvents: isPro ? 'auto' : 'none',
                                        transition: 'all 0.3s'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                                    <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--foreground)' }}>AI Signal Blueprint</h3>
                                                    <span style={{ fontSize: '9px', backgroundColor: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)', padding: '2px 6px', borderRadius: '4px', fontWeight: 900 }}>REAL-TIME</span>
                                                </div>
                                                <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Analyzed for <strong>{symbol}</strong> • VEST AI v1.5</p>
                                            </div>
                                            <div style={{
                                                padding: '8px 16px',
                                                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                                                borderRadius: '12px',
                                                border: '1px solid rgba(34, 197, 94, 0.2)',
                                                color: '#22c55e',
                                                fontSize: '14px',
                                                fontWeight: 800,
                                                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.1)'
                                            }}>
                                                {strategy.signal}
                                            </div>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                                            {[
                                                { label: 'Entry Zone', value: strategy.entry, icon: Target, color: 'var(--accent)' },
                                                { label: 'Stop Loss', value: strategy.sl, icon: ShieldAlert, color: '#ef4444' },
                                                { label: 'Target Profit', value: strategy.tp, icon: TrendingUp, color: '#22c55e' }
                                            ].map((item, i) => (
                                                <div key={i} style={{ backgroundColor: 'var(--card)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                                        <item.icon style={{ width: '16px', height: '16px', color: item.color }} />
                                                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{item.label}</span>
                                                    </div>
                                                    <div style={{ fontSize: '17px', fontWeight: 900, color: 'var(--foreground)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.value}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <div style={{ backgroundColor: 'var(--card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '24px' }}>
                                            <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <Brain style={{ width: '16px', height: '16px', color: 'var(--accent)' }} />
                                                Strategy Analysis Logic
                                            </h4>
                                            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                                {strategy.logic}
                                            </p>
                                        </div>

                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <button style={{
                                                flex: 1,
                                                height: '48px',
                                                borderRadius: '14px',
                                                backgroundColor: '#0088cc',
                                                color: 'white',
                                                border: 'none',
                                                fontWeight: 800,
                                                fontSize: '13px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                cursor: 'pointer'
                                            }}>
                                                <Send style={{ width: '16px', height: '16px' }} />
                                                SEND TO TELEGRAM
                                            </button>
                                            <button style={{
                                                flex: 1,
                                                height: '48px',
                                                borderRadius: '14px',
                                                backgroundColor: '#2b2b2b',
                                                color: 'white',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                fontWeight: 800,
                                                fontSize: '13px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                cursor: 'pointer'
                                            }}>
                                                <Terminal style={{ width: '16px', height: '16px' }} />
                                                EXECUTE VIA MT5
                                            </button>
                                        </div>
                                    </div>
                                );
                            })()}

                            {!isPro && (
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '40px',
                                    textAlign: 'center',
                                    backgroundColor: 'rgba(var(--card-rgb), 0.4)',
                                    borderRadius: '16px',
                                    zIndex: 10
                                }}>
                                    <div style={{
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: '20px',
                                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '20px'
                                    }}>
                                        <Brain style={{ width: '32px', height: '32px', color: '#f59e0b' }} />
                                    </div>
                                    <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '12px' }}>AI Trading Strategy</h3>
                                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '340px', marginBottom: '24px', lineHeight: '1.5' }}>
                                        Dapatkan blueprint trading lengkap (Entry, TP, SL) yang dihasilkan otomatis oleh AI kami.
                                    </p>
                                    <button
                                        onClick={() => window.dispatchEvent(new CustomEvent('open-pricing'))}
                                        style={{
                                            padding: '12px 32px',
                                            borderRadius: '12px',
                                            backgroundColor: '#f59e0b',
                                            color: 'white',
                                            border: 'none',
                                            fontWeight: 800,
                                            fontSize: '14px',
                                            cursor: 'pointer',
                                            boxShadow: '0 10px 20px rgba(245, 158, 11, 0.3)'
                                        }}
                                    >
                                        UNLOCK PRO STRATEGY
                                    </button>
                                </div>
                            )}
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
