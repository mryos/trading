"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export default function AIAssistant() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Initialize on client-side only to prevent hydration mismatch
    useEffect(() => {
        setIsClient(true);
        setMessages([
            {
                id: 1,
                text: "Hello! I am AI Vest. How can I help you analyze the market today?",
                sender: 'bot',
                timestamp: new Date()
            }
        ]);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: messages.length + 1,
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const botResponse: Message = {
                id: messages.length + 2,
                text: generateResponse(input),
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000);
    };

    const generateResponse = (query: string): string => {
        const q = query.toLowerCase();
        if (q.includes('buy') || q.includes('recommend')) {
            return "Based on momentum indicators, NVDA is currently in a strong uptrend. Support is established at $480.";
        }
        if (q.includes('btc')) {
            return "Bitcoin is testing the $44,000 resistance level. Volume is steady.";
        }
        return `I am analyzing the market data for "${query}". Please check back in a moment for the full report.`;
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="flex flex-col h-full bg-card border-l border mt-0 font-sans">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-card shadow-sm z-10 sticky top-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center opacity-90">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-foreground">AI Vest Assistant</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                            <span className="text-[10px] text-muted font-medium">Online</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted-10 custom-scrollbar">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'
                                }`}
                        >
                            <div
                                className={`px-4 py-2 text-sm rounded-2xl shadow-sm break-words ${msg.sender === 'user'
                                    ? 'bg-accent text-white rounded-br-none'
                                    : 'bg-card text-foreground border rounded-bl-none'
                                    }`}
                            >
                                {msg.text}
                            </div>
                            <span className="text-[10px] text-muted mt-1 px-1">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start w-full">
                        <div className="bg-card border px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-card border-t">
                <div className="flex items-center gap-2 bg-background border rounded-full px-4 py-2 focus-ring-accent transition-all shadow-sm">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 bg-transparent text-sm text-foreground focus-outline-none"
                        style={{ minWidth: 0 }}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className={`p-2 rounded-full transition-all flex-shrink-0 cursor-pointer ${input.trim()
                            ? 'bg-accent hover-bg-accent-hover shadow-md text-white'
                            : 'bg-muted-10 text-muted cursor-not-allowed'
                            }`}
                        style={{ border: 'none' }}
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-[10px] text-center text-muted mt-2 opacity-60">
                    AI generated content may be inaccurate.
                </p>
            </div>
        </div>
    );
}
