// src/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Target, Play, Plus, History, Dumbbell, BarChart3, ChevronRight } from 'lucide-react';
import StreakWeeklyGoal from './StreakWeeklyGoal'; // Agora este arquivo existe!

const mockWeekDays = [
    { day: 'S', trained: true }, { day: 'T', trained: true }, { day: 'Q', trained: false },
    { day: 'Q', trained: true }, { day: 'S', trained: false }, { day: 'S', trained: false }, { day: 'D', trained: false }
];

export default function HomePage({ onSelectWorkout, onCreateWorkout, onNavigateToMethods, onNavigateToHistory, user }) {
    const [greeting, setGreeting] = useState('Bom dia');

    useEffect(() => {
        const h = new Date().getHours();
        setGreeting(h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite');
    }, []);

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {/* Hero */}
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.8rem', color: 'white', margin: 0 }}>
                    {greeting}, <span style={{ color: '#3abff8' }}>{user?.displayName?.split(' ')[0] || 'Atleta'}</span>
                </h1>
                <p style={{ color: '#94a3b8', margin: '4px 0' }}>Continue sua jornada rumo aos seus objetivos.</p>
            </div>

            {/* Streak Card */}
            <StreakWeeklyGoal currentStreak={7} weekDays={mockWeekDays} progressPercent={75} />

            {/* Grid Principal */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '24px' }}>

                {/* Próximo Treino */}
                <button onClick={() => console.log("Ir para treino")} style={{
                    background: 'radial-gradient(circle at top left, #1d4ed8, #0ea5e9)',
                    border: '1px solid rgba(56,189,248,0.5)', borderRadius: '24px', padding: '24px',
                    textAlign: 'left', color: 'white', cursor: 'pointer', position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <p style={{ fontSize: '0.75rem', color: '#bae6fd', letterSpacing: '1px', textTransform: 'uppercase' }}>Sugerido para hoje</p>
                        <h3 style={{ fontSize: '1.5rem', margin: '8px 0' }}>Pernas (Quadríceps)</h3>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', color: '#e0f2fe' }}>
                            <span>💪 6 exercícios</span><span>⏱️ ~60 min</span>
                        </div>
                    </div>
                </button>

                {/* Ações Rápidas */}
                <div style={{ background: '#0f172a', borderRadius: '24px', padding: '20px', border: '1px solid rgba(148,163,184,0.1)' }}>
                    <h3 style={{ margin: '0 0 16px 0', fontSize: '1rem', color: 'white' }}>Acesso Rápido</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <Btn label="Novo Treino" icon={<Plus size={20}/>} onClick={onCreateWorkout} />
                        <Btn label="Histórico" icon={<History size={20}/>} onClick={onNavigateToHistory} />
                        <Btn label="Métodos" icon={<Dumbbell size={20}/>} onClick={onNavigateToMethods} />
                        <Btn label="Volume" icon={<BarChart3 size={20}/>} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Btn({ label, icon, onClick }) {
    return (
        <button onClick={onClick} style={{
            background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
            borderRadius: '12px', padding: '12px', color: '#e2e8f0', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', fontSize: '0.8rem'
        }}>
            <div style={{ color: '#3abff8' }}>{icon}</div>
            {label}
        </button>
    )
}