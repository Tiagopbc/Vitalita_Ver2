// src/BottomNav.jsx
import React from "react";
import { Home, Dumbbell, Plus, TrendingUp, User } from "lucide-react";

export function BottomNav({ activeTab, onTabChange }) {
    return (
        <nav className="bottom-nav">
            <div className="bottom-nav-container">
                <button
                    className={`bottom-nav-item ${activeTab === 'home' ? 'active' : ''}`}
                    onClick={() => onTabChange('home')}
                >
                    <div className="bottom-nav-icon-wrapper">
                        <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
                        {activeTab === 'home' && <div className="bottom-nav-indicator" />}
                    </div>
                    <span className="bottom-nav-label">Home</span>
                </button>

                <button
                    className={`bottom-nav-item ${activeTab === 'workouts' ? 'active' : ''}`}
                    onClick={() => onTabChange('workouts')}
                >
                    <div className="bottom-nav-icon-wrapper">
                        <Dumbbell size={24} strokeWidth={activeTab === 'workouts' ? 2.5 : 2} />
                        {activeTab === 'workouts' && <div className="bottom-nav-indicator" />}
                    </div>
                    <span className="bottom-nav-label">Treinos</span>
                </button>

                {/* Botão Central Flutuante */}
                <button
                    className="bottom-nav-item special"
                    onClick={() => onTabChange('new')}
                >
                    <div className="bottom-nav-special-button">
                        <Plus size={28} strokeWidth={3} />
                    </div>
                </button>

                <button
                    className={`bottom-nav-item ${activeTab === 'stats' ? 'active' : ''}`}
                    onClick={() => onTabChange('stats')}
                >
                    <div className="bottom-nav-icon-wrapper">
                        <TrendingUp size={24} strokeWidth={activeTab === 'stats' ? 2.5 : 2} />
                        {activeTab === 'stats' && <div className="bottom-nav-indicator" />}
                    </div>
                    <span className="bottom-nav-label">Stats</span>
                </button>

                <button
                    className={`bottom-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => onTabChange('profile')}
                >
                    <div className="bottom-nav-icon-wrapper">
                        <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
                        {activeTab === 'profile' && <div className="bottom-nav-indicator" />}
                    </div>
                    <span className="bottom-nav-label">Perfil</span>
                </button>
            </div>
        </nav>
    );
}