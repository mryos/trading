"use client";

import { Bell, Search, Sun, Moon, X, TrendingUp, TrendingDown, AlertCircle, User, ChevronRight, Globe, Bitcoin, Landmark, Zap } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface Notification {
    id: number;
    type: 'price_up' | 'price_down' | 'alert';
    title: string;
    message: string;
    time: string;
}

interface MarketSymbol {
    symbol: string; // The full TradingView symbol (e.g., "BINANCE:BTCUSDT")
    displaySymbol: string; // What the user sees (e.g., "BTC")
    name: string;
    market: 'IDX' | 'CRYPTO' | 'US_STOCK' | 'FOREX';
}

interface HeaderProps {
    onSearch?: (symbol: string) => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    isPro: boolean;
    onTogglePro: () => void;
}

const MARKET_DATA: MarketSymbol[] = [
    // IDX
    { symbol: "IDX:BBCA", displaySymbol: "BBCA", name: "Bank Central Asia Tbk.", market: 'IDX' },
    { symbol: "IDX:BBRI", displaySymbol: "BBRI", name: "Bank Rakyat Indonesia (Persero) Tbk.", market: 'IDX' },
    { symbol: "IDX:GOTO", displaySymbol: "GOTO", name: "GoTo Gojek Tokopedia Tbk.", market: 'IDX' },
    { symbol: "IDX:TLKM", displaySymbol: "TLKM", name: "Telkom Indonesia (Persero) Tbk.", market: 'IDX' },
    { symbol: "IDX:ASII", displaySymbol: "ASII", name: "Astra International Tbk.", market: 'IDX' },

    // Crypto
    { symbol: "BINANCE:BTCUSDT", displaySymbol: "BTC", name: "Bitcoin / TetherUS", market: 'CRYPTO' },
    { symbol: "BINANCE:ETHUSDT", displaySymbol: "ETH", name: "Ethereum / TetherUS", market: 'CRYPTO' },
    { symbol: "BINANCE:SOLUSDT", displaySymbol: "SOL", name: "Solana / TetherUS", market: 'CRYPTO' },
    { symbol: "BINANCE:BNBUSDT", displaySymbol: "BNB", name: "BNB / TetherUS", market: 'CRYPTO' },
    { symbol: "BINANCE:DOGEUSDT", displaySymbol: "DOGE", name: "Dogecoin / TetherUS", market: 'CRYPTO' },

    // US Stocks
    { symbol: "NASDAQ:AAPL", displaySymbol: "AAPL", name: "Apple Inc.", market: 'US_STOCK' },
    { symbol: "NASDAQ:TSLA", displaySymbol: "TSLA", name: "Tesla, Inc.", market: 'US_STOCK' },
    { symbol: "NASDAQ:NVDA", displaySymbol: "NVDA", name: "NVIDIA Corporation", market: 'US_STOCK' },
    { symbol: "NASDAQ:MSFT", displaySymbol: "MSFT", name: "Microsoft Corporation", market: 'US_STOCK' },
    { symbol: "NASDAQ:AMZN", displaySymbol: "AMZN", name: "Amazon.com, Inc.", market: 'US_STOCK' },

    // Forex / Global
    { symbol: "FX:EURUSD", displaySymbol: "EURUSD", name: "Euro / US Dollar", market: 'FOREX' },
    { symbol: "FX:USDJPY", displaySymbol: "USDJPY", name: "US Dollar / Japanese Yen", market: 'FOREX' },
    { symbol: "OANDA:XAUUSD", displaySymbol: "GOLD", name: "Gold / US Dollar", market: 'FOREX' },
];

