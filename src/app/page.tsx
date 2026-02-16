"use client";

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import TradingViewWidget from '@/components/TradingViewWidget';
import TopStocks from '@/components/TopStocks';
import AIAssistant from '@/components/AIAssistant';

export default function Home() {
  const [symbol, setSymbol] = useState("NASDAQ:AAPL");
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 h-full">
        <Header onSearch={setSymbol} theme={theme} toggleTheme={toggleTheme} />
        <main className="flex flex-1 w-full bg-card overflow-hidden">
          {/* Main Chart Area */}
          <div className="flex flex-col h-full border-r" style={{ width: "75%" }}>
            <div className="w-full border-b" style={{ height: "65%" }}>
              <TradingViewWidget symbol={symbol} theme={theme} />
            </div>
            <div className="flex-1 w-full overflow-hidden">
              <TopStocks />
            </div>
          </div>

          {/* AI Assistant Area */}
          <div className="h-full bg-card" style={{ width: "25%", minWidth: "300px" }}>
            <AIAssistant />
          </div>
        </main>
      </div>
    </div>
  );
}
