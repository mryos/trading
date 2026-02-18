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
                <div className="flex flex-col">
                    <h1 className="font-bold text-lg tracking-tight text-foreground">AI VEST <span className="text-accent underline decoration-2 underline-offset-4 decoration-accent/30">PRO</span></h1>
                </div>
                <div className="hidden md:flex items-center gap-3 px-3 py-1 bg-muted-10 rounded-full border border-border/50">
                    <span className="text-success font-bold text-[10px]">IDX</span>
                    <span className="text-[10px] font-medium text-foreground/80">7,234.52</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex relative group">
                    <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-accent" />
                    <input
                        type="text"
                        placeholder="Search stock..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="pl-9 pr-4 py-2 bg-background border border-border/60 rounded-xl text-sm text-foreground focus:outline-none focus:border-accent transition-all w-64 lg:w-80"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        className="text-muted hover:text-foreground p-2 rounded-xl transition-all"
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>

                    <div className="relative" ref={notifRef}>
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="text-muted hover:text-foreground p-2 rounded-xl relative"
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                        >
                            <Bell className="w-5 h-5" />
                            {notifications.length > 0 && (
                                <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full"></span>
                            )}
                        </button>

                        {showNotifications && (
                            <div className="absolute top-full right-0 mt-2 w-72 bg-card border border-border rounded-xl shadow-lg z-[100] overflow-hidden">
                                <div className="px-4 py-2 border-b border-border bg-muted-10">
                                    <span className="font-bold text-xs">Notifications</span>
                                </div>
                                <div className="max-h-60 overflow-y-auto">
                                    {notifications.length === 0 ? (
                                        <div className="p-4 text-center text-xs text-muted">No messages</div>
                                    ) : (
                                        notifications.map(notif => (
                                            <div key={notif.id} className="px-4 py-3 border-b border-border/10 flex items-start gap-3 relative hover:bg-muted-10">
                                                <div className="mt-1">{getNotifIcon(notif.type)}</div>
                                                <div className="flex-1">
                                                    <p className="text-[11px] font-bold">{notif.title}</p>
                                                    <p className="text-[10px] text-muted">{notif.message}</p>
                                                </div>
                                                <button onClick={() => clearNotification(notif.id)} className="text-muted hover:text-danger" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="h-4 w-px bg-border"></div>

                <div className="flex items-center gap-2 px-3 py-1.5 bg-accent text-white rounded-lg shadow-sm">
                    <User className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">PRO</span>
                </div>
            </div>
        </header>
    );
}
