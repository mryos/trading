"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import TradingViewWidget from '@/components/TradingViewWidget';
import TopStocks from '@/components/TopStocks';
import StockDetail from '@/components/StockDetail';
import AIAssistant from '@/components/AIAssistant';
import AlphaSignals from '@/components/AlphaSignals';
import MarketSentiment from '@/components/MarketSentiment';
import AIPulse from '@/components/AIPulse';
import PricingModal from '@/components/PricingModal';

export default function Home() {
  const [symbol, setSymbol] = useState("IDX:BBCA");
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isPro, setIsPro] = useState(false); // Presentation dummy state

  const handleSearch = (query: string) => {
    // ... search logic ...
    const trimmed = query.trim().toUpperCase();
    if (trimmed.includes(':')) { setSymbol(trimmed); return; }
    const cryptoCommon = ['BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'DOGE', 'ADA', 'TRX'];
    const usStocksCommon = ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'AMZN', 'GOOG', 'META'];
    if (cryptoCommon.includes(trimmed)) { setSymbol(`BINANCE:${trimmed}USDT`); return; }
    if (usStocksCommon.includes(trimmed)) { setSymbol(`NASDAQ:${trimmed}`); return; }
    if (/^[A-Z]{4}$/.test(trimmed)) { setSymbol(`IDX:${trimmed}`); return; }
    if (trimmed.length > 0) { setSymbol(`IDX:${trimmed}`); }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', backgroundColor: 'var(--background)', color: 'var(--foreground)', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>

      {/* LEFT SIDEBAR: Alpha Signals */}
      <div style={{
        width: '230px', // Reduced from 260px
        height: '100%',
        backgroundColor: 'var(--card)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        overflow: 'hidden',
        zIndex: 10
      }}>
        <AlphaSignals onUpgradeClick={() => setIsPricingOpen(true)} isPro={isPro} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%', overflow: 'hidden' }}>
        {/* Ticker Tape */}
        <div style={{ flexShrink: 0, zIndex: 50 }}>
          <TopStocks theme={theme} />
        </div>

        {/* Header */}
        <Header
          onSearch={handleSearch}
          theme={theme}
          toggleTheme={toggleTheme}
          isPro={isPro}
          onTogglePro={() => setIsPro(!isPro)}
        />
        <AIPulse />

        {/* Main Content Area */}
        <main style={{
          display: 'flex',
          flex: 1,
          width: '100%',
          backgroundColor: 'var(--background)',
          overflow: 'hidden',
          padding: '8px',
          gap: '8px'
        }}>

          {/* CENTER PANEL */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden',
            flex: 1,
            gap: '8px'
          }}>
            <div style={{
              width: '100%',
              backgroundColor: 'var(--card)',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              overflow: 'hidden',
              height: '55%', // Perfect balance for a 1080p screen
              display: 'flex',
              flexDirection: 'column',
              flexShrink: 0,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <MarketSentiment symbol={symbol} isPro={isPro} />
              <div style={{ flex: 1 }}>
                <TradingViewWidget symbol={symbol} theme={theme} />
              </div>
            </div>

            <div style={{
              flex: 1,
              width: '100%',
              backgroundColor: 'var(--card)',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <StockDetail key={symbol} symbol={symbol} theme={theme} isPro={isPro} />
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{
            height: '100%',
            backgroundColor: 'var(--card)',
            borderRadius: '16px',
            border: '1px solid var(--border)',
            overflow: 'hidden',
            width: '280px', // Reduced from 360px
            minWidth: '260px',
            flexShrink: 0,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <AIAssistant isPro={isPro} />
          </div>
        </main>
      </div>

      {/* RENDER MODAL AT ROOT LEVEL TO AVOID CLIPPING */}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />
    </div>
  );
}
