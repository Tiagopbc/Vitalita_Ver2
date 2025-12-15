// src/StreakWeeklyGoal.jsx
import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function StreakWeeklyGoal({
                                             currentStreak = 0,
                                             weekDays = [],
                                             progressPercent = 0
                                         }) {
    const [hoveredDay, setHoveredDay] = useState(null);

    return (
        <div className="streak-card" style={{
            background: 'linear-gradient(145deg, #0f172a, #000)',
            borderRadius: '24px',
            padding: '24px',
            border: '1px solid rgba(148,163,184,0.1)',
            marginBottom: '24px'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.2rem' }}>🔥</span>
                    <h3 style={{ margin: 0, color: 'white', fontSize: '1rem', fontWeight: 'bold' }}>Streak Semanal</h3>
                </div>
                <div style={{
                    padding: '4px 12px',
                    borderRadius: '999px',
                    background: 'rgba(168,85,247,0.15)',
                    border: '1px solid rgba(168,85,247,0.3)',
                    color: '#c084fc',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                }}>
                    💎 Diamante
                </div>
            </div>

            <div style={{ display: 'flex', gap: '24px', flexDirection: 'row', alignItems: 'center' }}>
                {/* Anéis SVG */}
                <div style={{ position: 'relative', width: '110px', height: '110px', flexShrink: 0 }}>
                    <svg width="110" height="110" viewBox="0 0 110 110" style={{ transform: 'rotate(-90deg)' }}>
                        <defs>
                            <linearGradient id="gradient-main" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#06b6d4" />
                                <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                            <linearGradient id="gradient-volume" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#059669" />
                            </linearGradient>
                            <linearGradient id="gradient-time" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#f59e0b" />
                                <stop offset="100%" stopColor="#d97706" />
                            </linearGradient>
                        </defs>

                        <circle cx="55" cy="55" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                        <circle cx="55" cy="55" r="38" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                        <circle cx="55" cy="55" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />

                        {/* Progressos fixos para exemplo */}
                        <circle cx="55" cy="55" r="48" fill="none" stroke="url(#gradient-time)" strokeWidth="6" strokeDasharray={`${301 * 0.64} 301`} strokeLinecap="round" />
                        <circle cx="55" cy="55" r="38" fill="none" stroke="url(#gradient-volume)" strokeWidth="6" strokeDasharray={`${239 * 0.71} 239`} strokeLinecap="round" />
                        <circle cx="55" cy="55" r="28" fill="none" stroke="url(#gradient-main)" strokeWidth="6" strokeDasharray={`${176 * (progressPercent / 100)} 176`} strokeLinecap="round" />
                    </svg>

                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white' }}>{currentStreak}</span>
                    </div>
                </div>

                {/* Info Lateral */}
                <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: '12px', fontSize: '0.85rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }}></div>
                            <span>Treinos: 3/4</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></div>
                            <span>Volume: 8.5k</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dias da semana */}
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                {weekDays.map((day, idx) => (
                    <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <div style={{
                            width: '100%', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: day.trained ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' : 'rgba(30, 41, 59, 0.5)',
                            color: day.trained ? 'white' : '#64748b'
                        }}>
                            {day.trained ? <CheckCircle2 size={16} /> : <span style={{fontSize:'0.7rem'}}>{day.day[0]}</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}