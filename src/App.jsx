// src/App.jsx
import React, { useState } from 'react';
import HomePage from './HomePage';
import WorkoutSession from './WorkoutSession';
import HistoryPage from './HistoryPage';
import MethodsPage from './MethodsPage';
import LoginPage from './LoginPage';
import { useAuth } from './AuthContext';
import './style.css';

function App() {
    const { user, authLoading, logout } = useAuth();

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

    const [historyTemplate, setHistoryTemplate] = useState(null);
    const [historyExercise, setHistoryExercise] = useState(null);

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

    function openHistory(templateName = null, exerciseName = null) {
        setHistoryTemplate(templateName);
        setHistoryExercise(exerciseName);
        setCurrentView('history');
    }

    function handleOpenHistoryFromHeader() {
        openHistory(null, null);
    }

    function handleOpenHistoryFromWorkout(templateName, exerciseName) {
        openHistory(templateName, exerciseName);
    }

    function handleOpenMethodsFromHeader() {
        setMethodsContext({ from: 'home' });
        setInitialMethod('');
        setCurrentView('methods');
    }

    function handleOpenMethodsFromWorkout(methodName) {
        setMethodsContext({ from: 'workout' });
        setInitialMethod(methodName || '');
        setCurrentView('methods');
    }

    function handleBackFromMethods() {
        if (methodsContext.from === 'workout' && activeWorkoutId) {
            setCurrentView('workout');
        } else {
            setCurrentView('home');
        }
    }

    function handleBackFromHistory() {
        if (activeWorkoutId) {
            setCurrentView('workout');
        } else {
            setCurrentView('home');
        }
    }

    if (authLoading) {
        return (
            <div className="app-shell">
                <div className="app-inner">
                    <p>Carregando autenticação...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <LoginPage />;
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
        content = (
            <HistoryPage
                onBack={handleBackFromHistory}
                initialTemplate={historyTemplate}
                initialExercise={historyExercise}
            />
        );
    } else if (currentView === 'workout' && activeWorkoutId) {
        content = (
            <WorkoutSession
                workoutId={activeWorkoutId}
                onBack={handleBackToHome}
                onOpenMethod={handleOpenMethodsFromWorkout}
                onOpenHistory={handleOpenHistoryFromWorkout}
                user={user}            // aqui entra o usuário real
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
        <div className="app-shell">
            <div className="app-inner">
                <header className="app-header">
                    <h1 className="app-logo-name">Vitalità</h1>
                    <p className="app-header-subtitle">
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
                            onClick={handleOpenHistoryFromHeader}
                        >
                            Ver históricos
                        </button>

                        <button
                            type="button"
                            className="header-secondary-button"
                            onClick={logout}
                        >
                            Sair
                        </button>
                    </div>
                </header>

                <main>{content}</main>
            </div>
        </div>
    );
}

export default App;
