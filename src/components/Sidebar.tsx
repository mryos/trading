import { Settings, Target } from 'lucide-react';

export default function Sidebar() {
    return (
        <aside style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '64px',
            backgroundColor: 'var(--card)',
            borderRight: '1px solid var(--border)',
            alignItems: 'center',
            padding: '24px 0',
            zIndex: 50,
            flexShrink: 0
        }}>
            {/* Brand Icon */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div
                    style={{
                        padding: '10px',
                        backgroundColor: 'var(--accent)',
                        color: 'white',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'rotate(12deg)';
                        e.currentTarget.style.boxShadow = '0 12px 24px rgba(59, 130, 246, 0.5)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'rotate(0deg)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)';
                    }}
                    onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.95) rotate(12deg)'; }}
                    onMouseUp={e => { e.currentTarget.style.transform = 'rotate(12deg)'; }}
                >
                    <Target style={{ width: '22px', height: '22px' }} />
                </div>
            </div>

            <div style={{ flex: 1 }} />

            {/* Bottom Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <div style={{ position: 'relative' }} className="group">
                    <button
                        style={{
                            padding: '10px',
                            color: 'var(--text-muted)',
                            borderRadius: '12px',
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.color = 'var(--foreground)';
                            e.currentTarget.style.backgroundColor = 'var(--surface)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.color = 'var(--text-muted)';
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        title="Settings"
                    >
                        <Settings style={{ width: '18px', height: '18px' }} />
                    </button>
                </div>
            </div>
        </aside>
    );
}
