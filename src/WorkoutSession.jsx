// src/WorkoutSession.jsx
import React, { useState, useEffect } from "react";
import {
    ArrowLeft,
    CheckCircle2,
    Info,
    Calculator,
    Eye,
    EyeOff,
    Timer,
    TrendingUp,
    Sparkles
} from "lucide-react";

// Placeholders visuais; troque pelos componentes reais assim que existirem
// import { MethodModal } from "./MethodModal";
// import { RestTimer } from "./RestTimer";
// import { OneRMCalculator } from "./OneRMCalculator";
// import { AchievementNotification } from "./AchievementNotification";

function MethodModal() {
    return null;
}

function RestTimer() {
    return null;
}

function OneRMCalculator() {
    return null;
}

function AchievementNotification() {
    return null;
}

// Integração com o storage real do projeto sem quebrar se faltarem exports
// Assim que você tiver essas funções no workoutStorage, elas passam a funcionar de verdade
import * as workoutStorage from "./workoutStorage";

const {
    saveWorkoutHistory = () => {},
    getLastExercisePerformance = () => null,
    suggestWeight = () => null,
    getUserStats = () => ({ achievements: [] })
} = workoutStorage;

// Tabela fixa dos treinos enumerados 1 a 5
const workoutExercises = {
    1: [
        {
            id: 1,
            name: "Supino Reto",
            muscleGroup: "Peito",
            sets: 4,
            reps: "8-12",
            method: "Convencional",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        },
        {
            id: 2,
            name: "Supino Inclinado",
            muscleGroup: "Peito",
            sets: 3,
            reps: "10-12",
            method: "Convencional",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        },
        {
            id: 3,
            name: "Desenvolvimento",
            muscleGroup: "Ombros",
            sets: 3,
            reps: "10-12",
            method: "Convencional",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        },
        {
            id: 4,
            name: "Elevação Lateral",
            muscleGroup: "Ombros",
            sets: 3,
            reps: "12-15",
            method: "Drop-set",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        },
        {
            id: 5,
            name: "Tríceps Testa",
            muscleGroup: "Tríceps",
            sets: 3,
            reps: "10-12",
            method: "Convencional",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        },
        {
            id: 6,
            name: "Tríceps Pulley",
            muscleGroup: "Tríceps",
            sets: 3,
            reps: "12-15",
            method: "Pico de contração",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        }
    ],
    2: [
        {
            id: 1,
            name: "Barra Fixa",
            muscleGroup: "Costas",
            sets: 4,
            reps: "6-10",
            method: "Convencional",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        },
        {
            id: 2,
            name: "Remada Curvada",
            muscleGroup: "Costas",
            sets: 4,
            reps: "8-12",
            method: "Convencional",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        },
        {
            id: 3,
            name: "Pulldown",
            muscleGroup: "Costas",
            sets: 3,
            reps: "10-12",
            method: "Convencional",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        },
        {
            id: 4,
            name: "Crucifixo Inverso",
            muscleGroup: "Posterior Ombro",
            sets: 3,
            reps: "12-15",
            method: "Pico de contração",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        },
        {
            id: 5,
            name: "Rosca Direta",
            muscleGroup: "Bíceps",
            sets: 3,
            reps: "10-12",
            method: "Convencional",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        },
        {
            id: 6,
            name: "Rosca Martelo",
            muscleGroup: "Bíceps",
            sets: 3,
            reps: "10-12",
            method: "Convencional",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        }
    ],
    3: [
        {
            id: 1,
            name: "Agachamento",
            muscleGroup: "Quadríceps",
            sets: 4,
            reps: "8-12",
            method: "Pirâmide Crescente",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        },
        {
            id: 2,
            name: "Leg Press",
            muscleGroup: "Quadríceps",
            sets: 3,
            reps: "10-15",
            method: "Convencional",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        },
        {
            id: 3,
            name: "Cadeira Extensora",
            muscleGroup: "Quadríceps",
            sets: 3,
            reps: "12-15",
            method: "Drop-set",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        },
        {
            id: 4,
            name: "Afundo",
            muscleGroup: "Quadríceps",
            sets: 3,
            reps: "10-12",
            method: "Convencional",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        },
        {
            id: 5,
            name: "Panturrilha em Pé",
            muscleGroup: "Panturrilha",
            sets: 4,
            reps: "15-20",
            method: "Pico de contração",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        }
    ],
    4: [
        {
            id: 1,
            name: "Supino Inclinado",
            muscleGroup: "Peito",
            sets: 3,
            reps: "10-12",
            method: "Convencional",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        },
        {
            id: 2,
            name: "Remada Unilateral",
            muscleGroup: "Costas",
            sets: 3,
            reps: "10-12",
            method: "Convencional",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        },
        {
            id: 3,
            name: "Desenvolvimento",
            muscleGroup: "Ombros",
            sets: 3,
            reps: "10-12",
            method: "Convencional",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        },
        {
            id: 4,
            name: "Rosca Direta",
            muscleGroup: "Bíceps",
            sets: 3,
            reps: "10-12",
            method: "Bi-set",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        },
        {
            id: 5,
            name: "Tríceps Pulley",
            muscleGroup: "Tríceps",
            sets: 3,
            reps: "12-15",
            method: "Bi-set",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        }
    ],
    5: [
        {
            id: 1,
            name: "Stiff",
            muscleGroup: "Posteriores",
            sets: 4,
            reps: "8-12",
            method: "Convencional",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        },
        {
            id: 2,
            name: "Mesa Flexora",
            muscleGroup: "Posteriores",
            sets: 3,
            reps: "10-12",
            method: "Negativa",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        },
        {
            id: 3,
            name: "Cadeira Flexora",
            muscleGroup: "Posteriores",
            sets: 3,
            reps: "12-15",
            method: "Drop-set",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        },
        {
            id: 4,
            name: "Hip Thrust",
            muscleGroup: "Glúteos",
            sets: 4,
            reps: "10-12",
            method: "Pico de contração",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        },
        {
            id: 5,
            name: "Panturrilha Sentado",
            muscleGroup: "Panturrilha",
            sets: 3,
            reps: "15-20",
            method: "Pico de contração",
            completed: false,
            weight: "",
            actualReps: "",
            notes: ""
        }
    ]
};

