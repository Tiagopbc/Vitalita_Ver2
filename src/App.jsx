import React, { useState } from "react";
import HomePage from "./HomePage";
import WorkoutSession from "./WorkoutSession";
import HistoryPage from "./HistoryPage";
import MethodsPage from "./MethodsPage";
import EditWorkoutPage from "./EditWorkoutPage";
import LoginPage from "./LoginPage";
import RegisterEmail from "./RegisterEmail";
import { useAuth } from "./AuthContext";
import { BottomNav } from "./BottomNav";
import { Sidebar } from "./Sidebar";
import "./style.css";
import "./login.css";

export default function App() {
    const { user, authLoading, logout, registerWithEmail } = useAuth();

    const [authView, setAuthView] = useState("login");
    const [registerLoading, setRegisterLoading] = useState(false);
    const [registerError, setRegisterError] = useState("");

    const [activeWorkoutId, setActiveWorkoutId] = useState(() => {
        const saved = localStorage.getItem("activeWorkoutId");
        return saved || null;
    });

    const [activeWorkout, setActiveWorkout] = useState(null);

    const [currentView, setCurrentView] = useState(() => {
        const saved = localStorage.getItem("activeWorkoutId");
        return saved ? "workout" : "home";
    });

    const [activeTab, setActiveTab] = useState(() => {
        const saved = localStorage.getItem("activeWorkoutId");
        return saved ? "workouts" : "home";
    });

    const [initialMethod, setInitialMethod] = useState("");
    const [methodsContext, setMethodsContext] = useState({ from: "home" });

    const [historyTemplate, setHistoryTemplate] = useState(null);
    const [historyExercise, setHistoryExercise] = useState(null);

    const [editingWorkoutId, setEditingWorkoutId] = useState(null);

    function handleSelectWorkout(workout) {
        if (!workout) return;
        setActiveWorkoutId(workout.id);
        setActiveWorkout(workout);
        localStorage.setItem("activeWorkoutId", workout.id);
        setCurrentView("workout");
        setActiveTab("workouts");
    }

    function handleBackToHome() {
        setCurrentView("home");
        setActiveWorkoutId(null);
        setActiveWorkout(null);
        localStorage.removeItem("activeWorkoutId");
        setActiveTab("home");
    }

    function openHistory(templateName = null, exerciseName = null) {
        setHistoryTemplate(templateName);
        setHistoryExercise(exerciseName);
        setCurrentView("history");
    }

    function handleOpenHistoryFromHeader() {
        openHistory(null, null);
        setActiveTab("stats");
    }

    function handleOpenHistoryFromWorkout(templateName, exerciseName) {
        openHistory(templateName, exerciseName);
        setActiveTab("stats");
    }

    function handleOpenMethodsFromHeader() {
        setMethodsContext({ from: "home" });
        setInitialMethod("");
        setCurrentView("methods");
        setActiveTab("profile");
    }

    function handleOpenMethodsFromWorkout(methodName) {
        setMethodsContext({ from: "workout" });
        setInitialMethod(methodName || "");
        setCurrentView("methods");
        setActiveTab("profile");
    }

    function handleBackFromMethods() {
        if (methodsContext.from === "workout" && activeWorkoutId) {
            setCurrentView("workout");
            setActiveTab("workouts");
            return;
        }
        setCurrentView("home");
        setActiveTab("home");
    }

    function handleBackFromHistory() {
        if (activeWorkoutId) {
            setCurrentView("workout");
            setActiveTab("workouts");
            return;
        }
        setCurrentView("home");
        setActiveTab("home");
    }

    function handleOpenCreateWorkout() {
        setEditingWorkoutId(null);
        setCurrentView("editWorkout");
        setActiveTab("new");
    }

    function handleOpenEditWorkoutFromWorkout() {
        if (!activeWorkoutId) return;
        setEditingWorkoutId(activeWorkoutId);
        setCurrentView("editWorkout");
        setActiveTab("new");
    }

    async function handleLogout() {
        localStorage.removeItem("activeWorkoutId");
        setActiveWorkoutId(null);
        setActiveWorkout(null);
        setCurrentView("home");
        setActiveTab("home");
        await logout();
    }

    function handleTabChange(tabId) {
        if (tabId === "home") {
            setCurrentView("home");
            setActiveTab("home");
            return;
        }

        if (tabId === "workouts") {
            setCurrentView(activeWorkoutId ? "workout" : "home");
            setActiveTab("workouts");
            return;
        }

        if (tabId === "new") {
            handleOpenCreateWorkout();
            return;
        }

        if (tabId === "stats") {
            handleOpenHistoryFromHeader();
            return;
        }

        if (tabId === "profile") {
            handleOpenMethodsFromHeader();
            return;
        }
    }

    async function handleSubmitRegister(payload) {
        setRegisterLoading(true);
        setRegisterError("");
        const res = await registerWithEmail(payload);
        if (!res.ok) {
            setRegisterError(res.error);
            setRegisterLoading(false);
            return;
        }
        setRegisterLoading(false);
    }

    if (authLoading) {
        return (
            <div className="login-shell">
                <div className="login-card login-card-compact">
                    <div className="login-header">
                        <h1 className="login-logo">VITALITÀ</h1>
                        <p className="login-subtitle">Seu diário inteligente de treinos</p>
                    </div>
                    <p style={{ textAlign: "center", margin: 0, color: "rgba(148,163,184,0.95)" }}>Carregando...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        if (authView === "register") {
            return (
                <RegisterEmail
                    onSubmitRegister={handleSubmitRegister}
                    onBackToLogin={() => {
                        setRegisterError("");
                        setAuthView("login");
                    }}
                    loading={registerLoading}
                    errorMessage={registerError}
                />
            );
        }

        return <LoginPage onShowRegister={() => setAuthView("register")} />;
    }

    let content;

    if (currentView === "methods") {
        content = <MethodsPage onBack={handleBackFromMethods} initialMethod={initialMethod} />;
    } else if (currentView === "editWorkout") {
        content = <EditWorkoutPage user={user} workoutId={editingWorkoutId} onBack={handleBackToHome} />;
    } else if (currentView === "history") {
        content = (
            <HistoryPage
                onBack={handleBackFromHistory}
                initialTemplate={historyTemplate}
                initialExercise={historyExercise}
                user={user}
            />
        );
    } else if (currentView === "workout" && activeWorkoutId) {
        content = (
            <WorkoutSession
                workoutId={activeWorkoutId}
                workout={activeWorkout}
                workoutName={activeWorkout?.name}
                onBack={handleBackToHome}
                onOpenMethod={handleOpenMethodsFromWorkout}
                onOpenHistory={handleOpenHistoryFromWorkout}
                onEditWorkout={handleOpenEditWorkoutFromWorkout}
                user={user}
            />
        );
    } else {
        content = <HomePage onSelectWorkout={handleSelectWorkout} onCreateWorkout={handleOpenCreateWorkout} user={user} />;
    }

    return (
        <div className="app-layout">
            <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />

            <div className="app-main-content">
                <div className="app-shell">
                    <div className="app-inner">
                        <header className="app-header">
                            <h1 className="app-logo-name">Vitalità</h1>
                            <p className="app-header-subtitle">Seu diário inteligente de treinos</p>

                            <div className="header-actions">
                                <button type="button" className="header-secondary-button" onClick={handleOpenMethodsFromHeader}>
                                    Métodos de treino
                                </button>

                                <button type="button" className="header-history-button" onClick={handleOpenHistoryFromHeader}>
                                    Ver históricos
                                </button>

                                <button type="button" className="header-secondary-button" onClick={handleLogout}>
                                    Sair
                                </button>
                            </div>
                        </header>

                        <main>{content}</main>
                    </div>
                </div>
            </div>

            <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
    );
}