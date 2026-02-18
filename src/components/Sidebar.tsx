import { BarChart2, Briefcase, Settings, Target, User, LayoutDashboard } from 'lucide-react';

export default function Sidebar() {
    const mainNav = [
        { icon: LayoutDashboard, label: 'Dashboard', active: true },
        { icon: Briefcase, label: 'Portfolio', active: false },
        { icon: BarChart2, label: 'Analytics', active: false },
        { icon: User, label: 'Profile', active: false },
    ];

    return (
        <aside className="flex flex-col h-screen w-16 bg-card border-r items-center py-6 gap-8 z-50">
            {/* Brand Icon */}
            <div className="p-2.5 bg-accent/15 text-accent rounded-xl hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-accent/20">
                <Target className="w-6 h-6" />
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-5 w-full items-center flex-1">
                {mainNav.map((item, idx) => (
                    <button
                        key={idx}
                        className={`p-2.5 rounded-xl transition-all duration-300 group relative ${item.active
                                ? 'bg-accent text-white shadow-md shadow-accent/30'
                                : 'text-muted hover:text-foreground hover:bg-surface'
                            } ${!item.active ? 'opacity-60 hover:opacity-100' : ''}`}
                        title={item.label}
                        disabled={!item.active}
                        style={{ border: 'none', cursor: item.active ? 'pointer' : 'not-allowed' }}
                    >
                        <item.icon className="w-5 h-5" />
                        {/* Tooltip */}
                        <span className="absolute left-full ml-3 px-2 py-1 bg-card border text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100]">
                            {item.label} {!item.active && '(Soon)'}
                        </span>
                    </button>
                ))}
            </nav>

            {/* Bottom Actions */}
            <div className="w-full flex justify-center mt-auto">
                <button
                    className="p-2.5 text-muted hover:text-foreground hover:bg-surface rounded-xl transition-all opacity-60 hover:opacity-100 group relative"
                    style={{ border: 'none', cursor: 'pointer' }}
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