export function WorkoutSession({
                                   workoutId,
                                   workoutName,
                                   onBack,
                                   workout,
                                   selectedWorkout
                               }) {
    const [exercises, setExercises] = useState([]);
    const [startTime] = useState(new Date());
    const [showCompletionMessage, setShowCompletionMessage] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [showRestTimer, setShowRestTimer] = useState(false);
    const [showCalculator, setShowCalculator] = useState(false);
    const [calculatorExercise, setCalculatorExercise] = useState("");
    const [focusMode, setFocusMode] = useState(false);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [newAchievements, setNewAchievements] = useState([]);

    const workoutData = workout || selectedWorkout || null;

    const title =
        workoutName ||
        workoutData?.name ||
        (workoutId ? `Treino ${workoutId}` : "Treino");

    // Inicialização dos exercícios
    useEffect(() => {
        let baseExercises = [];

        // prioridade para treino vindo do Firebase via props
        if (
            workoutData &&
            Array.isArray(workoutData.exercises) &&
            workoutData.exercises.length > 0
        ) {
            baseExercises = workoutData.exercises.map((ex, index) => ({
                id: ex.id || index + 1,
                name: ex.name || ex.exerciseName || "Exercício",
                muscleGroup: ex.muscleGroup || ex.group || ex.muscle || "Grupo muscular",
                sets: ex.sets || ex.series || 3,
                reps: ex.reps || ex.targetReps || "8-12",
                method: ex.method || "Convencional",
                completed: false,
                weight: "",
                actualReps: "",
                notes: ""
            }));
        } else if (workoutId && workoutExercises[workoutId]) {
            // fallback para os treinos fixos 1 a 5
            baseExercises = workoutExercises[workoutId].map((ex) => ({ ...ex }));
        } else {
            baseExercises = [];
        }

        const exercisesWithSuggestions = baseExercises.map((ex) => {
            const lastPerformance = getLastExercisePerformance(ex.name);
            const suggestedWeight = suggestWeight(ex.name);

            return {
                ...ex,
                weight: suggestedWeight ? suggestedWeight.toFixed(1) : ex.weight || "",
                lastPerformance: lastPerformance || null
            };
        });

        setExercises(exercisesWithSuggestions);
    }, [workoutId, workoutData]);

    const toggleComplete = (id) => {
        const exerciseIndex = exercises.findIndex((ex) => ex.id === id);
        const wasCompleted = exerciseIndex >= 0 ? exercises[exerciseIndex].completed : false;

        setExercises((prev) =>
            prev.map((ex) =>
                ex.id === id ? { ...ex, completed: !ex.completed } : ex
            )
        );

        if (!wasCompleted) {
            if ("vibrate" in navigator) {
                navigator.vibrate(50);
            }

            if (focusMode && exerciseIndex < exercises.length - 1) {
                setTimeout(() => setCurrentExerciseIndex(exerciseIndex + 1), 1000);
            }
        }
    };

    const updateExercise = (id, field, value) => {
        setExercises((prev) =>
            prev.map((ex) =>
                ex.id === id ? { ...ex, [field]: value } : ex
            )
        );
    };

    const incrementWeight = (id) => {
        setExercises((prev) =>
            prev.map((ex) => {
                if (ex.id === id) {
                    const currentWeight = parseFloat(ex.weight) || 0;
                    return { ...ex, weight: (currentWeight + 0.5).toFixed(1) };
                }
                return ex;
            })
        );
    };

    const decrementWeight = (id) => {
        setExercises((prev) =>
            prev.map((ex) => {
                if (ex.id === id) {
                    const currentWeight = parseFloat(ex.weight) || 0;
                    return {
                        ...ex,
                        weight: Math.max(0, currentWeight - 0.5).toFixed(1)
                    };
                }
                return ex;
            })
        );
    };

    const incrementReps = (id) => {
        setExercises((prev) =>
            prev.map((ex) => {
                if (ex.id === id) {
                    const currentReps = parseInt(ex.actualReps, 10) || 0;
                    return { ...ex, actualReps: String(currentReps + 1) };
                }
                return ex;
            })
        );
    };

    const decrementReps = (id) => {
        setExercises((prev) =>
            prev.map((ex) => {
                if (ex.id === id) {
                    const currentReps = parseInt(ex.actualReps, 10) || 0;
                    return {
                        ...ex,
                        actualReps: String(Math.max(0, currentReps - 1))
                    };
                }
                return ex;
            })
        );
    };

    const handleFinishWorkout = () => {
        const completedCount = exercises.filter((ex) => ex.completed).length;

        if (completedCount === 0) {
            window.alert(
                "Complete pelo menos um exercício antes de finalizar o treino"
            );
            return;
        }

        const duration = Math.floor(
            (new Date().getTime() - startTime.getTime()) / 60000
        );

        const historyPayload = {
            id: `workout_${Date.now()}`,
            workoutId,
            workoutName: title,
            date: new Date().toISOString(),
            duration,
            exercises: exercises.map((ex) => ({
                name: ex.name,
                muscleGroup: ex.muscleGroup,
                sets: ex.sets,
                reps: ex.reps,
                method: ex.method,
                weight: ex.weight,
                actualReps: ex.actualReps,
                notes: ex.notes
            }))
        };

        const oldStats = getUserStats();
        const oldAchievements = oldStats.achievements || [];

        saveWorkoutHistory(historyPayload);

        const newStats = getUserStats();
        const newUnlocked = (newStats.achievements || []).filter(
            (ach) =>
                ach.isUnlocked &&
                !oldAchievements.find(
                    (old) => old.id === ach.id && old.isUnlocked
                )
        );

        if (newUnlocked.length > 0) {
            setNewAchievements(newUnlocked);
        }

        setShowCompletionMessage(true);
        setTimeout(() => {
            onBack();
        }, 3000);
    };

    const completedCount = exercises.filter((ex) => ex.completed).length;
    const totalCount = exercises.length || 1;
    const progressPercent = (completedCount / totalCount) * 100;
    const displayExercises = focusMode
        ? [exercises[currentExerciseIndex]].filter(Boolean)
        : exercises;

    if (showCompletionMessage) {
        return (
            <div className="app-shell">
                <div className="app-inner">
                    {newAchievements.map((ach) => (
                        <AchievementNotification
                            key={ach.id}
                            achievement={ach}
                            onClose={() =>
                                setNewAchievements((prev) =>
                                    prev.filter((a) => a.id !== ach.id)
                                )
                            }
                        />
                    ))}

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            minHeight: "60vh",
                            textAlign: "center",
                            gap: "20px"
                        }}
                    >
                        <div
                            style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                                background:
                                    "radial-gradient(circle at top left, var(--accent) 0, var(--accent-strong) 42%, var(--accent-deep) 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 20px 60px rgba(37, 99, 235, 0.8)",
                                animation: "pulse 1.5s ease-in-out infinite"
                            }}
                        >
                            <CheckCircle2 size={48} color="white" />
                        </div>
                        <div>
                            <h2
                                style={{
                                    fontSize: "1.8rem",
                                    marginBottom: "8px",
                                    color: "#f9fafb"
                                }}
                            >
                                Treino concluído
                            </h2>
                            <p
                                style={{
                                    fontSize: "1rem",
                                    color: "var(--text-secondary)"
                                }}
                            >
                                {completedCount} exercícios completados
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="app-shell">
            <div className="app-inner">
                {newAchievements.map((ach) => (
                    <AchievementNotification
                        key={ach.id}
                        achievement={ach}
                        onClose={() =>
                            setNewAchievements((prev) =>
                                prev.filter((a) => a.id !== ach.id)
                            )
                        }
                    />
                ))}

                {selectedMethod && (
                    <MethodModal
                        method={selectedMethod}
                        onClose={() => setSelectedMethod(null)}
                    />
                )}

                {showRestTimer && (
                    <RestTimer onClose={() => setShowRestTimer(false)} />
                )}

                {showCalculator && (
                    <OneRMCalculator
                        exerciseName={calculatorExercise}
                        onClose={() => {
                            setShowCalculator(false);
                            setCalculatorExercise("");
                        }}
                    />
                )}

                <div className="workout-session">
                    {/* Header com controles */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "16px",
                            gap: "12px",
                            flexWrap: "wrap"
                        }}
                    >
                        <button className="btn-back-primary" onClick={onBack}>
                            <ArrowLeft size={16} />
                            Voltar
                        </button>

                        <div
                            style={{
                                display: "flex",
                                gap: "8px",
                                flexWrap: "wrap"
                            }}
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    setShowRestTimer(true);
                                }}
                                style={{
                                    padding: "8px 14px",
                                    borderRadius: "8px",
                                    border: "1px solid rgba(148, 163, 184, 0.4)",
                                    background: "rgba(15, 23, 42, 0.8)",
                                    color: "var(--text-secondary)",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    fontSize: "0.85rem",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                <Timer size={16} />
                                Timer
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowCalculator(true)}
                                style={{
                                    padding: "8px 14px",
                                    borderRadius: "8px",
                                    border: "1px solid rgba(148, 163, 184, 0.4)",
                                    background: "rgba(15, 23, 42, 0.8)",
                                    color: "var(--text-secondary)",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    fontSize: "0.85rem",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                <Calculator size={16} />
                                1RM
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    const nextFocus = !focusMode;
                                    setFocusMode(nextFocus);
                                    if (nextFocus) {
                                        const firstIncomplete = exercises.findIndex(
                                            (ex) => !ex.completed
                                        );
                                        setCurrentExerciseIndex(
                                            firstIncomplete >= 0 ? firstIncomplete : 0
                                        );
                                    }
                                }}
                                style={{
                                    padding: "8px 14px",
                                    borderRadius: "8px",
                                    border: focusMode
                                        ? "1px solid rgba(56, 189, 248, 0.5)"
                                        : "1px solid rgba(148, 163, 184, 0.4)",
                                    background: focusMode
                                        ? "radial-gradient(circle at top left, rgba(59, 130, 246, 0.2), transparent 60%), rgba(15, 23, 42, 0.8)"
                                        : "rgba(15, 23, 42, 0.8)",
                                    color: focusMode
                                        ? "var(--accent)"
                                        : "var(--text-secondary)",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    fontSize: "0.85rem",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                {focusMode ? <Eye size={16} /> : <EyeOff size={16} />}
                                Foco
                            </button>
                        </div>
                    </div>

                    <h2>{title}</h2>

                    {/* Modo foco */}
                    {focusMode && (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "12px",
                                marginBottom: "16px",
                                borderRadius: "12px",
                                background: "rgba(15, 23, 42, 0.6)",
                                border: "1px solid rgba(30, 41, 59, 0.8)"
                            }}
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setCurrentExerciseIndex((prev) => Math.max(0, prev - 1))
                                }
                                disabled={currentExerciseIndex === 0}
                                style={{
                                    padding: "6px 12px",
                                    borderRadius: "8px",
                                    border: "1px solid rgba(148, 163, 184, 0.4)",
                                    background:
                                        currentExerciseIndex === 0
                                            ? "rgba(15, 23, 42, 0.4)"
                                            : "rgba(15, 23, 42, 0.8)",
                                    color:
                                        currentExerciseIndex === 0
                                            ? "var(--text-muted)"
                                            : "var(--text-secondary)",
                                    cursor:
                                        currentExerciseIndex === 0 ? "not-allowed" : "pointer",
                                    fontSize: "0.85rem"
                                }}
                            >
                                ← Anterior
                            </button>

                            <span
                                style={{
                                    fontSize: "0.85rem",
                                    color: "var(--text-secondary)"
                                }}
                            >
                {currentExerciseIndex + 1} de {totalCount}
              </span>

                            <button
                                type="button"
                                onClick={() =>
                                    setCurrentExerciseIndex((prev) =>
                                        Math.min(exercises.length - 1, prev + 1)
                                    )
                                }
                                disabled={currentExerciseIndex === exercises.length - 1}
                                style={{
                                    padding: "6px 12px",
                                    borderRadius: "8px",
                                    border: "1px solid rgba(148, 163, 184, 0.4)",
                                    background:
                                        currentExerciseIndex === exercises.length - 1
                                            ? "rgba(15, 23, 42, 0.4)"
                                            : "rgba(15, 23, 42, 0.8)",
                                    color:
                                        currentExerciseIndex === exercises.length - 1
                                            ? "var(--text-muted)"
                                            : "var(--text-secondary)",
                                    cursor:
                                        currentExerciseIndex === exercises.length - 1
                                            ? "not-allowed"
                                            : "pointer",
                                    fontSize: "0.85rem"
                                }}
                            >
                                Próximo →
                            </button>
                        </div>
                    )}

                    {/* Progresso */}
                    <div style={{ marginBottom: "24px" }}>
                        <div
                            style={{
                                padding: "16px 20px",
                                borderRadius: "14px",
                                border: "0.75px solid rgba(15, 23, 42, 0.9)",
                                background:
                                    "radial-gradient(circle at top left, rgba(59, 130, 246, 0.15), transparent 60%), rgba(15, 23, 42, 0.8)"
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    marginBottom: "8px"
                                }}
                            >
                                <CheckCircle2
                                    size={16}
                                    style={{ color: "var(--accent)" }}
                                />
                                <span
                                    style={{
                                        fontSize: "0.75rem",
                                        color: "var(--text-muted)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.1em"
                                    }}
                                >
                  Progresso do treino
                </span>
                            </div>
                            <div
                                style={{
                                    fontSize: "1.6rem",
                                    fontWeight: 700,
                                    color: "var(--text-primary)",
                                    marginBottom: "10px"
                                }}
                            >
                                {completedCount} de {totalCount} exercícios
                            </div>
                            <div
                                style={{
                                    width: "100%",
                                    height: "6px",
                                    borderRadius: "999px",
                                    background: "rgba(148, 163, 184, 0.2)",
                                    overflow: "hidden"
                                }}
                            >
                                <div
                                    style={{
                                        width: `${progressPercent}%`,
                                        height: "100%",
                                        background:
                                            "radial-gradient(circle at left, var(--accent) 0, var(--accent-strong) 100%)",
                                        transition: "width 0.3s ease",
                                        boxShadow:
                                            progressPercent > 0
                                                ? "0 0 10px rgba(37, 99, 235, 0.5)"
                                                : "none"
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Lista de exercícios */}
                    <div className="session-exercises">
                        {displayExercises.map((exercise) => (
                            <div
                                key={exercise.id}
                                className={`session-exercise-item ${
                                    exercise.completed ? "completed" : ""
                                }`}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "12px"
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "12px"
                                    }}
                                >
                                    <div className="exercise-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={exercise.completed}
                                            onChange={() => toggleComplete(exercise.id)}
                                        />
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <div className="exercise-info">
                                            <div className="exercise-group">
                                                {exercise.muscleGroup}
                                            </div>
                                            <div className="exercise-name-row">
                                                <div className="exercise-name">
                                                    {exercise.name}
                                                </div>
                                            </div>
                                            <div className="exercise-target">
                                                {exercise.sets} séries × {exercise.reps} reps
                                            </div>

                                            {exercise.lastPerformance && (
                                                <div
                                                    style={{
                                                        marginTop: "6px",
                                                        padding: "4px 10px",
                                                        borderRadius: "6px",
                                                        background: "rgba(16, 185, 129, 0.1)",
                                                        border:
                                                            "1px solid rgba(16, 185, 129, 0.2)",
                                                        fontSize: "0.75rem",
                                                        color: "#10b981",
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: "4px"
                                                    }}
                                                >
                                                    <TrendingUp size={12} />
                                                    Última vez: {exercise.lastPerformance.weight}
                                                    kg × {exercise.lastPerformance.actualReps} reps
                                                </div>
                                            )}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedMethod(exercise.method)
                                                }
                                                style={{
                                                    marginTop: "6px",
                                                    padding: "4px 12px",
                                                    borderRadius: "999px",
                                                    border:
                                                        "1px solid rgba(56, 189, 248, 0.5)",
                                                    background:
                                                        "radial-gradient(circle at top left, rgba(59, 130, 246, 0.2), transparent 60%), rgba(15, 23, 42, 0.8)",
                                                    color: "var(--accent)",
                                                    fontSize: "0.75rem",
                                                    cursor: "pointer",
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: "4px",
                                                    transition: "all 0.2s ease",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.08em",
                                                    marginLeft: "8px"
                                                }}
                                            >
                                                <Info size={12} />
                                                {exercise.method}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "repeat(auto-fit, minmax(140px, 1fr))",
                                        gap: "12px"
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "6px"
                                        }}
                                    >
                                        <label
                                            style={{
                                                fontSize: "0.75rem",
                                                color: "var(--text-secondary)",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "4px"
                                            }}
                                        >
                                            Peso (kg)
                                            {suggestWeight(exercise.name) && (
                                                <span
                                                    style={{
                                                        color: "var(--accent)",
                                                        fontSize: "0.7rem",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "2px"
                                                    }}
                                                >
                          <Sparkles size={10} />
                          sugerido
                        </span>
                                            )}
                                        </label>
                                        <div className="exercise-input-row">
                                            <button
                                                className="btn-adjust"
                                                type="button"
                                                onClick={() => decrementWeight(exercise.id)}
                                            >
                                                −
                                            </button>
                                            <input
                                                type="number"
                                                value={exercise.weight}
                                                onChange={(e) =>
                                                    updateExercise(
                                                        exercise.id,
                                                        "weight",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="0"
                                                className="exercise-number-input"
                                                style={{ width: "60px" }}
                                                step="0.5"
                                            />
                                            <button
                                                className="btn-adjust"
                                                type="button"
                                                onClick={() => incrementWeight(exercise.id)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "6px"
                                        }}
                                    >
                                        <label
                                            style={{
                                                fontSize: "0.75rem",
                                                color: "var(--text-secondary)"
                                            }}
                                        >
                                            Repetições
                                        </label>
                                        <div className="exercise-input-row">
                                            <button
                                                className="btn-adjust"
                                                type="button"
                                                onClick={() => decrementReps(exercise.id)}
                                            >
                                                −
                                            </button>
                                            <input
                                                type="number"
                                                value={exercise.actualReps}
                                                onChange={(e) =>
                                                    updateExercise(
                                                        exercise.id,
                                                        "actualReps",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="0"
                                                className="exercise-number-input"
                                                style={{ width: "60px" }}
                                            />
                                            <button
                                                className="btn-adjust"
                                                type="button"
                                                onClick={() => incrementReps(exercise.id)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {exercise.weight && exercise.actualReps && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCalculatorExercise(exercise.name);
                                            setShowCalculator(true);
                                        }}
                                        style={{
                                            padding: "8px 12px",
                                            borderRadius: "8px",
                                            border:
                                                "1px solid rgba(148, 163, 184, 0.4)",
                                            background: "rgba(15, 23, 42, 0.6)",
                                            color: "var(--text-secondary)",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "6px",
                                            fontSize: "0.8rem",
                                            transition: "all 0.2s ease"
                                        }}
                                    >
                                        <Calculator size={14} />
                                        Calcular 1RM para este exercício
                                    </button>
                                )}

                                <label
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "6px",
                                        fontSize: "0.75rem",
                                        color: "var(--text-secondary)"
                                    }}
                                >
                                    Observações (opcional)
                                    <textarea
                                        value={exercise.notes}
                                        onChange={(e) =>
                                            updateExercise(
                                                exercise.id,
                                                "notes",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Ex: Senti bem, pode aumentar peso"
                                        className="exercise-note-input"
                                        rows={2}
                                    />
                                </label>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={handleFinishWorkout}
                        className="btn-save-session"
                        style={{ width: "100%" }}
                    >
                        <CheckCircle2 size={18} />
                        Finalizar treino
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WorkoutSession;