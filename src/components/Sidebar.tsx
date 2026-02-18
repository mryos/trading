import { Settings, Target, Zap } from 'lucide-react';

export default function Sidebar() {
    return (
        <aside className="flex flex-col h-screen w-16 bg-card border-r items-center py-6 z-50">
            {/* Brand Icon */}
            <div className="group relative flex items-center justify-center">
                <div className="p-3 bg-accent text-white rounded-2xl hover:rotate-12 transition-all cursor-pointer shadow-xl shadow-accent/40 active:scale-95">
                    <Target className="w-6 h-6" />
                </div>
                {/* Minimal Label if needed, but keeping it empty per request for no icons */}
            </div>

            <div className="flex-1"></div>

            {/* Bottom Actions */}
            <div className="w-full flex flex-col items-center gap-4 mb-6">
                <div className="p-2 bg-success/10 text-success rounded-xl cursor-help group relative">
                    <Zap className="w-5 h-5" />
                    <span className="absolute left-full ml-3 px-2 py-1 bg-card border text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100] font-bold">
                        Ultra Low Latency
                    </span>
                </div>

                <button
                    className="p-3 text-muted hover:text-foreground hover:bg-surface rounded-2xl transition-all group relative"
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                >
                    <Settings className="w-5 h-5" />
                    <span className="absolute left-full ml-3 px-2 py-1 bg-card border text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100]">
                        Settings
                    </span>
                </button>
            </div>
        </aside>
    );
}
