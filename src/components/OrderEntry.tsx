"use client";

import React, { useState } from 'react';
import { ShoppingBag, Tag, Info, AlertTriangle, ArrowRight, BookOpen, Clock, BrainCircuit } from 'lucide-react';

interface OrderEntryProps {
    symbol: string;
    theme: 'light' | 'dark';
}

export default function OrderEntry({ symbol, theme }: OrderEntryProps) {
    const [side, setSide] = useState<'buy' | 'sell'>('buy');
    const [orderType, setOrderType] = useState('limit');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(7225); // Mock price for BBCA
    const [showJournal, setShowJournal] = useState(false);

    const isIDX = symbol.startsWith('IDX:');
    const totalAmount = quantity * price * (isIDX ? 100 : 1);

    const handlePlaceOrder = () => {
        setShowJournal(true);
        // In a real app, this would trigger the actual order and save the journal entry
    };

    return (
        <div style={{
            padding: '20px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            backgroundColor: 'var(--card)',
            color: 'var(--foreground)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Order Form Content */}
            {!showJournal ? (
                <>
                    {/* Side Selector */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '8px',
                        padding: '4px',
                        backgroundColor: 'var(--surface)',
                        borderRadius: '12px',
                        border: '1px solid var(--border)'
                    }}>
                        <button
                            onClick={() => setSide('buy')}
                            style={{
                                padding: '10px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: side === 'buy' ? '#22c55e' : 'transparent',
                                color: side === 'buy' ? 'white' : 'var(--text-muted)',
                                fontSize: '13px',
                                fontWeight: 800,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}
                        >
                            <ShoppingBag style={{ width: '16px', height: '16px' }} /> BUY
                        </button>
                        <button
                            onClick={() => setSide('sell')}
                            style={{
                                padding: '10px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: side === 'sell' ? '#ef4444' : 'transparent',
                                color: side === 'sell' ? 'white' : 'var(--text-muted)',
                                fontSize: '13px',
                                fontWeight: 800,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}
                        >
                            <Tag style={{ width: '16px', height: '16px' }} /> SELL
                        </button>
                    </div>

                    {/* Form Inputs */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '12px', fontWeight: 700, opacity: 0.6 }}>Order Type</span>
                                <Info style={{ width: '12px', height: '12px', opacity: 0.4 }} />
                            </div>
                            <select
                                value={orderType}
                                onChange={(e) => setOrderType(e.target.value)}
                                style={{
                                    padding: '12px',
                                    borderRadius: '10px',
                                    backgroundColor: 'var(--background)',
                                    border: '1px solid var(--border)',
                                    color: 'var(--foreground)',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    outline: 'none'
                                }}
                            >
                                <option value="limit">Limit Order</option>
                                <option value="market">Market Order</option>
                            </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 700, opacity: 0.6 }}>Price (IDR)</span>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    disabled={orderType === 'market'}
                                    style={{
                                        padding: '12px',
                                        borderRadius: '10px',
                                        backgroundColor: orderType === 'market' ? 'var(--surface)' : 'var(--background)',
                                        border: '1px solid var(--border)',
                                        color: 'var(--foreground)',
                                        fontSize: '13px',
                                        fontWeight: 800,
                                        outline: 'none'
                                    }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 700, opacity: 0.6 }}>{isIDX ? 'Quantity (Lot)' : 'Quantity'}</span>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    style={{
                                        padding: '12px',
                                        borderRadius: '10px',
                                        backgroundColor: 'var(--background)',
                                        border: '1px solid var(--border)',
                                        color: 'var(--foreground)',
                                        fontSize: '13px',
                                        fontWeight: 800,
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div style={{
                        marginTop: 'auto',
                        padding: '16px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(var(--accent-rgb), 0.05)',
                        border: '1px dashed var(--border)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estimated Total</span>
                            <span style={{ fontSize: '14px', fontWeight: 800 }}>IDR {totalAmount.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <AlertTriangle style={{ width: '12px', height: '12px', color: '#f59e0b' }} />
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>IDX market orders execute at next best price.</span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={handlePlaceOrder}
                        style={{
                            padding: '16px',
                            borderRadius: '12px',
                            backgroundColor: side === 'buy' ? '#22c55e' : '#ef4444',
                            color: 'white',
                            border: 'none',
                            fontSize: '15px',
                            fontWeight: 900,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            boxShadow: `0 4px 15px ${side === 'buy' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                            transition: 'transform 0.1s'
                        }}
                        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                        onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        {side === 'buy' ? 'PLACE BUY ORDER' : 'PLACE SELL ORDER'}
                        <ArrowRight style={{ width: '18px', height: '18px' }} />
                    </button>
                </>
            ) : (
                /* AI TRADE JOURNAL VIEW (Micro-SaaS Idea #1) */
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    animation: 'slideIn 0.3s ease-out'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <div style={{ padding: '8px', backgroundColor: 'rgba(var(--accent-rgb), 0.1)', borderRadius: '10px' }}>
                            <BookOpen style={{ width: '18px', height: '18px', color: 'var(--accent)' }} />
                        </div>
                        <h3 style={{ fontSize: '16px', fontWeight: 900 }}>AI Trade Journal</h3>
                    </div>

                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        overflowY: 'auto'
                    }}>
                        <div style={{
                            padding: '16px',
                            backgroundColor: 'var(--surface)',
                            borderRadius: '16px',
                            border: '1px solid var(--border)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '12px', fontWeight: 800, color: side === 'buy' ? '#22c55e' : '#ef4444' }}>
                                    {side.toUpperCase()} ORDER PLACED
                                </span>
                                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>JUST NOW</span>
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: 800 }}>{quantity} {isIDX ? 'Lot' : 'Units'} {symbol.split(':')[1]} @ {price.toLocaleString()}</div>
                        </div>

                        {/* AI Analysis Block */}
                        <div style={{
                            padding: '16px',
                            backgroundColor: 'rgba(var(--accent-rgb), 0.05)',
                            borderRadius: '16px',
                            border: '1px solid rgba(var(--accent-rgb), 0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)' }}>
                                <BrainCircuit style={{ width: '16px', height: '16px' }} />
                                <span style={{ fontSize: '11px', fontWeight: 800 }}>AI PSYCHOLOGY COACH</span>
                            </div>
                            <p style={{ fontSize: '12px', lineHeight: '1.6', color: 'var(--foreground)', opacity: 0.9 }}>
                                "Anda baru saja melakukan {side} pada {symbol}. Analisis saya menunjukkan Anda mengikuti sinyal Alpha #2 dengan 88% confidence. Secara psikologis, Anda sedang dalam tren 'Fear of Missing Out' karena volume spike baru saja terjadi. Disiplinlah pada Stop Loss di level {price - 200}."
                            </p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '10px', marginTop: 'auto', padding: '10px' }}>
                            <Clock style={{ width: '12px', height: '12px' }} />
                            Entry recorded to your Monthly Growth Journal.
                        </div>
                    </div>

                    <button
                        onClick={() => setShowJournal(false)}
                        style={{
                            marginTop: '20px',
                            padding: '14px',
                            borderRadius: '12px',
                            backgroundColor: 'var(--background)',
                            color: 'var(--foreground)',
                            border: '1px solid var(--border)',
                            fontSize: '13px',
                            fontWeight: 800,
                            cursor: 'pointer'
                        }}
                    >
                        New Order
                    </button>
                </div>
            )}

            <style jsx>{`
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </div>
    );
}
