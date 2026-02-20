"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Trash2, RefreshCcw } from 'lucide-react';

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
    const [messageCount, setMessageCount] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const MESSAGE_LIMIT = 5;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const loadMessages = () => {
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
        alert("Chat limit has been reset for testing.");
    };

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

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
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--card)', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--card)', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Bot style={{ width: '18px', height: '18px', color: 'white' }} />
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--foreground)' }}>AI Vest Assistant</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--success)', display: 'inline-block' }}></span>
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500 }}>Online</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                        onClick={handleClearChat}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '8px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(var(--border-rgb), 0.2)'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        title="Clear Chat"
                    >
                        <Trash2 style={{ width: '16px', height: '16px' }} />
                    </button>
                    {messageCount >= MESSAGE_LIMIT && (
                        <button
                            style={{
                                padding: '4px 10px',
                                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                                color: 'var(--accent)',
                                fontSize: '10px',
                                fontWeight: 700,
                                borderRadius: '8px',
                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                cursor: 'pointer',
                                animation: 'pulse 2s infinite'
                            }}
                        >
                            UPGRADE PRO
                        </button>
                    )}
                </div>
            </div>

            {/* Messages List */}
            <div
                className="custom-scrollbar"
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    backgroundColor: 'rgba(var(--background-rgb), 0.3)',
                    minHeight: 0
                }}
            >
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                        }}
                    >
                        <div style={{ maxWidth: '85%', display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                            <div
                                style={{
                                    padding: '10px 14px',
                                    fontSize: '13px',
                                    borderRadius: msg.sender === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                    wordWrap: 'break-word',
                                    whiteSpace: 'pre-wrap',
                                    backgroundColor: msg.sender === 'user' ? 'var(--accent)' : 'var(--card)',
                                    color: msg.sender === 'user' ? 'white' : 'var(--foreground)',
                                    border: msg.sender === 'bot' ? '1px solid rgba(var(--border-rgb), 0.5)' : 'none'
                                }}
                            >
                                {msg.text}
                            </div>
                            <span style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '4px', padding: '0 4px', opacity: 0.6 }}>
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            backgroundColor: 'var(--card)',
                            border: '1px solid rgba(var(--border-rgb), 0.5)',
                            padding: '10px 14px',
                            borderRadius: '16px 16px 16px 0',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                        }}>
                            <span className="animate-bounce" style={{ width: '5px', height: '5px', backgroundColor: 'var(--accent)', borderRadius: '50%', display: 'inline-block', animationDelay: '0ms' }}></span>
                            <span className="animate-bounce" style={{ width: '5px', height: '5px', backgroundColor: 'var(--accent)', borderRadius: '50%', display: 'inline-block', animationDelay: '150ms' }}></span>
                            <span className="animate-bounce" style={{ width: '5px', height: '5px', backgroundColor: 'var(--accent)', borderRadius: '50%', display: 'inline-block', animationDelay: '300ms' }}></span>
                        </div>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontStyle: 'italic' }}>AI is analyzing...</span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{ padding: '12px 16px', backgroundColor: 'var(--card)', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: '999px',
                    padding: '8px 8px 8px 16px',
                    opacity: messageCount >= MESSAGE_LIMIT ? 0.5 : 1,
                    pointerEvents: messageCount >= MESSAGE_LIMIT ? 'none' : 'auto',
                    transition: 'border-color 0.2s'
                }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={messageCount >= MESSAGE_LIMIT ? "Limit reached..." : "Tanya tentang saham..."}
                        disabled={messageCount >= MESSAGE_LIMIT}
                        style={{
                            flex: 1,
                            background: 'transparent',
                            fontSize: '13px',
                            color: 'var(--foreground)',
                            outline: 'none',
                            border: 'none',
                            minWidth: 0
                        }}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || messageCount >= MESSAGE_LIMIT}
                        style={{
                            padding: '7px',
                            borderRadius: '50%',
                            border: 'none',
                            cursor: input.trim() && messageCount < MESSAGE_LIMIT ? 'pointer' : 'not-allowed',
                            backgroundColor: input.trim() && messageCount < MESSAGE_LIMIT ? 'var(--accent)' : 'rgba(139, 148, 158, 0.15)',
                            color: input.trim() && messageCount < MESSAGE_LIMIT ? 'white' : 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s',
                            flexShrink: 0
                        }}
                    >
                        <Send style={{ width: '15px', height: '15px' }} />
                    </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '8px' }}>
                    {messageCount < MESSAGE_LIMIT ? (
                        <p style={{ fontSize: '9px', color: 'var(--text-muted)', opacity: 0.6 }}>
                            Sisa pesan gratis hari ini:{' '}
                            <span style={{ fontWeight: 700, color: 'var(--accent)' }}>{MESSAGE_LIMIT - messageCount}</span>
                        </p>
                    ) : (
                        <p style={{ fontSize: '9px', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            Limit reached. Upgrade to PRO
                        </p>
                    )}

                    <button
                        onClick={handleResetLimit}
                        style={{
                            fontSize: '9px',
                            color: 'var(--text-muted)',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '2px 6px',
                            borderRadius: '4px'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(var(--border-rgb), 0.1)'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <RefreshCcw style={{ width: '10px', height: '10px' }} />
                        Reset for Test
                    </button>
                </div>
            </div>
        </div>
    );
}
