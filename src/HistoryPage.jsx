// src/HistoryPage.jsx

import React, { useEffect, useMemo, useState } from 'react';
import { fetchWorkoutSessions } from './workoutStorage';

function HistoryPage({ onBack }) {
    const [loading, setLoading] = useState(true);
    const [exerciseHistory, setExerciseHistory] = useState({});
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState('todos');
    const [selectedExercise, setSelectedExercise] = useState('');

    useEffect(() => {
        async function loadHistory() {
            setLoading(true);

            try {
                const sessions = await fetchWorkoutSessions();

                const historyByExercise = {};
                const templateNames = new Set();

                sessions.forEach((session) => {
                    const data = session;
                    const templateName = data.templateName || 'Treino';
                    templateNames.add(templateName);

                    let completedAt = data.completedAt;
                    let completedDate;

                    if (
                        completedAt &&
                        typeof completedAt.toDate === 'function'
                    ) {
                        completedDate = completedAt.toDate();
                    } else if (data.createdAt) {
                        completedDate =
                            data.createdAt instanceof Date
                                ? data.createdAt
                                : new Date(data.createdAt);
                    } else {
                        completedDate = new Date();
                    }

                    const results = data.results || {};

                    Object.entries(results).forEach(
                        ([exerciseName, result]) => {
                            if (!historyByExercise[exerciseName]) {
                                historyByExercise[exerciseName] = [];
                            }

                            historyByExercise[exerciseName].push({
                                id: session.id,
                                date: completedDate,
                                templateName,
                                weight:
                                    typeof result.weight === 'number'
                                        ? result.weight
                                        : Number(result.weight) || 0,
                                reps:
                                    typeof result.reps === 'number'
                                        ? result.reps
                                        : Number(result.reps) || 0,
                                target: result.target || '',
                                minReps:
                                    typeof result.minReps === 'number'
                                        ? result.minReps
                                        : null,
                                maxReps:
                                    typeof result.maxReps === 'number'
                                        ? result.maxReps
                                        : null
                            });
                        }
                    );
                });

                Object.keys(historyByExercise).forEach((name) => {
                    historyByExercise[name].sort(
                        (a, b) => a.date - b.date
                    );
                });

                setExerciseHistory(historyByExercise);
                setTemplates([
                    'todos',
                    ...Array.from(templateNames).sort()
                ]);
            } catch (error) {
                console.error('Erro ao carregar histórico', error);
            } finally {
                setLoading(false);
            }
        }

        loadHistory();
    }, []);

    const allExerciseNames = useMemo(
        () =>
            Object.keys(exerciseHistory).sort((a, b) =>
                a.localeCompare(b)
            ),
        [exerciseHistory]
    );

    const filteredExercises = useMemo(() => {
        if (selectedTemplate === 'todos') {
            return allExerciseNames;
        }

        return allExerciseNames.filter((name) => {
            const entries = exerciseHistory[name] || [];
            return entries.some(
                (entry) => entry.templateName === selectedTemplate
            );
        });
    }, [exerciseHistory, allExerciseNames, selectedTemplate]);

    const currentExerciseEntries = useMemo(() => {
        if (!selectedExercise) {
            return [];
        }

        const base = exerciseHistory[selectedExercise] || [];

        if (selectedTemplate === 'todos') {
            return base;
        }
        return base.filter(
            (entry) => entry.templateName === selectedTemplate
        );
    }, [exerciseHistory, selectedExercise, selectedTemplate]);

    const formatDate = (date) => {
        if (!date) {
            return '';
        }
        const d = date instanceof Date ? date : new Date(date);
        return d.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        });
    };

    const formatWeight = (value) => {
        if (!value && value !== 0) {
            return '';
        }
        if (Number.isInteger(value)) {
            return `${value} kg`;
        }
        return `${value.toFixed(1)} kg`;
    };

    const formatReps = (value) => {
        if (!value && value !== 0) {
            return '';
        }
        return `${value}`;
    };

    if (loading) {
        return (
            <div className="history-page">
                <button
                    type="button"
                    className="btn-back-primary"
                    onClick={onBack}
                >
                    Voltar
                </button>
                <h2>Histórico de treinos</h2>
                <p className="history-intro">
                    Carregando histórico…
                </p>
            </div>
        );
    }

    const hasHistory =
        Object.keys(exerciseHistory).length > 0;

    return (
        <div className="history-page">
            <button
                type="button"
                className="btn-back-primary"
                onClick={onBack}
            >
                Voltar
            </button>
            <h2>Histórico de treinos</h2>

            {!hasHistory && (
                <p className="history-intro">
                    Nenhum treino encontrado ainda. Registre
                    algumas sessões para ver sua evolução aqui.
                </p>
            )}

            {hasHistory && (
                <div className="history-content">
                    <div className="history-filters">
                        <div className="history-filter-group">
                            <label>Filtrar por treino</label>
                            <select
                                value={selectedTemplate}
                                onChange={(e) =>
                                    setSelectedTemplate(
                                        e.target.value
                                    )
                                }
                            >
                                {templates.map((t) => (
                                    <option key={t} value={t}>
                                        {t === 'todos'
                                            ? 'Todos os treinos'
                                            : t}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="history-filter-group">
                            <label>Exercício</label>
                            <select
                                value={selectedExercise}
                                onChange={(e) =>
                                    setSelectedExercise(
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">
                                    Selecione um exercício
                                </option>
                                {filteredExercises.map((name) => (
                                    <option
                                        key={name}
                                        value={name}
                                    >
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="history-card">
                        <div className="history-card-header">
                            <h3>Histórico detalhado</h3>
                            <span>
                                {selectedExercise
                                    ? selectedExercise
                                    : 'Escolha um exercício'}
                            </span>
                        </div>

                        <div className="history-table-wrapper">
                            <table className="history-table">
                                <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Treino</th>
                                    <th>Peso</th>
                                    <th>Reps</th>
                                    <th>Alvo</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentExerciseEntries.map(
                                    (entry, index) => (
                                        <tr key={index}>
                                            <td>
                                                {formatDate(
                                                    entry.date
                                                )}
                                            </td>
                                            <td>
                                                {
                                                    entry.templateName
                                                }
                                            </td>
                                            <td>
                                                {formatWeight(
                                                    entry.weight
                                                )}
                                            </td>
                                            <td>
                                                {formatReps(
                                                    entry.reps
                                                )}
                                            </td>
                                            <td>
                                                {entry.target}
                                            </td>
                                        </tr>
                                    )
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HistoryPage;
