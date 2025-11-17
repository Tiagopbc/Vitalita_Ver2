// src/App.jsx

import React, { useState } from 'react';
import HomePage from './HomePage';
import WorkoutSession from './WorkoutSession';
import HistoryPage from './HistoryPage';
import MethodsPage from './MethodsPage';
import './style.css';

const USER_PROFILE_ID = 'Tiago';

function App() {
    // lê o localStorage uma vez só, na criação do estado
    const [activeWorkoutId, setActiveWorkoutId] = useState(() => {
        const saved = localStorage.getItem('activeWorkoutId');
        return saved || null;
    });

    const [currentView, setCurrentView] = useState(() => {
        const saved = localStorage.getItem('activeWorkoutId');
        return saved ? 'workout' : 'home';
    });

    const [initialMethod, setInitialMethod] = useState('');
    const [methodsContext, setMethodsContext] = useState({ from: 'home' });

    function handleSelectWorkout(id) {
        setActiveWorkoutId(id);
        localStorage.setItem('activeWorkoutId', id);
        setCurrentView('workout');
    }

    function handleBackToHome() {
        setCurrentView('home');
        setActiveWorkoutId(null);
        localStorage.removeItem('activeWorkoutId');
    }

    function handleOpenHistory() {
        setCurrentView('history');
    }

    // abrir métodos pelo cabeçalho
    function handleOpenMethodsFromHeader() {
        setMethodsContext({ from: 'home' });
        setInitialMethod('');
        setCurrentView('methods');
    }

    // abrir métodos a partir de um exercício do treino
    function handleOpenMethodsFromWorkout(methodName) {
        setMethodsContext({ from: 'workout' });
        setInitialMethod(methodName || '');
        setCurrentView('methods');
    }

    // voltar da tela de métodos
    function handleBackFromMethods() {
        if (methodsContext.from === 'workout' && activeWorkoutId) {
            setCurrentView('workout');
        } else {
            setCurrentView('home');
        }
    }

    // voltar da tela de histórico
    function handleBackFromHistory() {
        if (activeWorkoutId) {
            setCurrentView('workout');
        } else {
            setCurrentView('home');
        }
    }

    let content;

    if (currentView === 'methods') {
        content = (
            <MethodsPage
                onBack={handleBackFromMethods}
                initialMethod={initialMethod}
            />
        );
    } else if (currentView === 'history') {
        content = <HistoryPage onBack={handleBackFromHistory} />;
    } else if (currentView === 'workout' && activeWorkoutId) {
        content = (
            <WorkoutSession
                workoutId={activeWorkoutId}
                onBack={handleBackToHome}
                onOpenMethod={handleOpenMethodsFromWorkout}
                userProfileId={USER_PROFILE_ID}
            />
        );
    } else {
        content = (
            <HomePage
                onSelectWorkout={handleSelectWorkout}
            />
        );
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Vitalità</h1>
                <p className="App-subtitle">
                    Seu diário inteligente de treinos
                </p>

                <div className="header-actions">
                    <button
                        type="button"
                        className="header-secondary-button"
                        onClick={handleOpenMethodsFromHeader}
                    >
                        Métodos de treino
                    </button>

                    <button
                        type="button"
                        className="header-history-button"
                        onClick={handleOpenHistory}
                    >
                        Ver históricos
                    </button>
                </div>
            </header>

            <main>{content}</main>
        </div>
    );
}

export default App;