"use client";

import React, { useState } from 'react';
import { X, Search, Star, ExternalLink, HelpCircle, ShieldCheck, Zap } from 'lucide-react';

interface Broker {
    id: string;
    name: string;
    icon: string;
    rating: number;
    color: string;
    isSimulation?: boolean;
    description?: string;
}

const BROKERS: Broker[] = [
    { id: 'paper', name: 'Paper Trading', icon: '💎', rating: 5.0, color: '#0088cc', isSimulation: true, description: 'Simulator broker oleh Vest AI' },
    { id: 'mirae', name: 'Mirae Asset Sekuritas', icon: 'YP', rating: 4.9, color: '#ffcc00', isPartner: true, referralUrl: 'https://mstock.miraeasset.co.id/register?ref=vestai' },
    { id: 'stockbit', name: 'Stockbit Sekuritas', icon: 'XL', rating: 4.8, color: '#00d084', isPartner: true, referralUrl: 'https://stockbit.com/register?ref=vestai' },
    { id: 'mandiri', name: 'Mandiri Sekuritas', icon: 'CC', rating: 4.7, color: '#ffb11b' },
    { id: 'ajaib', name: 'Ajaib Sekuritas', icon: 'XC', rating: 4.6, color: '#27ae60', isPartner: true, referralUrl: 'https://ajaib.co.id/register?ref=vestai' },
    { id: 'indopremier', name: 'Indo Premier (IPOT)', icon: 'PD', rating: 4.7, color: '#2980b9' },
    { id: 'ubs', name: 'UBS Sekuritas', icon: 'AK', rating: 4.9, color: '#000000' },
    { id: 'kbvalbury', name: 'KB Valbury Sekuritas', icon: 'CP', rating: 4.5, color: '#e67e22' },
    { id: 'maybank', name: 'Maybank Sekuritas', icon: 'ZP', rating: 4.6, color: '#f1c40f' },
    { id: 'semesta', name: 'Semesta Indovest', icon: 'MG', rating: 4.4, color: '#9b59b6' },
    { id: 'bnis', name: 'BNI Sekuritas', icon: 'NI', rating: 4.5, color: '#e67e22' },
];

interface Broker {
    id: string;
    name: string;
    icon: string;
    rating: number;
    color: string;
    isSimulation?: boolean;
    description?: string;
    isPartner?: boolean;
    referralUrl?: string;
}

interface BrokerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BrokerModal({ isOpen, onClose }: BrokerModalProps) {
    const [search, setSearch] = useState('');

    if (!isOpen) return null;

    const filteredBrokers = BROKERS.filter(b =>
        b.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000,
                padding: '24px',
                animation: 'modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer'
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: 'var(--card)',
                    width: '100%',
                    maxWidth: '950px',
                    maxHeight: '90vh',
                    borderRadius: '28px',
                    border: '1px solid var(--border)',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.7)',
                    cursor: 'default',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Close Button - Moved to a more "Safe" position and made larger */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '25px',
                        background: 'var(--accent)',
                        border: 'none',
                        borderRadius: '50%',
                        padding: '12px',
                        cursor: 'pointer',
                        color: 'white',
                        zIndex: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(var(--accent-rgb), 0.4)',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
                        e.currentTarget.style.backgroundColor = '#2563eb';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                        e.currentTarget.style.backgroundColor = 'var(--accent)';
                    }}
                >
                    <X style={{ width: '22px', height: '22px' }} />
                </button>

                {/* Header */}
                <div style={{
                    padding: '32px 40px',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'var(--surface)',
                    flexShrink: 0
                }}>
                    <div>
                        <h2 style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.02em' }}>Trading dengan broker anda</h2>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>
                            Gunakan link partner kami untuk mendapatkan bonus <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Eksklusif Alpha Signals</span>
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingRight: '60px' }}>
                        <div style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Search style={{
                                position: 'absolute',
                                left: '12px',
                                width: '16px',
                                height: '16px',
                                color: 'var(--text-muted)'
                            }} />
                            <input
                                type="text"
                                placeholder="Cari broker..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    padding: '10px 16px 10px 36px',
                                    borderRadius: '10px',
                                    border: '1px solid var(--border)',
                                    backgroundColor: 'var(--background)',
                                    color: 'var(--foreground)',
                                    fontSize: '13px',
                                    width: '240px',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div style={{
                    padding: '32px',
                    maxHeight: '600px',
                    overflowY: 'auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '16px'
                }} className="custom-scrollbar">
                    {filteredBrokers.map((broker) => (
                        <div
                            key={broker.id}
                            style={{
                                backgroundColor: 'var(--surface)',
                                border: '1px solid var(--border)',
                                borderRadius: '16px',
                                padding: '24px 16px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '12px',
                                cursor: 'default',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                                textAlign: 'center'
                            }}
                            className="broker-card"
                        >
                            {broker.isPartner && (
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    backgroundColor: 'rgba(var(--accent-rgb), 0.1)',
                                    color: 'var(--accent)',
                                    fontSize: '8px',
                                    fontWeight: 900,
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    border: '1px solid rgba(var(--accent-rgb), 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '3px'
                                }}>
                                    <Zap style={{ width: '10px', height: '10px' }} /> PARTNER
                                </div>
                            )}

                            <div style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '16px',
                                backgroundColor: broker.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px',
                                color: 'white',
                                boxShadow: `0 8px 16px -4px ${broker.color}44`,
                                marginBottom: '4px'
                            }}>
                                {broker.icon}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '8px' }}>
                                <span style={{ fontWeight: 800, fontSize: '14px' }}>{broker.name}</span>
                                {broker.isSimulation ? (
                                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: '1.2' }}>
                                        {broker.description}
                                    </span>
                                ) : (
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '4px',
                                        color: '#f59e0b',
                                        fontSize: '12px',
                                        fontWeight: 700
                                    }}>
                                        <Star fill="#f59e0b" style={{ width: '12px', height: '12px' }} />
                                        {broker.rating}
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                                <button
                                    onClick={() => {
                                        alert(`Menghubungkan ke ${broker.name}...`);
                                        onClose();
                                    }}
                                    style={{
                                        padding: '8px',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border)',
                                        backgroundColor: 'var(--background)',
                                        color: 'var(--foreground)',
                                        fontSize: '11px',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    Login Ke Akun
                                </button>
                                {broker.isPartner && (
                                    <a
                                        href={broker.referralUrl || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            padding: '8px',
                                            borderRadius: '8px',
                                            backgroundColor: 'var(--accent)',
                                            color: 'white',
                                            fontSize: '11px',
                                            fontWeight: 800,
                                            textDecoration: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '4px'
                                        }}
                                    >
                                        Buka Akun & Referer <ExternalLink style={{ width: '10px', height: '10px' }} />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div style={{
                    padding: '20px 32px',
                    backgroundColor: 'var(--surface)',
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                }}>
                    <HelpCircle style={{ width: '16px', height: '16px', color: 'var(--accent)' }} />
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>Butuh broker?</span>
                    <a href="#" style={{ fontSize: '13px', fontWeight: 800, color: 'var(--accent)', textDecoration: 'none' }}>
                        Daftar lewat Vest AI untuk bonus Alpha Signal
                    </a>
                </div>
            </div>

            <style jsx>{`
                @keyframes modalFadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .broker-card:hover {
                    transform: translateY(-5px);
                    border-color: var(--accent);
                    box-shadow: 0 12px 24px -10px rgba(var(--accent-rgb), 0.2);
                }
                .broker-card:active {
                    transform: translateY(-2px);
                }
            `}</style>
        </div>
    );
}
