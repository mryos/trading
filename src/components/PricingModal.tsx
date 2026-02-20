"use client";

import React, { useState } from 'react';
import { Check, Zap, X, ShieldCheck, Rocket, Crown, Star, Gem } from 'lucide-react';

interface PricingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PricingModal({ isOpen, onClose }: PricingModalProps) {
    const [selectedTier, setSelectedTier] = useState<number>(1);

    if (!isOpen) return null;

    const tiers = [
        {
            id: 0,
            name: 'BASIC',
            price: '45.000',
            originalPrice: '50.000',
            period: '/bulan',
            icon: Zap,
            description: 'Akses esensial untuk trader retail harian.',
            features: ['5 Sinyal Alpha / Hari', '3 Pesan AI Analyst', 'IDX News Feed', 'Standard Support'],
            color: 'var(--text-muted)'
        },
        {
            id: 1,
            name: 'PRO',
            price: '119.000',
            originalPrice: '150.000',
            period: '/3 bulan',
            icon: Star,
            description: 'Paket terpopuler untuk hasil maksimal.',
            features: ['Sinyal Alpha Tanpa Batas', '100 Pesan AI Analyst', 'Deteksi Whale Flow', 'Priority Analyst Access'],
            color: 'var(--accent)',
            popular: true
        },
        {
            id: 2,
            name: 'INSTITUTIONAL',
            price: '399.000',
            originalPrice: '599.000',
            period: '/tahun',
            icon: Gem,
            description: 'Solusi lengkap untuk profesional.',
            features: ['Semua Fitur Pro', 'Unlimited AI Analyst', 'Early Access Insight', 'Personal Portfolio Review'],
            color: '#f59e0b'
        }
    ];

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            animation: 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
            <div style={{
                backgroundColor: 'var(--card)',
                width: '100%',
                maxWidth: '1050px',
                maxHeight: '90vh', // Ensure it doesn't exceed screen height
                borderRadius: '32px',
                border: '1px solid var(--border)',
                overflowY: 'auto', // Make it scrollable if content is too tall
                position: 'relative',
                boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.7)',
            }}
                className="custom-scrollbar"
            >
                {/* Close Button - MADE MUCH MORE VISIBLE */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'var(--accent)', // Use accent color so it pops
                        border: 'none',
                        borderRadius: '50%',
                        padding: '12px',
                        cursor: 'pointer',
                        color: 'white',
                        zIndex: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }}
                >
                    <X style={{ width: '20px', height: '20px' }} />
                </button>

                {/* Header Section */}
                <div style={{
                    padding: '60px 40px 40px 40px',
                    textAlign: 'center',
                }}>
                    <h2 style={{ fontSize: '42px', fontWeight: 900, marginBottom: '12px', letterSpacing: '-0.03em' }}>
                        Pilih Paket <span style={{ color: 'var(--accent)' }}>Cuanmu!</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
                        Buka potensi penuh data pasar dengan AI yang membantu Anda menemukan sinyal ALPHA lebih cepat.
                    </p>
                </div>

                {/* Tiers Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '24px',
                    padding: '0 40px 40px 40px'
                }}>
                    {tiers.map((tier) => {
                        const isSelected = selectedTier === tier.id;
                        return (
                            <div
                                key={tier.name}
                                onClick={() => setSelectedTier(tier.id)}
                                style={{
                                    backgroundColor: isSelected ? 'rgba(var(--accent-rgb), 0.03)' : 'var(--surface)',
                                    borderRadius: '24px',
                                    padding: '32px',
                                    border: `2px solid ${isSelected ? tier.color : 'var(--border)'}`,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                                    boxShadow: isSelected ? `0 20px 40px -10px ${tier.color}33` : 'none'
                                }}
                            >
                                {tier.popular && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '-14px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        backgroundColor: tier.color,
                                        color: 'white',
                                        fontSize: '11px',
                                        fontWeight: 900,
                                        padding: '4px 16px',
                                        borderRadius: '20px',
                                        letterSpacing: '0.05em',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        BEST VALUE
                                    </div>
                                )}

                                <div style={{ marginBottom: '24px' }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '14px',
                                        backgroundColor: isSelected ? tier.color : 'rgba(255,255,255,0.05)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '16px',
                                        transition: 'all 0.3s'
                                    }}>
                                        <tier.icon style={{ width: '24px', height: '24px', color: isSelected ? 'white' : tier.color }} />
                                    </div>
                                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: isSelected ? tier.color : 'var(--foreground)' }}>{tier.name}</h3>

                                    <div style={{ marginTop: '8px' }}>
                                        {tier.originalPrice && (
                                            <div style={{ fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'line-through', opacity: 0.6, marginBottom: '-4px' }}>
                                                Rp {tier.originalPrice}
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                            <span style={{ fontSize: '16px', fontWeight: 800 }}>Rp</span>
                                            <span style={{ fontSize: '32px', fontWeight: 900 }}>{tier.price}</span>
                                            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>{tier.period}</span>
                                        </div>
                                    </div>

                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px', lineHeight: '1.5' }}>{tier.description}</p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, paddingBottom: '32px' }}>
                                    {tier.features.map((feature, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <Check style={{ width: '16px', height: '16px', color: tier.color, flexShrink: 0 }} />
                                            <span style={{ fontSize: '13px', fontWeight: 600 }}>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button style={{
                                    width: '100%',
                                    padding: '16px',
                                    borderRadius: '16px',
                                    backgroundColor: isSelected ? tier.color : 'transparent',
                                    color: isSelected ? 'white' : tier.color,
                                    border: `2px solid ${tier.color}`,
                                    fontSize: '14px',
                                    fontWeight: 900,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}>
                                    {isSelected ? 'Gunakan Paket Ini' : 'Pilih Paket'}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Trust Footer */}
                <div style={{
                    padding: '24px 40px',
                    borderTop: '1px solid var(--border)',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '40px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, opacity: 0.6 }}>
                        <ShieldCheck style={{ width: '18px', height: '18px' }} /> Jaminan Keamanan Transaksi
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, opacity: 0.6 }}>
                        <Rocket style={{ width: '18px', height: '18px' }} /> Aktivasi Instan dalam 4 Detik
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
