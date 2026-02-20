"use client";

import React from 'react';
import { TrendingUp, Newspaper, Users, BrainCircuit, Globe, Landmark, MessageSquare, Zap } from 'lucide-react';

interface MarketSentimentProps {
    symbol: string;
    isPro?: boolean;
}

export default function MarketSentiment({ symbol, isPro = false }: MarketSentimentProps) {
    const isIDX = symbol.startsWith('IDX:');
    const score = isIDX ? 78 : 62;
    const sentiment = score > 70 ? 'Strong Bullish' : score > 55 ? 'Bullish' : 'Neutral';
    const color = score > 70 ? '#22c55e' : score > 55 ? '#84cc16' : '#f59e0b';

    const whaleFlow = isIDX ? 82 : 45;
    const socialBuzz = isIDX ? 'High' : 'Moderate';

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--card)',
            borderBottom: '1px solid var(--border)',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
        }}>
            {/* Unified Compact Row */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '10px 16px',
                backgroundColor: 'rgba(255,255,255,0.01)'
            }}>
                {/* Score Section */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '140px', position: 'relative' }}>
                    <BrainCircuit style={{ width: '18px', height: '18px', color: 'var(--accent)' }} />
                    <div style={{ filter: isPro ? 'none' : 'blur(4px)', transition: 'all 0.3s' }}>
                        <div style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.02em' }}>AI SENTIMENT</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                            <span style={{ fontSize: '16px', fontWeight: 900, color: color }}>{score}</span>
                            <span style={{ fontSize: '10px', fontWeight: 700, opacity: 0.8 }}>{sentiment}</span>
                        </div>
                    </div>
                    {!isPro && (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
                            <span style={{ fontSize: '10px', fontWeight: 900, color: 'var(--accent)', backgroundColor: 'var(--card)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--accent)' }}>UPGRADE TO VIEW</span>
                        </div>
                    )}
                </div>

                {/* Progress Bar - More Slim */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', filter: isPro ? 'none' : 'grayscale(1) opacity(0.3)', transition: 'all 0.3s' }}>
                    <div style={{
                        height: '4px',
                        width: '100%',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        borderRadius: '10px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            height: '100%',
                            width: `${score}%`,
                            background: `linear-gradient(90deg, #ef4444 0%, #f59e0b 50%, #22c55e 100%)`,
                            borderRadius: '10px',
                        }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', fontWeight: 800, color: 'var(--text-muted)', opacity: 0.5 }}>
                        <span>BEARISH</span>
                        <span>BULLISH</span>
                    </div>
                </div>

                {/* Divider */}
                <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border)' }} />

                {/* Compact Stats Grid */}
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
                        <Landmark style={{ width: '12px', height: '12px', color: '#f59e0b' }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '8px', fontWeight: 700, color: 'var(--text-muted)' }}>WHALE</span>
                            {isPro ? (
                                <span style={{ fontSize: '10px', fontWeight: 900 }}>{whaleFlow}%</span>
                            ) : (
                                <span style={{ fontSize: '10px', fontWeight: 900, color: 'var(--accent)', cursor: 'help' }}>PRO</span>
                            )}
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MessageSquare style={{ width: '12px', height: '12px', color: 'var(--accent)' }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '8px', fontWeight: 700, color: 'var(--text-muted)' }}>BUZZ</span>
                            {isPro ? (
                                <span style={{ fontSize: '10px', fontWeight: 900 }}>{socialBuzz}</span>
                            ) : (
                                <span style={{ fontSize: '10px', fontWeight: 900, color: 'var(--accent)', cursor: 'help' }}>PRO</span>
                            )}
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Zap style={{ width: '12px', height: '12px', color: '#84cc16' }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '8px', fontWeight: 700, color: 'var(--text-muted)' }}>ACC.</span>
                            {isPro ? (
                                <span style={{ fontSize: '10px', fontWeight: 900 }}>89%</span>
                            ) : (
                                <span style={{ fontSize: '10px', fontWeight: 900, color: 'var(--accent)', cursor: 'help' }}>PRO</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
