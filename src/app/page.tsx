"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import TradingViewWidget from '@/components/TradingViewWidget';
import TopStocks from '@/components/TopStocks';
import StockDetail from '@/components/StockDetail';
import AIAssistant from '@/components/AIAssistant';

export default function Home() {
  const [symbol, setSymbol] = useState("IDX:BBCA");
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const handleSearch = (query: string) => {
    const trimmed = query.trim().toUpperCase();

    if (trimmed.includes(':')) {
      setSymbol(trimmed);
      return;
    }

    const cryptoCommon = ['BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'DOGE', 'ADA', 'TRX'];
    const usStocksCommon = ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'AMZN', 'GOOG', 'META'];

    if (cryptoCommon.includes(trimmed)) {
      setSymbol(`BINANCE:${trimmed}USDT`);
      return;
    }

    if (usStocksCommon.includes(trimmed)) {
      setSymbol(`NASDAQ:${trimmed}`);
      return;
    }

    if (/^[A-Z]{4}$/.test(trimmed)) {
      setSymbol(`IDX:${trimmed}`);
      return;
    }

    if (trimmed.length > 0) {
      setSymbol(`IDX:${trimmed}`);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', backgroundColor: 'var(--background)', color: 'var(--foreground)', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar />

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%', overflow: 'hidden' }}>
        {/* Ticker Tape */}
        <div style={{ flexShrink: 0, zIndex: 50 }}>
          <TopStocks theme={theme} />
        </div>

        {/* Header */}
        <Header onSearch={handleSearch} theme={theme} toggleTheme={toggleTheme} />

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

          {/* Left Column: Chart + Stock Detail */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden',
            flex: 1,
            gap: '8px'
          }}>

            {/* Chart Area - Set to 50% for more balance */}
            <div style={{
              width: '100%',
              backgroundColor: 'var(--card)',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              overflow: 'hidden',
              height: '50%',
              flexShrink: 0,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <TradingViewWidget symbol={symbol} theme={theme} />
            </div>

            {/* Stock Detail Area - Set to 50% for high informativeness */}
            <div style={{
              flex: 1,
              width: '100%',
              backgroundColor: 'var(--card)',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <StockDetail key={symbol} symbol={symbol} theme={theme} />
            </div>
          </div>

          {/* Right Column: AI Assistant */}
          <div style={{
            height: '100%',
            backgroundColor: 'var(--card)',
            borderRadius: '16px',
            border: '1px solid var(--border)',
            overflow: 'hidden',
            width: '380px',
            minWidth: '340px',
            flexShrink: 0,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <AIAssistant />
          </div>
        </main>
      </div>
    </div>
  );
}
