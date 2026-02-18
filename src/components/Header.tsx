"use client";

import { Bell, Search, Sun, Moon, X, TrendingUp, TrendingDown, AlertCircle, ChevronDown } from 'lucide-react';
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
            { id: 3, type: 'alert', title: 'Dividend', message: 'ASII Cum Date', time: '1h' },
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
            case 'price_up': return <TrendingUp className="w-3.5 h-3.5 text-success" />;
            case 'price_down': return <TrendingDown className="w-3.5 h-3.5 text-danger" />;
            default: return <AlertCircle className="w-3.5 h-3.5 text-accent" />;
        }
    };

    return (
        <header className="flex justify-between items-center w-full px-6 border-b bg-card h-16 shrink-0 z-40">
            <div className="flex items-center gap-6">
                <div className="flex flex-col">
                    <h1 className="font-bold text-lg tracking-tight text-foreground">AI Vest <span className="text-accent underline decoration-2 underline-offset-4 decoration-accent/30">Pro</span></h1>
                    <span className="text-[10px] text-muted font-medium uppercase tracking-[0.2em] -mt-1">Terminal</span>
                </div>

                <div className="h-8 w-px bg-border mx-2 hidden md:block"></div>

                <div className="hidden md:flex items-center gap-3 px-3 py-1.5 bg-muted-10 rounded-full border border-border/50">
                    <span className="text-success font-bold text-xs">IDX</span>
                    <span className="text-[11px] font-medium text-foreground/80">7,234.52</span>
                    <span className="text-[10px] text-success font-medium">+0.42%</span>
                </div>
            </div>

            <div className="flex items-center gap-5">
                <div className="relative group">
                    <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-accent transition-colors" />
                    <input
                        type="text"
                        placeholder="Search stock (e.g. BBCA)..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="pl-10 pr-4 py-2 bg-background/50 border border-border/60 hover:border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all w-64 md:w-80"
                    />
                </div>

                <div className="h-6 w-px bg-border mx-1"></div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        className="text-muted hover:text-foreground transition-all flex items-center justify-center p-2 rounded-xl hover:bg-surface border border-transparent hover:border-border/50"
                        style={{ background: 'transparent', cursor: 'pointer' }}
                    >
                        {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
                    </button>

                    <div className="relative" ref={notifRef}>
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className={`text-muted hover:text-foreground transition-all flex items-center justify-center p-2 rounded-xl border border-transparent hover:border-border/50 relative ${showNotifications ? 'bg-surface border-border/50 text-foreground' : 'hover:bg-surface'}`}
                            style={{ background: 'transparent', cursor: 'pointer' }}
                        >
                            <Bell className="w-4.5 h-4.5" />
                            {notifications.length > 0 && (
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border-2 border-card"></span>
                            )}
                        </button>

                        {showNotifications && (
                            <div className="absolute top-full right-0 mt-2 w-72 glass border border-border/50 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[100]">
                                <div className="px-4 py-3 border-b border-border/30 flex justify-between items-center">
                                    <span className="font-bold text-xs tracking-wide">Notifications</span>
                                    <span className="px-1.5 py-0.5 bg-accent/10 text-accent text-[10px] rounded-md font-bold">{notifications.length} NEW</span>
                                </div>
                                <div className="max-h-80 overflow-y-auto custom-scrollbar">
                                    {notifications.length === 0 ? (
                                        <div className="p-8 text-center">
                                            <div className="w-10 h-10 bg-muted-10 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Bell className="w-5 h-5 text-muted/50" />
                                            </div>
                                            <p className="text-xs text-muted">All caught up!</p>
                                        </div>
                                    ) : (
                                        notifications.map(notif => (
                                            <div key={notif.id} className="px-4 py-3 border-b border-border/10 hover:bg-white/5 transition-colors flex items-start gap-3 relative group">
                                                <div className="mt-0.5 p-1.5 bg-muted-10 rounded-lg">{getNotifIcon(notif.type)}</div>
                                                <div className="flex-1 min-w-0 pr-4">
                                                    <p className="text-[12px] font-semibold text-foreground leading-tight">{notif.title}</p>
                                                    <p className="text-[11px] text-muted mt-0.5 line-clamp-2">{notif.message}</p>
                                                    <p className="text-[9px] text-muted-opacity-60 mt-1 uppercase tracking-wider">{notif.time} ago</p>
                                                </div>
                                                <button
                                                    onClick={() => clearNotification(notif.id)}
                                                    className="absolute top-3 right-3 p-1.5 text-muted/30 hover:text-danger hover:bg-danger/10 rounded-md transition-all opacity-0 group-hover:opacity-100"
                                                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                                {notifications.length > 0 && (
                                    <button className="w-full py-2.5 text-[10px] font-bold text-muted hover:text-foreground text-center bg-muted-10/50 border-t border-border/30 transition-colors uppercase tracking-widest">
                                        View All Activity
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="h-6 w-px bg-border mx-1"></div>

                <div className="flex items-center gap-2.5 pl-1 cursor-pointer group">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-white shadow-lg shadow-accent/20 group-hover:scale-105 transition-transform">
                        <span className="text-[11px] font-bold">JD</span>
                    </div>
                    <div className="hidden lg:flex flex-col items-start mr-1">
                        <span className="text-xs font-bold leading-none">Joe Doe</span>
                        <span className="text-[10px] text-muted font-medium mt-0.5">Pro Member</span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-muted group-hover:text-foreground transition-colors" />
                </div>
            </div>
        </header>
    );
}
