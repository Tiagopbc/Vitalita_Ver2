// src/WorkoutSession.jsx

import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import {
    doc,
    getDoc,
    addDoc,
    collection,
    serverTimestamp,
    query,
    orderBy,
    limit,
    getDocs,
    setDoc,
    deleteDoc
} from 'firebase/firestore';

const DRAFT_COLLECTION = 'workout_session_drafts';
const USER_ID = 'tiago';

function WorkoutSession({ workoutId, onBack, onOpenMethod, userProfileId }) {
    const [template, setTemplate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [weights, setWeights] = useState({});
    const [notes, setNotes] = useState({});
    const [saving, setSaving] = useState(false);
    const [checkedExercises, setCheckedExercises] = useState({});
    const [progressionSuggestions, setProgressionSuggestions] = useState({});

    const profileId = userProfileId || 'Tiago';

    // carrega template, rascunho e últimas sessões para cálculo de sugestão
    useEffect(() => {
        async function fetchWorkoutData() {
            setLoading(true);

            try {
                // template do treino
                const templateRef = doc(db, 'workout_templates', workoutId);
                const templateSnap = await getDoc(templateRef);

                if (!templateSnap.exists()) {
                    console.error('Template não encontrado');
                    setLoading(false);
                    return;
                }

                const templateData = templateSnap.data();
                setTemplate(templateData);

                const newWeights = {};
                const newNotes = {};
                const newChecked = {};

                // rascunho da sessão em andamento
                const draftRef = doc(
                    db,
                    DRAFT_COLLECTION,
                    `${profileId}_${workoutId}`
                );
                const draftSnap = await getDoc(draftRef);
                const draftData = draftSnap.exists() ? draftSnap.data() : null;
                const draftWeights = draftData?.weights || {};
                const draftNotes = draftData?.notes || {};
                const draftChecked = draftData?.checkedExercises || {};

                // busca últimos treinos no banco
                // usa orderBy + limit e filtra em memória por templateId e userId
                const sessionsQuery = query(
                    collection(db, 'workout_sessions'),
                    orderBy('completedAt', 'desc'),
                    limit(20)
                );
                const sessionsSnap = await getDocs(sessionsQuery);

                let recentSessions = sessionsSnap.docs
                    .map((d) => d.data())
                    .filter(
                        (s) =>
                            s.templateId === workoutId &&
                            s.userId === USER_ID
                    );

                let lastSessionResults = {};
                if (recentSessions.length > 0) {
                    const last = recentSessions[0];
                    lastSessionResults = last.results || {};
                }

                // preenche pesos, observações e checks
                // prioridade do valor
                // 1 rascunho atual
                // 2 última sessão concluída
                // 3 vazio
                templateData.exercises.forEach((ex) => {
                    const lastForExercise = lastSessionResults[ex.name];

                    newWeights[ex.name] =
                        draftWeights[ex.name] ??
                        (lastForExercise ? lastForExercise.weight : '') ??
                        '';
                    newNotes[ex.name] = draftNotes[ex.name] ?? '';
                    newChecked[ex.name] = draftChecked[ex.name] ?? false;
                });

                setWeights(newWeights);
                setNotes(newNotes);
                setCheckedExercises(newChecked);

                // calcula sugestões de progressão simples
                const progression = {};

                if (recentSessions.length >= 2) {
                    templateData.exercises.forEach((ex) => {
                        const historyWeights = recentSessions
                            .map((session) => {
                                const results = session.results || {};
                                const entry = results[ex.name];
                                if (!entry) {
                                    return null;
                                }
                                const w =
                                    typeof entry.weight === 'number'
                                        ? entry.weight
                                        : Number(entry.weight);
                                if (!w || Number.isNaN(w) || w <= 0) {
                                    return null;
                                }
                                return w;
                            })
                            .filter((w) => w !== null);

                        if (historyWeights.length >= 2) {
                            const lastW = historyWeights[0];
                            const prevW = historyWeights[1];

                            if (lastW === prevW) {
                                const increment = lastW < 40 ? 2.5 : 5;
                                progression[ex.name] = lastW + increment;
                            }
                        }
                    });
                }

                setProgressionSuggestions(progression);
            } catch (error) {
                console.error('Erro ao carregar treino', error);
            } finally {
                setLoading(false);
            }
        }

        fetchWorkoutData();
    }, [workoutId, profileId]);

    // salvamento parcial em nuvem enquanto o usuário edita
    useEffect(() => {
        if (!template) {
            return;
        }

        const hasAnyData =
            Object.values(weights).some((w) => w && w !== '') ||
            Object.values(notes).some((n) => n && n.trim() !== '') ||
            Object.values(checkedExercises).some((c) => !!c);

        if (!hasAnyData) {
            return;
        }

        const persistDraft = async () => {
            try {
                const draftRef = doc(
                    db,
                    DRAFT_COLLECTION,
                    `${profileId}_${workoutId}`
                );

                await setDoc(
                    draftRef,
                    {
                        userId: USER_ID,
                        profileId,
                        templateId: workoutId,
                        templateName: template.name,
                        weights,
                        notes,
                        checkedExercises,
                        updatedAt: serverTimestamp()
                    },
                    { merge: true }
                );
            } catch (error) {
                console.error('Erro ao salvar rascunho da sessão', error);
            }
        };

        persistDraft();
    }, [weights, notes, checkedExercises, template, workoutId, profileId]);

    const handleWeightChange = (exerciseName, weight) => {
        setWeights((prev) => ({
            ...prev,
            [exerciseName]: weight
        }));
    };

    const handleNoteChange = (exerciseName, value) => {
        setNotes((prev) => ({
            ...prev,
            [exerciseName]: value
        }));
    };

    const handleCheckToggle = (exerciseName) => {
        setCheckedExercises((prev) => ({
            ...prev,
            [exerciseName]: !prev[exerciseName]
        }));
    };

    const handleApplySuggestion = (exerciseName, suggestedWeight) => {
        setWeights((prev) => ({
            ...prev,
            [exerciseName]: String(suggestedWeight)
        }));
    };

    const handleSaveSession = async () => {
        if (!template) {
            return;
        }

        setSaving(true);

        const sessionResults = {};
        template.exercises.forEach((ex) => {
            sessionResults[ex.name] = {
                weight: Number(weights[ex.name]) || 0,
                target: ex.target,
                note: notes[ex.name] || '',
                method: ex.method || '',
                completed: !!checkedExercises[ex.name]
            };
        });

        try {
            await addDoc(collection(db, 'workout_sessions'), {
                templateId: workoutId,
                templateName: template.name,
                userId: USER_ID,
                createdAt: serverTimestamp(),
                completedAt: serverTimestamp(),
                results: sessionResults
            });

            const userProfileRef = doc(db, 'user_profile', profileId);
            await setDoc(
                userProfileRef,
                {
                    lastWorkoutId: workoutId
                },
                { merge: true }
            );

            try {
                const draftRef = doc(
                    db,
                    DRAFT_COLLECTION,
                    `${profileId}_${workoutId}`
                );
                await deleteDoc(draftRef);
            } catch (error) {
                console.error('Erro ao apagar rascunho da sessão', error);
            }

            alert('Treino salvo com sucesso');
            onBack();
        } catch (error) {
            console.error('Erro ao salvar sessão', error);
            alert('Erro ao salvar treino');
        } finally {
            setSaving(false);
        }
    };

    const handleOpenMethodClick = (methodName) => {
        if (!methodName) {
            return;
        }
        if (onOpenMethod) {
            onOpenMethod(methodName);
        }
    };

    if (loading || !template) {
        return (
            <div className="workout-session">
                <button
                    type="button"
                    className="btn-back-primary"
                    onClick={onBack}
                >
                    Voltar
                </button>
                <p>Carregando sessão de treino...</p>
            </div>
        );
    }

    return (
        <div className="workout-session">
            <button
                type="button"
                className="btn-back-primary"
                onClick={onBack}
            >
                Voltar
            </button>

            <h2>{template.name}</h2>

            <div className="session-exercises">
                {template.exercises.map((ex) => {
                    const completed = checkedExercises[ex.name];
                    const suggestion = progressionSuggestions[ex.name];
                    const currentWeight = Number(weights[ex.name]) || 0;
                    const shouldShowSuggestion =
                        suggestion && suggestion > currentWeight;

                    return (
                        <div
                            key={ex.name}
                            className={
                                'session-exercise-item' +
                                (completed ? ' completed' : '')
                            }
                        >
                            <div className="exercise-checkbox">
                                <input
                                    id={`chk-${ex.name}`}
                                    type="checkbox"
                                    checked={!!checkedExercises[ex.name]}
                                    onChange={() =>
                                        handleCheckToggle(ex.name)
                                    }
                                />
                                <label htmlFor={`chk-${ex.name}`} />
                            </div>

                            <div className="exercise-info">
                                <span className="exercise-group">
                                    {ex.group}
                                </span>
                                <span className="exercise-name">
                                    {ex.name}
                                </span>
                                <span className="exercise-target">
                                    Série: {ex.target}
                                    {ex.method ? ` (${ex.method})` : ''}
                                </span>

                                {ex.method && (
                                    <button
                                        type="button"
                                        className="exercise-method-button"
                                        onClick={() =>
                                            handleOpenMethodClick(ex.method)
                                        }
                                    >
                                        Ver método →
                                    </button>
                                )}
                            </div>

                            <div className="exercise-input">
                                <div>
                                    <label>
                                        Peso (kg)
                                        <input
                                            className="exercise-weight-input"
                                            type="number"
                                            inputMode="decimal"
                                            value={weights[ex.name] || ''}
                                            onChange={(e) =>
                                                handleWeightChange(
                                                    ex.name,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </label>
                                </div>

                                <div className="exercise-note-wrapper">
                                    <label>
                                        Observações
                                        <input
                                            className="exercise-note-input"
                                            type="text"
                                            value={notes[ex.name] || ''}
                                            onChange={(e) =>
                                                handleNoteChange(
                                                    ex.name,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </label>
                                </div>
                            </div>

                            {shouldShowSuggestion && (
                                <div className="exercise-suggestion">
                                    <span className="exercise-suggestion-text">
                                        Sugestão, aumentar para{' '}
                                        <strong>
                                            {suggestion} kg
                                        </strong>
                                    </span>
                                    <button
                                        type="button"
                                        className="exercise-suggestion-apply"
                                        onClick={() =>
                                            handleApplySuggestion(
                                                ex.name,
                                                suggestion
                                            )
                                        }
                                    >
                                        Aplicar
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <button
                type="button"
                className="btn-save-session"
                onClick={handleSaveSession}
                disabled={saving}
            >
                {saving ? 'Salvando...' : 'Salvar sessão'}
            </button>
        </div>
    );
}

export default WorkoutSession;
