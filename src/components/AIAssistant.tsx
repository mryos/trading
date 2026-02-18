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
    const [messageCount, setMessageCount] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const MESSAGE_LIMIT = 5;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Initialize on client-side and load count
    useEffect(() => {
        setIsClient(true);
        const savedCount = localStorage.getItem('ai_message_count');
        if (savedCount) setMessageCount(parseInt(savedCount));

        setMessages([
            {
                id: 1,
                text: "Halo! Saya AI Vest Assistant. Saya bisa membantu Anda menganalisis saham atau crypto. Ingin tanya apa hari ini?",
                sender: 'bot',
                timestamp: new Date()
            }
        ]);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        // Check Limit
        if (messageCount >= MESSAGE_LIMIT) {
            const limitMsg: Message = {
                id: Date.now(),
                text: "🚨 Anda telah mencapai batas chat harian (5 pesan). Upgrade ke PRO untuk akses tak terbatas dan analisis instan!",
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, limitMsg]);
            setInput('');
            return;
        }

        const userText = input.trim();
        const userMessage: Message = {
            id: Date.now(),
            text: userText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Update count
        const newCount = messageCount + 1;
        setMessageCount(newCount);
        localStorage.setItem('ai_message_count', newCount.toString());

        try {
            const history = messages
                .filter(m => m.id !== 1)
                .map(m => ({
                    role: m.sender === 'user' ? 'user' : 'assistant',
                    content: m.text
                }));

            history.push({ role: 'user', content: userText });

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: history }),
            });

            if (!response.ok) throw new Error('Failed to fetch response');
            const data = await response.json();

            const botResponse: Message = {
                id: Date.now() + 1,
                text: data.content,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error('Chat Error:', error);
            const errorMsg: Message = {
                id: Date.now() + 1,
                text: "Maaf, server sedang sibuk. Coba lagi dalam beberapa saat.",
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="flex flex-col h-full bg-card font-sans overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-card z-10 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-foreground">AI Vest Assistant</h3>
                        <div className="flex items-center gap-1.5 leading-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                            <span className="text-[10px] text-muted font-medium">Online</span>
                        </div>
                    </div>
                </div>
                {messageCount >= MESSAGE_LIMIT && (
                    <button className="px-2 py-1 bg-accent/20 text-accent text-[10px] font-bold rounded-lg border border-accent/30 animate-pulse">
                        UPGRADE PRO
                    </button>
                )}
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-background/30" style={{ minHeight: 0 }}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[85%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                            <div
                                className={`px-4 py-2.5 text-[13px] rounded-2xl shadow-sm break-words whitespace-pre-wrap ${msg.sender === 'user'
                                    ? 'bg-accent text-white rounded-br-none'
                                    : 'bg-card text-foreground border border-border/50 rounded-bl-none'
                                    }`}
                            >
                                {msg.text}
                            </div>
                            <span className="text-[9px] text-muted mt-1 px-1 opacity-60">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start w-full">
                        <div className="bg-card border border-border/50 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-card border-t border-border/50 shrink-0">
                <div className={`flex items-center gap-2 bg-background border border-border/80 rounded-full px-4 py-2 focus-within:border-accent transition-all ${messageCount >= MESSAGE_LIMIT ? 'opacity-50 pointer-events-none' : ''}`}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={messageCount >= MESSAGE_LIMIT ? "Limit reached..." : "Tanya tentang saham..."}
                        className="flex-1 bg-transparent text-sm text-foreground focus:outline-none placeholder:text-muted/50"
                        style={{ minWidth: 0 }}
                        disabled={messageCount >= MESSAGE_LIMIT}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || messageCount >= MESSAGE_LIMIT}
                        className={`p-2 rounded-full transition-all flex-shrink-0 ${input.trim() && messageCount < MESSAGE_LIMIT
                            ? 'bg-accent text-white shadow-lg'
                            : 'bg-muted-10 text-muted'
                            }`}
                        style={{ border: 'none', cursor: messageCount < MESSAGE_LIMIT ? 'pointer' : 'not-allowed' }}
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                {messageCount < MESSAGE_LIMIT ? (
                    <p className="text-[9px] text-center text-muted mt-2 opacity-50">
                        Sisa pesan gratis hari ini: <span className="font-bold text-accent">{MESSAGE_LIMIT - messageCount}</span>
                    </p>
                ) : (
                    <div className="flex flex-col items-center gap-1.5 mt-2">
                        <p className="text-[9px] text-center text-accent font-bold uppercase tracking-widest">
                            Gabung PRO untuk akses tak terbatas
                        </p>
                        <button
                            onClick={() => {
                                setMessageCount(0);
                                localStorage.setItem('ai_message_count', '0');
                            }}
                            className="text-[9px] text-muted hover:text-foreground underline cursor-pointer bg-transparent border-none"
                        >
                            Reset Limit (Testing Only)
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
