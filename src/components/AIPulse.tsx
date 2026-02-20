"use client";

import React, { useState, useEffect } from 'react';
import { Cpu, Activity, Zap } from 'lucide-react';

const activities = [
    "Gemini 1.5 Pro: Analyzing IDX:BBCA recent news sentiment...",
    "Whale Detector: Large accumulation detected on IDX:GOTO (Rp 1.2T)",
    "Strategy Engine: Drafting Bullish breakout for IDX:TLKM...",
    "News Scanner: Scraping Reddit r/investasi for market buzz...",
    "Sentiment Pulse: Overall market sentiment reached 78 (Strong Bullish)",
    "Broker Summary: Net accumulation detected by RX and CC brokers...",
    "Global Feed: Monitoring NASDAQ futures for opening bell correlation...",
    "AI Analyst: Calculating historical Win-Rate for BBRI Buy Signal (89%)"
];

export default function AIPulse() {
    const [index, setIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % activities.length);
                setIsVisible(true);
            }, 500);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            height: '24px',
            backgroundColor: 'rgba(var(--accent-rgb), 0.05)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            gap: '12px',
            overflow: 'hidden'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent)', flexShrink: 0 }}>
                <Activity style={{ width: '12px', height: '12px', animation: 'pulse 1.5s infinite' }} />
                <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase' }}>AI PULSE</span>
            </div>

            <div style={{
                fontSize: '10px',
                fontWeight: 600,
                color: 'var(--text-muted)',
                transition: 'opacity 0.5s ease-in-out',
                opacity: isVisible ? 1 : 0,
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                {activities[index]}
                <Zap style={{ width: '10px', height: '10px', color: '#f59e0b' }} />
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
