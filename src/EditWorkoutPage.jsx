import React, { useEffect, useMemo, useState } from "react";
import { db } from "./firebaseConfig";
import {
    collection,
    addDoc,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
} from "firebase/firestore";
import ExercisePicker from "./ExercisePicker";

function makeId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
    return String(Date.now());
}

function normalizeExercise(ex) {
    const id = ex?.id || makeId();
    const name = String(ex?.name || "").trim();
    const target = String(ex?.target || "").trim();
    const minReps = ex?.minReps ?? null;
    const maxReps = ex?.maxReps ?? null;
    const method = String(ex?.method || "Convencional").trim() || "Convencional";

    return { id, name, target, minReps, maxReps, method };
}

export default function EditWorkoutPage({ user, workoutId, onBack }) {
    const [name, setName] = useState("");
    const [exercises, setExercises] = useState([]);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [error, setError] = useState("");

    const [originCollection, setOriginCollection] = useState("user_workout_templates");

    const isNewWorkout = !workoutId;

    const canDelete = useMemo(() => {
        return Boolean(workoutId) && originCollection === "user_workout_templates";
    }, [workoutId, originCollection]);

    useEffect(() => {
        async function loadWorkout() {
            if (!user || !workoutId) return;

            setLoadingInitial(true);
            setError("");

            try {
                let resolved = "user_workout_templates";
                let ref = doc(db, resolved, workoutId);
                let snap = await getDoc(ref);

                if (!snap.exists()) {
                    resolved = "workout_templates";
                    ref = doc(db, resolved, workoutId);
                    snap = await getDoc(ref);

                    if (!snap.exists()) {
                        setError("Este treino não foi encontrado.");
                        return;
                    }
                }

                const data = snap.data() || {};

                if (data.userId && data.userId !== user.uid) {
                    setError("Você não tem acesso a este treino.");
                    return;
                }

                setOriginCollection(resolved);
                setName(String(data.name || "").trim());

                const loaded = Array.isArray(data.exercises) ? data.exercises : [];
                setExercises(loaded.map((ex) => normalizeExercise(ex)));
            } catch (e) {
                console.error(e);
                setError("Não foi possível carregar este treino.");
            } finally {
                setLoadingInitial(false);
            }
        }

        loadWorkout();
    }, [user, workoutId]);

    function handleAddExercise() {
        setExercises((prev) => [
            ...prev,
            normalizeExercise({
                id: makeId(),
                name: "",
                target: "",
                minReps: null,
                maxReps: null,
                method: "Convencional",
            }),
        ]);
    }

    function handleRemoveExercise(exId) {
        setExercises((prev) => prev.filter((ex) => ex.id !== exId));
    }

    function updateExercise(exId, field, value) {
        setExercises((prev) =>
            prev.map((ex) => {
                if (ex.id !== exId) return ex;
                return normalizeExercise({ ...ex, [field]: value });
            })
        );
    }

    function validateBeforeSave() {
        const trimmedName = name.trim();
        if (!trimmedName) return "Dê um nome para o treino.";

        if (!exercises.length) return "Adicione pelo menos um exercício.";

        const invalidIndex = exercises.findIndex((ex) => !String(ex?.name || "").trim());
        if (invalidIndex >= 0) {
            const pos = invalidIndex + 1;
            return `Preencha o nome do exercício na posição ${pos}.`;
        }

        return "";
    }

    async function handleSave() {
        if (!user) return;

        const validation = validateBeforeSave();
        if (validation) {
            setError(validation);
            return;
        }

        setError("");
        setSaving(true);

        try {
            const trimmedName = name.trim();
            const normalizedExercises = exercises.map((ex) => normalizeExercise(ex));

            if (workoutId && originCollection === "user_workout_templates") {
                const ref = doc(db, "user_workout_templates", workoutId);
                await updateDoc(ref, {
                    name: trimmedName,
                    exercises: normalizedExercises,
                    updatedAt: serverTimestamp(),
                });
                onBack?.();
                return;
            }

            const payload = {
                userId: user.uid,
                name: trimmedName,
                exercises: normalizedExercises,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            if (workoutId && originCollection === "workout_templates") {
                payload.originTemplateId = workoutId;
            }

            await addDoc(collection(db, "user_workout_templates"), payload);
            onBack?.();
        } catch (e) {
            console.error(e);
            setError("Não foi possível salvar o treino personalizado.");
        } finally {
            setSaving(false);
        }
    }

    async function handleDeleteWorkout() {
        if (!user || !workoutId) return;

        if (originCollection !== "user_workout_templates") {
            setError("Este treino é um template, crie uma cópia para poder editar e apagar.");
            return;
        }

        const confirmDelete = window.confirm(
            "Tem certeza de que deseja apagar este treino? Esta ação não pode ser desfeita."
        );
        if (!confirmDelete) return;

        setError("");
        setDeleting(true);

        try {
            const ref = doc(db, "user_workout_templates", workoutId);
            const snap = await getDoc(ref);

            if (!snap.exists()) {
                setError("Este treino já foi apagado ou não existe mais.");
                return;
            }

            const data = snap.data() || {};
            if (data.userId && data.userId !== user.uid) {
                setError("Você não tem permissão para apagar este treino.");
                return;
            }

            await deleteDoc(ref);
            onBack?.();
        } catch (e) {
            console.error(e);
            setError("Não foi possível apagar este treino.");
        } finally {
            setDeleting(false);
        }
    }

    return (
        <div className="methods-page">
            <button type="button" className="btn-back-primary" onClick={() => onBack?.()}>
                Voltar
            </button>

            <h2>{isNewWorkout ? "Meu treino personalizado" : "Editar treino"}</h2>

            {loadingInitial ? (
                <p style={{ marginTop: 12 }}>Carregando treino...</p>
            ) : (
                <>
                    <div style={{ marginTop: 12 }}>
                        <label className="edit-workout-field">
                            Nome do treino
                            <input
                                type="text"
                                className="edit-workout-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="edit-workout-exercises" style={{ marginTop: 16 }}>
                        {exercises.map((ex) => (
                            <div key={ex.id} className="method-card" style={{ marginBottom: 10 }}>
                                <ExercisePicker
                                    value={ex.name}
                                    onChange={(value) => updateExercise(ex.id, "name", value)}
                                />

                                <label className="edit-workout-field" style={{ marginTop: 8 }}>
                                    Alvo, por exemplo 4x8 10
                                    <input
                                        type="text"
                                        className="edit-workout-input"
                                        value={ex.target || ""}
                                        onChange={(e) => updateExercise(ex.id, "target", e.target.value)}
                                    />
                                </label>

                                <label className="edit-workout-field" style={{ marginTop: 8 }}>
                                    Método de treino
                                    <select
                                        className="edit-workout-input"
                                        value={ex.method || "Convencional"}
                                        onChange={(e) => updateExercise(ex.id, "method", e.target.value)}
                                    >
                                        <option value="Convencional">Convencional</option>
                                        <option value="Drop Set">Drop Set</option>
                                        <option value="Pirâmide Crescente">Pirâmide crescente</option>
                                        <option value="Pirâmide Decrescente">Pirâmide decrescente</option>
                                        <option value="Cluster Set">Cluster Set</option>
                                        <option value="Bi Set">Bi Set</option>
                                        <option value="Pico de contração">Pico de contração</option>
                                        <option value="Falha total">Falha total</option>
                                        <option value="Negativa">Negativa</option>
                                        <option value="Cardio 140 bpm">Cardio 140 bpm</option>
                                    </select>
                                </label>

                                <div style={{ marginTop: 8, textAlign: "right" }}>
                                    <button
                                        type="button"
                                        className="login-toggle-button"
                                        onClick={() => handleRemoveExercise(ex.id)}
                                        disabled={saving || deleting}
                                    >
                                        Remover exercício
                                    </button>
                                </div>
                            </div>
                        ))}

                        {exercises.length === 0 ? (
                            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                                Ainda não há exercícios neste treino. Adicione o primeiro exercício.
                            </p>
                        ) : null}
                    </div>

                    <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                        <button
                            type="button"
                            className="header-secondary-button"
                            onClick={handleAddExercise}
                            disabled={saving || deleting}
                        >
                            Adicionar exercício
                        </button>

                        <button
                            type="button"
                            className="header-history-button"
                            onClick={handleSave}
                            disabled={saving || deleting}
                        >
                            {saving ? "Salvando..." : isNewWorkout ? "Salvar treino" : "Salvar alterações"}
                        </button>

                        {canDelete ? (
                            <button
                                type="button"
                                className="login-toggle-button danger-button"
                                onClick={handleDeleteWorkout}
                                disabled={saving || deleting}
                                style={{ marginLeft: "auto" }}
                            >
                                {deleting ? "Apagando..." : "Apagar treino"}
                            </button>
                        ) : null}
                    </div>

                    {error ? (
                        <p className="login-error" style={{ marginTop: 8 }}>
                            {error}
                        </p>
                    ) : null}
                </>
            )}
        </div>
    );
}
