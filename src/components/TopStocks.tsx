"use client";

import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const stocks = [
    { symbol: "AAPL", name: "Apple Inc.", price: "185.92", change: "+1.2%", isUp: true },
    { symbol: "MSFT", name: "Microsoft Corp.", price: "402.56", change: "+0.8%", isUp: true },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: "153.21", change: "-0.5%", isUp: false },
    { symbol: "AMZN", name: "Amazon.com", price: "178.22", change: "+2.1%", isUp: true },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: "726.13", change: "+3.5%", isUp: true },
    { symbol: "TSLA", name: "Tesla Inc.", price: "192.33", change: "-1.8%", isUp: false },
    { symbol: "META", name: "Meta Platforms", price: "484.03", change: "+1.5%", isUp: true },
    { symbol: "BRK.B", name: "Berkshire Hathaway", price: "406.88", change: "+0.2%", isUp: true },
    { symbol: "TSM", name: "TSMC", price: "133.11", change: "+4.2%", isUp: true },
    { symbol: "V", name: "Visa Inc.", price: "282.45", change: "-0.1%", isUp: false },
];

export default function TopStocks() {
    return (
        <div className="w-full h-full bg-card border-t p-4 overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg text-foreground">Top 10 Performers</h2>
                <button className="text-sm text-accent hover:text-foreground transition-colors bg-transparent border-none cursor-pointer">View All</button>
            </div>

            <div className="overflow-auto flex-1 h-full">
                <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                    <thead className="text-muted border-b bg-card sticky top-0" style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                        <tr>
                            <th className="py-2 font-medium text-left">Symbol</th>
                            <th className="py-2 font-medium text-left">Name</th>
                            <th className="py-2 font-medium text-right">Price</th>
                            <th className="py-2 font-medium text-right">Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.map((stock) => (
                            <tr key={stock.symbol} className="border-b hover:bg-accent/5 transition-colors">
                                <td className="py-2 font-bold text-foreground text-left">{stock.symbol}</td>
                                <td className="py-2 text-muted text-left">{stock.name}</td>
                                <td className="py-2 text-right text-foreground">${stock.price}</td>
                                <td className={`py-2 text-right font-medium flex items-center justify-end gap-1 ${stock.isUp ? 'text-success' : 'text-danger'}`}>
                                    {stock.isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                    {stock.change}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
