"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Trash2, RefreshCcw } from 'lucide-react';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

interface AIAssistantProps {
    isPro?: boolean;
}

export default function AIAssistant({ isPro = false }: AIAssistantProps) {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [messageCount, setMessageCount] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const MESSAGE_LIMIT = isPro ? 100 : 3;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const loadMessages = () => {
        const savedCount = localStorage.getItem('ai_message_count');
        if (savedCount) setMessageCount(parseInt(savedCount));
        setMessages([
            {
                id: 1,
                text: "Halo! Saya AI Vest Assistant. Saya bisa membantu Anda menganalisis pasar atau emiten tertentu hari ini. Ada yang ingin ditanyakan?",
                sender: 'bot',
                timestamp: new Date()
            }
        ]);
    };

    useEffect(() => {
        loadMessages();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleClearChat = () => {
        if (confirm("Hapus semua pesan chat?")) {
            loadMessages();
        }
    };

    const handleResetLimit = () => {
        setMessageCount(0);
        localStorage.setItem('ai_message_count', '0');
    };

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        if (messageCount >= MESSAGE_LIMIT) {
            const limitMsg: Message = {
                id: Date.now(),
                text: isPro
                    ? "🚨 Anda telah mencapai batas maksimal 100 pesan Pro untuk sesi ini. Silakan reset limit untuk lanjut."
                    : "🚨 Batas pesan gratis harian (3 pesan) telah tercapai. Upgrade ke Pro untuk akses hingga 100 pesan!",
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
                text: "Maaf, koneksi ke AI terganggu. Silakan coba lagi.",
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
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: 'var(--card)',
            overflow: 'hidden'
        }}>
            {/* Chat Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderBottom: '1px solid var(--border)',
                backgroundColor: 'rgba(var(--card-rgb), 0.5)',
                flexShrink: 0
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: isPro ? '#f59e0b' : 'var(--accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isPro ? '0 0 10px rgba(245, 158, 11, 0.3)' : 'none'
                    }}>
                        <Bot style={{ width: '18px', height: '18px', color: 'white' }} />
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '13px', fontWeight: 800 }}>VEST AI ANALYST</span>
                            {isPro && <span style={{ fontSize: '9px', backgroundColor: '#f59e0b', color: 'white', padding: '1px 4px', borderRadius: '4px', fontWeight: 900 }}>PRO</span>}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--success)' }} />
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Online</span>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                    <button onClick={handleClearChat} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', color: 'var(--text-muted)' }}>
                        <Trash2 style={{ width: '16px', height: '16px' }} />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="custom-scrollbar" style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                backgroundColor: 'rgba(var(--background-rgb), 0.2)'
            }}>
                {messages.map((msg) => (
                    <div key={msg.id} style={{ display: 'flex', width: '100%', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                        <div style={{
                            maxWidth: '85%',
                            padding: '12px 16px',
                            fontSize: '13px',
                            lineHeight: '1.5',
                            borderRadius: msg.sender === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
                            backgroundColor: msg.sender === 'user' ? 'var(--accent)' : 'var(--card)',
                            color: msg.sender === 'user' ? 'white' : 'var(--foreground)',
                            border: msg.sender === 'bot' ? '1px solid var(--border)' : 'none',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div style={{ display: 'flex', gap: '4px', padding: '8px' }}>
                        <div className="animate-bounce" style={{ width: '4px', height: '4px', backgroundColor: 'var(--accent)', borderRadius: '50%' }} />
                        <div className="animate-bounce" style={{ width: '4px', height: '4px', backgroundColor: 'var(--accent)', borderRadius: '50%', animationDelay: '0.2s' }} />
                        <div className="animate-bounce" style={{ width: '4px', height: '4px', backgroundColor: 'var(--accent)', borderRadius: '50%', animationDelay: '0.4s' }} />
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{ padding: '20px', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Tanya peluang pasar..."
                        disabled={messageCount >= MESSAGE_LIMIT}
                        style={{
                            flex: 1,
                            height: '42px',
                            borderRadius: '21px',
                            border: '1px solid var(--border)',
                            backgroundColor: 'var(--background)',
                            padding: '0 20px',
                            fontSize: '13px',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                        }}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            border: 'none',
                            backgroundColor: 'var(--accent)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            flexShrink: 0, // Prevent squashing
                            boxShadow: '0 4px 12px rgba(var(--accent-rgb), 0.3)'
                        }}
                    >
                        <Send style={{ width: '18px', height: '18px' }} />
                    </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', padding: '0 8px' }}>
                    <span style={{ fontSize: '10px', color: messageCount >= MESSAGE_LIMIT ? 'var(--danger)' : 'var(--text-muted)', fontWeight: 600 }}>
                        {isPro ? 'PRO QUOTA:' : 'FREE QUOTA:'} {messageCount}/{MESSAGE_LIMIT} pesan
                    </span>
                    <button onClick={handleResetLimit} style={{ background: 'transparent', border: 'none', color: 'var(--accent)', fontSize: '10px', fontWeight: 600, opacity: 0.5, cursor: 'pointer' }}>
                        RESET LIMIT
                    </button>
                </div>
            </div>
        </div>
    );
}