export default function Header({ onSearch, theme, toggleTheme, isPro, onTogglePro }: HeaderProps) {
    const [searchValue, setSearchValue] = useState("");
    const [suggestions, setSuggestions] = useState<MarketSymbol[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const notifRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setNotifications([
            { id: 1, type: 'price_up', title: 'BTC', message: 'Crossed $90,000', time: '2m' },
            { id: 2, type: 'price_down', title: 'BBCA', message: 'Price dipped to Rp10,150', time: '15m' },
        ]);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);

        if (value.length > 0) {
            const filtered = MARKET_DATA.filter(item =>
                item.displaySymbol.toLowerCase().includes(value.toLowerCase()) ||
                item.name.toLowerCase().includes(value.toLowerCase()) ||
                item.symbol.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 6);
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (fullSymbol: string) => {
        setSearchValue(fullSymbol.split(':')[1] || fullSymbol);
        setShowSuggestions(false);
        if (onSearch) onSearch(fullSymbol);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setShowSuggestions(false);
            if (onSearch) {
                // If the user typed something with a colon, use it as is
                // Otherwise, use the generic search handler logic in page.tsx
                onSearch(searchValue);
            }
        }
    };

    const clearNotification = (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const getMarketIcon = (market: string) => {
        switch (market) {
            case 'CRYPTO': return <Bitcoin style={{ width: '12px', height: '12px', color: '#F7931A' }} />;
            case 'US_STOCK': return <Globe style={{ width: '12px', height: '12px', color: 'var(--accent)' }} />;
            case 'IDX': return <Landmark style={{ width: '12px', height: '12px', color: 'var(--success)' }} />;
            default: return <Globe style={{ width: '12px', height: '12px', color: 'var(--text-muted)' }} />;
        }
    };

    const getNotifIcon = (type: string) => {
        switch (type) {
            case 'price_up': return <TrendingUp style={{ width: '14px', height: '14px', color: 'var(--success)' }} />;
            case 'price_down': return <TrendingDown style={{ width: '14px', height: '14px', color: 'var(--danger)' }} />;
            default: return <AlertCircle style={{ width: '14px', height: '14px', color: 'var(--accent)' }} />;
        }
    };

    const iconBtnStyle: React.CSSProperties = {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--text-muted)',
        padding: '8px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        position: 'relative'
    };

    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '0 24px',
            borderBottom: '1px solid var(--border)',
            backgroundColor: 'var(--card)',
            height: '64px',
            flexShrink: 0,
            zIndex: 40
        }}>
            {/* Left: Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    backgroundColor: 'var(--accent)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)'
                }}>
                    <TrendingUp style={{ width: '18px', height: '18px', color: 'white' }} />
                </div>
                <h1 style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.025em', color: 'var(--foreground)', textTransform: 'uppercase', fontStyle: 'italic' }}>
                    VEST <span style={{ color: 'var(--accent)', textDecoration: 'underline', textDecorationThickness: '2px', textUnderlineOffset: '4px' }}>AI</span>
                </h1>
            </div>

            {/* Right: Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

                {/* Search */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} ref={searchRef}>
                    <div style={{ position: 'absolute', left: '12px', display: 'flex', alignItems: 'center', pointerEvents: 'none', zIndex: 10 }}>
                        <Search style={{ width: '15px', height: '15px', color: 'var(--text-muted)' }} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search BTC, AAPL, GOTO..."
                        value={searchValue}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        style={{
                            paddingLeft: '38px',
                            paddingRight: '16px',
                            paddingTop: '8px',
                            paddingBottom: '8px',
                            backgroundColor: 'rgba(var(--background-rgb), 0.5)',
                            border: '1px solid rgba(var(--border-rgb), 0.6)',
                            borderRadius: '12px',
                            fontSize: '13px',
                            color: 'var(--foreground)',
                            outline: 'none',
                            width: '320px',
                            transition: 'all 0.2s',
                            fontFamily: 'inherit'
                        }}
                        onFocus={e => {
                            e.currentTarget.style.borderColor = 'var(--accent)';
                            e.currentTarget.style.width = '400px';
                            if (suggestions.length > 0) setShowSuggestions(true);
                        }}
                        onBlur={e => {
                            e.currentTarget.style.borderColor = 'rgba(var(--border-rgb), 0.6)';
                            e.currentTarget.style.width = '320px';
                        }}
                    />

                    {/* Search Suggestions */}
                    {showSuggestions && (
                        <div style={{
                            position: 'absolute',
                            top: 'calc(100% + 8px)',
                            left: 0,
                            width: '100%',
                            backgroundColor: 'var(--card)',
                            borderRadius: '12px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            border: '1px solid rgba(var(--border-rgb), 0.5)',
                            zIndex: 100,
                            overflow: 'hidden',
                            animation: 'fade-in 0.15s ease-out'
                        }}>
                            {suggestions.length > 0 ? (
                                <>
                                    <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(var(--border-rgb), 0.1)', fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Quick Suggestions
                                    </div>
                                    {suggestions.map((item) => (
                                        <div
                                            key={item.symbol}
                                            onMouseDown={() => handleSuggestionClick(item.symbol)}
                                            style={{
                                                padding: '10px 12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.15s'
                                            }}
                                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(var(--accent-rgb, 59, 130, 246), 0.1)')}
                                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
                                                    {getMarketIcon(item.market)}
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--foreground)' }}>{item.displaySymbol}</span>
                                                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>{item.name}</span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ fontSize: '9px', color: 'var(--text-muted)', backgroundColor: 'var(--surface)', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>{item.market.replace('_', ' ')}</span>
                                                <ChevronRight style={{ width: '12px', height: '12px', color: 'var(--text-muted)', opacity: 0.5 }} />
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div
                                    onMouseDown={() => {
                                        if (onSearch) onSearch(searchValue);
                                        setShowSuggestions(false);
                                    }}
                                    style={{
                                        padding: '14px 16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(var(--accent-rgb, 59, 130, 246), 0.1)')}
                                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                                >
                                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Search style={{ width: '14px', height: '14px', color: 'white' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--foreground)' }}>Search for "{searchValue}"</span>
                                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Try full TradingView symbol (e.g. BINANCE:BTCUSDT)</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        style={iconBtnStyle}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                        {theme === 'dark'
                            ? <Sun style={{ width: '18px', height: '18px' }} />
                            : <Moon style={{ width: '18px', height: '18px' }} />
                        }
                    </button>

                    {/* Notifications */}
                    <div style={{ position: 'relative' }} ref={notifRef}>
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            style={{
                                ...iconBtnStyle,
                                backgroundColor: showNotifications ? 'var(--surface)' : 'transparent',
                                color: showNotifications ? 'var(--foreground)' : 'var(--text-muted)'
                            }}
                        >
                            <Bell style={{ width: '18px', height: '18px' }} />
                            {notifications.length > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                    width: '7px',
                                    height: '7px',
                                    backgroundColor: 'var(--danger)',
                                    borderRadius: '50%',
                                    border: '2px solid var(--card)'
                                }} />
                            )}
                        </button>

                        {showNotifications && (
                            <div style={{
                                position: 'absolute',
                                top: 'calc(100% + 8px)',
                                right: 0,
                                width: '280px',
                                backgroundColor: 'var(--card)',
                                borderRadius: '16px',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                zIndex: 100,
                                overflow: 'hidden',
                                border: '1px solid rgba(var(--border-rgb), 0.5)',
                                animation: 'fade-in 0.15s ease-out'
                            }}>
                                <div style={{
                                    padding: '12px 16px',
                                    borderBottom: '1px solid rgba(var(--border-rgb), 0.3)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span style={{ fontWeight: 700, fontSize: '11px', textTransform: 'uppercase' }}>Alerts</span>
                                    <button onClick={() => setNotifications([])} style={{ fontSize: '10px', color: 'var(--accent)', background: 'transparent', border: 'none', cursor: 'pointer' }}>Clear all</button>
                                </div>
                                <div className="custom-scrollbar" style={{ maxHeight: '260px', overflowY: 'auto' }}>
                                    {notifications.length === 0 ? (
                                        <div style={{ padding: '32px', textAlign: 'center' }}>
                                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No new alerts</p>
                                        </div>
                                    ) : (
                                        notifications.map(notif => (
                                            <div
                                                key={notif.id}
                                                style={{
                                                    padding: '12px 16px',
                                                    borderBottom: '1px solid rgba(var(--border-rgb), 0.1)',
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: '12px',
                                                    backgroundColor: 'var(--card)',
                                                    transition: 'all 0.15s'
                                                }}
                                            >
                                                <div style={{ marginTop: '2px' }}>{getNotifIcon(notif.type)}</div>
                                                <div style={{ flex: 1 }}>
                                                    <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--foreground)', lineHeight: 1.2 }}>{notif.title}</p>
                                                    <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>{notif.message}</p>
                                                </div>
                                                <button
                                                    onClick={() => clearNotification(notif.id)}
                                                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}
                                                >
                                                    <X style={{ width: '12px', height: '12px' }} />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border)', margin: '0 4px' }} />

                    <div style={{ position: 'relative' }} ref={userMenuRef}>
                        <div
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '4px 8px',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                backgroundColor: showUserMenu ? 'var(--surface)' : 'transparent',
                                transition: 'all 0.2s',
                                border: '1px solid transparent'
                            }}
                            onMouseEnter={e => !showUserMenu && (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
                            onMouseLeave={e => !showUserMenu && (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                            <div style={{
                                width: '34px',
                                height: '34px',
                                borderRadius: '50%',
                                background: isPro ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, var(--accent), var(--accent-hover))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                boxShadow: isPro ? '0 0 15px rgba(245, 158, 11, 0.4)' : 'none',
                                border: '2px solid var(--card)'
                            }}>
                                <User style={{ width: '16px', height: '16px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                                <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--foreground)' }}>Andy Trader</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                                    <span style={{ fontSize: '9px', fontWeight: 700, color: isPro ? '#f59e0b' : 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                                        {isPro ? 'PRO ACCOUNT' : 'GUEST USER'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {showUserMenu && (
                            <div style={{
                                position: 'absolute',
                                top: 'calc(100% + 12px)',
                                right: 0,
                                width: '240px',
                                backgroundColor: 'var(--card)',
                                borderRadius: '16px',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                border: '1px solid var(--border)',
                                zIndex: 100,
                                overflow: 'hidden',
                                animation: 'fade-in 0.1s ease-out'
                            }}>
                                <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                                    <p style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Signed in as</p>
                                    <p style={{ fontSize: '13px', fontWeight: 800, color: 'var(--foreground)' }}>andy.trader@gmail.com</p>
                                </div>
                                <div style={{ padding: '8px' }}>
                                    <button
                                        onClick={() => {
                                            onTogglePro();
                                            setShowUserMenu(false);
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            backgroundColor: isPro ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                            color: isPro ? '#ef4444' : '#f59e0b',
                                            border: isPro ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(245, 158, 11, 0.2)',
                                            borderRadius: '10px',
                                            cursor: 'pointer',
                                            fontSize: '11px',
                                            fontWeight: 800,
                                            marginBottom: '8px',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <Zap style={{ width: '14px', height: '14px' }} />
                                        {isPro ? 'DOWNGRADE TO FREE' : 'SWITCH TO PRO MODE'}
                                    </button>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                        {[
                                            { id: 'settings', label: 'Account Settings', icon: User },
                                            { id: 'portfolio', label: 'Portfolio View', icon: TrendingUp },
                                            { id: 'market', label: 'Global Market', icon: Globe },
                                            { id: 'logout', label: 'Logout', icon: X }
                                        ].map((item) => (
                                            <div
                                                key={item.id}
                                                onClick={() => {
                                                    setShowUserMenu(false);
                                                    if (item.id === 'logout') {
                                                        if (isPro) onTogglePro();
                                                        alert("Logging out of presentation mode...");
                                                    } else {
                                                        alert(`Redirecting to ${item.label}... (Presentation Dummy)`);
                                                    }
                                                }}
                                                style={{
                                                    padding: '10px 12px',
                                                    fontSize: '12px',
                                                    fontWeight: 600,
                                                    color: 'var(--text-muted)',
                                                    cursor: 'pointer',
                                                    borderRadius: '8px',
                                                    transition: 'all 0.15s',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px'
                                                }}
                                                onMouseEnter={e => {
                                                    e.currentTarget.style.backgroundColor = 'var(--surface)';
                                                    e.currentTarget.style.color = 'var(--foreground)';
                                                }}
                                                onMouseLeave={e => {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                    e.currentTarget.style.color = 'var(--text-muted)';
                                                }}
                                            >
                                                <item.icon style={{ width: '14px', height: '14px', opacity: 0.7 }} />
                                                {item.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
