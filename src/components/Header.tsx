"use client";

import { Bell, Search, Sun, Moon, X, TrendingUp, TrendingDown, AlertCircle, ChevronDown, User } from 'lucide-react';
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
            { id: 1, type: 'price_up', title: 'BBCA', message: 'Crossed Rp10.000', time: '2m' },
            { id: 2, type: 'price_down', title: 'GOTO', message: 'Below Rp50', time: '15m' },
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
        <header className="flex justify-between items-center w-full px-6 border-b bg-card h-16 shrink-0 z-40">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
                        <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="font-bold text-lg tracking-tight text-foreground uppercase italic">AI VEST <span className="text-accent underline decoration-2 underline-offset-4">PRO</span></h1>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center relative group">
                    <div className="absolute left-3 flex items-center pointer-events-none">
                        <Search className="w-4 h-4 text-muted group-focus-within:text-accent transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search stock code..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="pl-10 pr-4 py-2 bg-background/50 border border-border/60 rounded-xl text-sm text-foreground focus:outline-none focus:border-accent transition-all w-64 lg:w-96"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="text-muted hover:text-foreground p-2 rounded-xl transition-all hover:bg-surface"
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>

                    <div className="relative" ref={notifRef}>
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className={`text-muted hover:text-foreground p-2 rounded-xl transition-all relative ${showNotifications ? 'bg-surface' : 'hover:bg-surface'}`}
                            style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                        >
                            <Bell className="w-5 h-5" />
                            {notifications.length > 0 && (
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-danger rounded-full border-2 border-card"></span>
                            )}
                        </button>

                        {showNotifications && (
                            <div className="absolute top-full right-0 mt-2 w-72 glass rounded-2xl shadow-2xl z-[100] overflow-hidden border border-border/50">
                                <div className="px-4 py-3 border-b border-border/30 flex justify-between items-center bg-card">
                                    <span className="font-bold text-xs">NOTIFICATIONS</span>
                                    <span className="text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 rounded font-bold">{notifications.length}</span>
                                </div>
                                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                                    {notifications.length === 0 ? (
                                        <div className="p-8 text-center bg-card">
                                            <p className="text-xs text-muted">All clear!</p>
                                        </div>
                                    ) : (
                                        notifications.map(notif => (
                                            <div key={notif.id} className="px-4 py-3 border-b border-border/10 flex items-start gap-3 relative hover:bg-muted-10 transition-colors bg-card">
                                                <div className="mt-0.5">{getNotifIcon(notif.type)}</div>
                                                <div className="flex-1">
                                                    <p className="text-[11px] font-bold text-foreground leading-tight">{notif.title}</p>
                                                    <p className="text-[10px] text-muted mt-0.5">{notif.message}</p>
                                                </div>
                                                <button onClick={() => clearNotification(notif.id)} className="text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="h-6 w-px bg-border mx-1"></div>

                    <div className="flex items-center gap-2 pr-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent to-accent-hover flex items-center justify-center text-white shadow-lg shadow-accent/20">
                            <User className="w-4 h-4" />
                        </div>
                        <div className="hidden lg:flex flex-col">
                            <span className="text-[10px] font-bold leading-none text-foreground uppercase">Pro Member</span>
                            <span className="text-[9px] text-success font-medium">Verified</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
