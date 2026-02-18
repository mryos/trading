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
    // Auto-prefix IDX: if user types just the stock code (e.g. "BBCA" -> "IDX:BBCA")
    const trimmed = query.trim().toUpperCase();
    if (trimmed.includes(':')) {
      setSymbol(trimmed);
    } else {
      setSymbol(`IDX:${trimmed}`);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
      <Sidebar />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Ticker Tape */}
        <div className="shrink-0 z-50 shadow-sm">
          <TopStocks theme={theme} />
        </div>

        {/* Header */}
        <Header onSearch={handleSearch} theme={theme} toggleTheme={toggleTheme} />

        <main className="flex flex-1 w-full bg-background overflow-hidden p-2 gap-2">
          {/* Main Content Area */}
          <div className="flex flex-col h-full overflow-hidden" style={{ width: "75%" }}>
            {/* Chart Container */}
            <div className="w-full bg-card rounded-2xl border overflow-hidden shadow-sm" style={{ height: "60%" }}>
              <TradingViewWidget symbol={symbol} theme={theme} />
            </div>
            {/* Bottom Widgets Gap */}
            <div className="h-2"></div>
            {/* Stock Detail Widget */}
            <div className="flex-1 w-full bg-card rounded-2xl border overflow-hidden shadow-sm">
              <StockDetail key={symbol} symbol={symbol} theme={theme} />
            </div>
          </div>

          {/* AI Assistant Area */}
          <div className="h-full bg-card rounded-2xl border overflow-hidden shadow-sm" style={{ width: "25%", minWidth: "320px" }}>
            <AIAssistant />
          </div>
        </main>
      </div>
    </div>
  );
}
