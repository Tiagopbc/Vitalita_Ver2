// src/Sidebar.jsx
import React from "react";
import { Home, Dumbbell, Plus, TrendingUp, User } from "lucide-react";

export function Sidebar({ activeTab, onTabChange }) {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h1 className="sidebar-logo">Vitalità</h1>
            </div>

            <nav className="sidebar-nav">
                <button
                    className={`sidebar-item ${activeTab === 'home' ? 'active' : ''}`}
                    onClick={() => onTabChange('home')}
                >
                    <Home size={20} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
                    <span>Home</span>
                </button>

                <button
                    className={`sidebar-item ${activeTab === 'workouts' ? 'active' : ''}`}
                    onClick={() => onTabChange('workouts')}
                >
                    <Dumbbell size={20} strokeWidth={activeTab === 'workouts' ? 2.5 : 2} />
                    <span>Treinos</span>
                </button>

                {/* Botão Especial */}
                <button
                    className="sidebar-item-special"
                    onClick={() => onTabChange('new')}
                >
                    <Plus size={20} strokeWidth={3} />
                    <span>Novo Treino</span>
                </button>

                <button
                    className={`sidebar-item ${activeTab === 'stats' ? 'active' : ''}`}
                    onClick={() => onTabChange('stats')}
                >
                    <TrendingUp size={20} strokeWidth={activeTab === 'stats' ? 2.5 : 2} />
                    <span>Estatísticas</span>
                </button>

                <button
                    className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => onTabChange('profile')}
                >
                    <User size={20} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
                    <span>Perfil</span>
                </button>
            </nav>
        </aside>
    );
}