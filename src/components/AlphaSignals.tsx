"use client";

import React, { useState, useEffect } from 'react';
import { TrendingUp, Zap, ChevronRight, AlertCircle, Loader2, Star, Lock } from 'lucide-react';

interface Signal {
    id: string;
    symbol: string;
    signal_type: string;
    price_action: string;
    confidence: number;
    trend: 'up' | 'down' | 'side';
    isLocked?: boolean;
}

interface AlphaSignalsProps {
    onUpgradeClick: () => void;
    isPro?: boolean;
}

export default function AlphaSignals({ onUpgradeClick, isPro = false }: AlphaSignalsProps) {
    const [loading, setLoading] = useState(true);

    const mockSignals: Signal[] = [
        { id: '1', symbol: 'BBCA', signal_type: 'STRONG BUY', price_action: 'Institutional Accumulation', confidence: 94, trend: 'up' },
        { id: '2', symbol: 'TLKM', signal_type: 'ACCUMULATION', price_action: 'Support Rebound', confidence: 88, trend: 'up' },
        { id: '3', symbol: 'BTCUSDT', signal_type: 'POTENTIAL BREAKOUT', price_action: 'Volume Spike detected', confidence: 82, trend: 'up' },
        { id: '4', symbol: 'ASII', signal_type: 'HIDDEN GEM', price_action: 'Calculating...', confidence: 79, trend: 'up', isLocked: true },
        { id: '5', symbol: 'GOTO', signal_type: 'REVERSAL', price_action: 'Calculating...', confidence: 75, trend: 'up', isLocked: true },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{
            backgroundColor: 'var(--card)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {/* Header - More compact for list style */}
            <div style={{
                padding: '16px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(var(--accent-rgb), 0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        backgroundColor: 'var(--accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Zap style={{ width: '14px', height: '14px', color: 'white', fill: 'white' }} />
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.05em' }}>ALPHA DISCOVERY</span>
                </div>
                <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent)' }}>LIVE</div>
            </div>

            {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '40px 0' }}>
                    <Loader2 className="animate-spin" style={{ color: 'var(--accent)', width: '20px', height: '20px' }} />
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Filtering Alpha...</span>
                </div>
            ) : (
                <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {mockSignals.map((signal) => (
                        <div key={signal.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px',
                            backgroundColor: 'var(--surface)',
                            borderRadius: '12px',
                            border: '1px solid var(--border)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                            onClick={() => signal.isLocked && onUpgradeClick()}
                            onMouseEnter={(e) => {
                                if (!signal.isLocked) {
                                    e.currentTarget.style.borderColor = 'var(--accent)';
                                    e.currentTarget.style.backgroundColor = 'rgba(var(--accent-rgb), 0.02)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!signal.isLocked) {
                                    e.currentTarget.style.borderColor = 'var(--border)';
                                    e.currentTarget.style.backgroundColor = 'var(--surface)';
                                }
                            }}
                        >
                            {/* EXTREME BLUR for Locked Signals */}
                            {signal.isLocked && !isPro && (
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    backdropFilter: 'blur(35px)', // Intense blur
                                    backgroundColor: 'rgba(var(--background-rgb), 0.95)', // Nearly opaque
                                    zIndex: 10,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px'
                                }}>
                                    <Lock style={{ width: '12px', height: '12px', color: 'var(--accent)' }} />
                                    <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent)', letterSpacing: '1px' }}>LOCKED</span>
                                </div>
                            )}

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '8px',
                                    backgroundColor: 'var(--background)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid var(--border)'
                                }}>
                                    <span style={{ fontSize: '10px', fontWeight: 900 }}>{signal.symbol.substring(0, 2)}</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <span style={{ fontSize: '13px', fontWeight: 800 }}>{signal.symbol}</span>
                                        {signal.confidence > 90 && <Star style={{ width: '10px', height: '10px', color: '#f59e0b', fill: '#f59e0b' }} />}
                                    </div>
                                    <span style={{ fontSize: '9px', color: 'var(--accent)', fontWeight: 700 }}>{signal.signal_type}</span>
                                </div>
                            </div>

                            <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <span style={{ fontSize: '11px', fontWeight: 800 }}>{signal.confidence}%</span>
                                    <span style={{ fontSize: '8px', color: 'var(--text-muted)' }}>Conf.</span>
                                </div>
                                <ChevronRight style={{ width: '14px', height: '14px', color: 'var(--text-muted)', opacity: 0.3 }} />
                            </div>
                        </div>
                    ))}

                    {!isPro && (
                        <div
                            onClick={onUpgradeClick}
                            style={{
                                marginTop: '8px',
                                padding: '12px',
                                borderRadius: '10px',
                                backgroundColor: 'var(--accent)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            <Lock style={{ width: '14px', height: '14px', color: 'white' }} />
                            <span style={{ fontSize: '11px', fontWeight: 800, color: 'white' }}>Unlock Premium Signals</span>
                        </div>
                    )}

                    <div style={{
                        marginTop: '12px',
                        padding: '10px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(var(--background-rgb), 0.5)',
                        border: '1px solid var(--border)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <AlertCircle style={{ width: '12px', height: '12px', color: 'var(--accent)' }} />
                            <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--text-muted)' }}>Accuracy (30D): 84.2%</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
