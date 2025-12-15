// src/RestTimer.jsx
import React, { useEffect, useState } from "react";
import { X, Play, Pause, RotateCcw } from "lucide-react";

function RestTimer({ onClose }) {
    const [seconds, setSeconds] = useState(60);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        if (!running) return;

        const interval = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    if ("vibrate" in navigator) {
                        navigator.vibrate(200);
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [running]);

    function handleStartPause() {
        if (seconds === 0) {
            setSeconds(60);
        }
        setRunning((prev) => !prev);
    }

    function handleReset() {
        setRunning(false);
        setSeconds(60);
    }

    const minutesDisplay = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secondsDisplay = String(seconds % 60).padStart(2, "0");

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(15, 23, 42, 0.86)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 40,
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 360,
                    borderRadius: 20,
                    border: "1px solid rgba(15, 23, 42, 0.95)",
                    background:
                        "radial-gradient(circle at top left, rgba(59, 130, 246, 0.2), transparent 60%), #020617",
                    padding: 20,
                    boxShadow: "0 30px 80px rgba(0, 0, 0, 0.85)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 16,
                    }}
                >
                    <span
                        style={{
                            fontSize: "0.8rem",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "var(--text-secondary)",
                        }}
                    >
                        Intervalo de descanso
                    </span>

                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            borderRadius: "999px",
                            border: "1px solid rgba(148, 163, 184, 0.4)",
                            background: "rgba(15, 23, 42, 0.9)",
                            width: 30,
                            height: 30,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                    >
                        <X size={16} />
                    </button>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 18,
                    }}
                >
                    <div
                        className="rest-timer"
                        style={{
                            fontSize: "2.8rem",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            color: "#f9fafb",
                        }}
                    >
                        {minutesDisplay}:{secondsDisplay}
                    </div>
                </div>

                <div
                    className="timer-controls"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 10,
                    }}
                >
                    <button
                        type="button"
                        onClick={handleStartPause}
                        style={{
                            borderRadius: "999px",
                            border:
                                "1px solid rgba(59, 130, 246, 0.9)",
                            background:
                                "radial-gradient(circle at top left, var(--accent) 0, var(--accent-strong) 40%, var(--accent-deep) 100%)",
                            color: "white",
                            padding: "8px 18px",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            boxShadow:
                                "0 12px 30px rgba(37, 99, 235, 0.85)",
                        }}
                    >
                        {running ? (
                            <>
                                <Pause size={16} />
                                Pausar
                            </>
                        ) : (
                            <>
                                <Play size={16} />
                                Iniciar
                            </>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        style={{
                            borderRadius: "999px",
                            border:
                                "1px solid rgba(148, 163, 184, 0.6)",
                            background: "rgba(15, 23, 42, 0.9)",
                            color: "var(--text-secondary)",
                            padding: "8px 14px",
                            fontSize: "0.8rem",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                        }}
                    >
                        <RotateCcw size={16} />
                        Resetar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RestTimer;