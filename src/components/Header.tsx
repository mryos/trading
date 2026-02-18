"use client";

import { Bell, Search, Sun, Moon, X, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface Notification {
    id: number;
    type: 'price_up' | 'price_down' | 'alert';
    title: string;
    message: string;
    time: string;
}

interface HeaderProps {
    onSearch?: (symbol: string) => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export default function Header({ onSearch, theme, toggleTheme }: HeaderProps) {
    const [searchValue, setSearchValue] = useState("");
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const notifRef = useRef<HTMLDivElement>(null);

    // Initialize notifications on client-side only
    useEffect(() => {
        setNotifications([
            { id: 1, type: 'price_up', title: 'NVDA', message: 'Crossed $500', time: '2m' },
            { id: 2, type: 'price_down', title: 'TSLA', message: 'Below $180', time: '15m' },
            { id: 3, type: 'alert', title: 'Fed News', message: 'Rate decision', time: '1h' },
        ]);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onSearch) {
            onSearch(searchValue);
        }
    };

    const clearNotification = (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const getNotifIcon = (type: string) => {
        switch (type) {
            case 'price_up': return <TrendingUp className="w-4 h-4 text-success" />;
            case 'price_down': return <TrendingDown className="w-4 h-4 text-danger" />;
            default: return <AlertCircle className="w-4 h-4 text-accent" />;
        }
    };

    return (
        <div className="flex justify-between items-center w-full p-4 border-b bg-card h-16">
            <div className="flex items-center gap-4">
                <h1 className="font-bold text-xl text-foreground">Try AI Vest</h1>
                <div className="flex items-center gap-2 text-muted text-sm ml-8">
                    <span className="text-secondary font-medium" style={{ color: '#2962ff' }}>BTC/USD</span>
                    <span>$43,241.50</span>
                    <span className="text-success">+2.4%</span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative">
                    <Search className="w-5 h-5 text-muted absolute left-3 center-y" />
                    <input
                        type="text"
                        placeholder="Search assets..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="pl-10 pr-4 py-2 bg-background border rounded-lg text-sm text-foreground focus-outline-none focus:border-accent"
                        style={{
                            borderColor: 'var(--border)',
                            outline: 'none'
                        }}
                    />
                </div>

                <button
                    onClick={toggleTheme}
                    className="text-muted hover:text-foreground transition-colors cursor-pointer flex items-center justify-center p-2 rounded-full hover:bg-accent/10"
                    style={{ background: 'transparent', border: 'none' }}
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Notifications Bell */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="text-muted hover:text-foreground transition-colors cursor-pointer flex items-center justify-center relative"
                        style={{ background: 'transparent', border: 'none' }}
                    >
                        <Bell className="w-5 h-5" />
                        {notifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                                {notifications.length}
                            </span>
                        )}
                    </button>

                    {/* Notifications Dropdown - Fixed Position */}
                    {showNotifications && (
                        <div
                            className="bg-card border rounded-lg shadow-md overflow-hidden"
                            style={{
                                position: 'fixed',
                                top: '64px',
                                right: '80px',
                                width: '220px',
                                maxHeight: '200px',
                                zIndex: 9999
                            }}
                        >
                            <div className="px-3 py-2 border-b flex justify-between items-center bg-card">
                                <span className="font-bold text-xs text-foreground">Notifications</span>
                                <span className="text-[10px] text-muted">{notifications.length}</span>
                            </div>
                            <div className="overflow-y-auto" style={{ maxHeight: '160px' }}>
                                {notifications.length === 0 ? (
                                    <div className="p-3 text-center text-muted text-[10px]">No notifications</div>
                                ) : (
                                    notifications.map(notif => (
                                        <div key={notif.id} className="px-3 py-1.5 border-b hover:bg-muted-10 transition-colors flex items-center gap-2">
                                            <div className="flex-shrink-0">{getNotifIcon(notif.type)}</div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[11px] font-medium text-foreground">{notif.title}</p>
                                                <p className="text-[10px] text-muted truncate">{notif.message} • {notif.time}</p>
                                            </div>
                                            <button
                                                onClick={() => clearNotification(notif.id)}
                                                className="text-muted hover:text-foreground transition-colors flex-shrink-0"
                                                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold cursor-pointer text-xs">
                    AI
                </div>
            </div>
        </div>
    );
}
