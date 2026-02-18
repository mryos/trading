import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are AI Vest, a professional financial assistant for IDX (Indonesia Stock Exchange) traders. Provide concise, helpful trading insights based on user queries. Always prioritize safety and clarify that this is not financial advice.'
                },
                ...messages
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
            max_tokens: 1024,
        });

        const responseContent = chatCompletion.choices[0]?.message?.content || "Maaf, saya tidak bisa memproses permintaan Anda saat ini.";

        return NextResponse.json({ content: responseContent });
    } catch (error) {
        console.error('Groq API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
