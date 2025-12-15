// src/OneRMCalculator.jsx
import React, { useState } from "react";
import { X, Calculator } from "lucide-react";

function OneRMCalculator({ exerciseName, onClose }) {
    const [weight, setWeight] = useState("");
    const [reps, setReps] = useState("");
    const [result, setResult] = useState(null);

    function handleCalculate(e) {
        e.preventDefault();

        const w = parseFloat(weight.replace(",", "."));
        const r = parseInt(reps, 10);

        if (!w || !r || r <= 0) {
            setResult(null);
            return;
        }

        // fórmula de Epley
        const oneRM = w * (1 + r / 30);
        setResult(oneRM);
    }

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
                    maxWidth: 380,
                    borderRadius: 20,
                    border: "1px solid rgba(15, 23, 42, 0.95)",
                    background:
                        "radial-gradient(circle at top left, rgba(59, 130, 246, 0.22), transparent 60%), #020617",
                    padding: 20,
                    boxShadow: "0 30px 80px rgba(0, 0, 0, 0.85)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 14,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                        }}
                    >
                        <span
                            style={{
                                fontSize: "0.75rem",
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                color: "var(--text-muted)",
                            }}
                        >
                            Calculadora 1RM
                        </span>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                fontSize: "0.9rem",
                                color: "#e5e7eb",
                            }}
                        >
                            <Calculator size={16} />
                            {exerciseName || "Exercício"}
                        </div>
                    </div>

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

                <form
                    onSubmit={handleCalculate}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                    }}
                >
                    <label
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 6,
                            fontSize: "0.8rem",
                            color: "var(--text-secondary)",
                        }}
                    >
                        Carga utilizada, em kg
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="Exemplo, 80"
                            style={{
                                borderRadius: 10,
                                border: "1px solid rgba(30, 64, 175, 0.6)",
                                background:
                                    "rgba(15, 23, 42, 0.95)",
                                color: "var(--text-primary)",
                                padding: "8px 10px",
                                fontSize: "0.9rem",
                                outline: "none",
                            }}
                            step="0.5"
                        />
                    </label>

                    <label
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 6,
                            fontSize: "0.8rem",
                            color: "var(--text-secondary)",
                        }}
                    >
                        Repetições realizadas
                        <input
                            type="number"
                            value={reps}
                            onChange={(e) => setReps(e.target.value)}
                            placeholder="Exemplo, 6"
                            style={{
                                borderRadius: 10,
                                border: "1px solid rgba(30, 64, 175, 0.6)",
                                background:
                                    "rgba(15, 23, 42, 0.95)",
                                color: "var(--text-primary)",
                                padding: "8px 10px",
                                fontSize: "0.9rem",
                                outline: "none",
                            }}
                        />
                    </label>

                    <button
                        type="submit"
                        className="btn-save-session"
                        style={{ width: "100%", marginTop: 6 }}
                    >
                        <Calculator size={16} />
                        Calcular 1RM estimado
                    </button>
                </form>

                {result && (
                    <div
                        style={{
                            marginTop: 14,
                            padding: "10px 12px",
                            borderRadius: 12,
                            border: "1px solid rgba(56, 189, 248, 0.8)",
                            background:
                                "radial-gradient(circle at top left, rgba(56, 189, 248, 0.18), transparent 60%), rgba(15, 23, 42, 0.96)",
                            fontSize: "0.85rem",
                            color: "var(--text-secondary)",
                        }}
                    >
                        Carga máxima estimada{" "}
                        <strong
                            style={{
                                color: "#e5f0ff",
                                fontSize: "1rem",
                            }}
                        >
                            {" "}
                            {result.toFixed(1)} kg
                        </strong>{" "}
                        para uma repetição.
                    </div>
                )}
            </div>
        </div>
    );
}

export default OneRMCalculator;