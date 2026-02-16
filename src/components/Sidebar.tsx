import { BarChart2, Briefcase, Settings, Target, User } from 'lucide-react';

export default function Sidebar() {
    return (
        <div className="flex flex-col h-screen w-16 bg-card border-r border-b items-center py-4 gap-8">
            {/* Brand Icon */}
            <div className="p-2 bg-accent rounded-lg">
                <Target className="text-white w-6 h-6" />
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-6 w-full items-center flex-1">
                <button className="sidebar-btn p-2 text-accent hover:bg-accent/10 rounded-lg transition-colors" title="Dashboard">
                    <BarChart2 className="w-5 h-5" />
                </button>
                <button
                    className="sidebar-btn p-2 text-muted hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors opacity-50 cursor-not-allowed"
                    title="Portfolio (Coming Soon)"
                    disabled
                >
                    <Briefcase className="w-5 h-5" />
                </button>
                <button className="sidebar-btn p-2 text-muted hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors opacity-50 cursor-not-allowed" title="Profile (Coming Soon)" disabled>
                    <User className="w-5 h-5" />
                </button>
            </div>

            {/* Bottom Actions */}
            <div className="pb-4 w-full flex justify-center">
                <button className="sidebar-btn p-2 text-muted hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors opacity-50 cursor-not-allowed" title="Settings (Coming Soon)" disabled>
                    <Settings className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
