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

                    if (completedAt && typeof completedAt.toDate === 'function') {
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

                    Object.entries(results).forEach(([exerciseName, result]) => {
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
                            target: result.target || ''
                        });
                    });
                });

                Object.keys(historyByExercise).forEach((name) => {
                    historyByExercise[name].sort((a, b) => a.date - b.date);
                });

                setExerciseHistory(historyByExercise);
                setTemplates(['todos', ...Array.from(templateNames).sort()]);
            } catch (error) {
                console.error('Erro ao carregar histórico', error);
            } finally {
                setLoading(false);
            }
        }

        loadHistory();
    }, []);

    const allExerciseNames = useMemo(
        () => Object.keys(exerciseHistory).sort((a, b) => a.localeCompare(b)),
        [exerciseHistory]
    );

    const filteredExercises = useMemo(() => {
        if (selectedTemplate === 'todos') {
            return allExerciseNames;
        }

        return allExerciseNames.filter((name) => {
            const entries = exerciseHistory[name] || [];
            return entries.some((entry) => entry.templateName === selectedTemplate);
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
        return base.filter((entry) => entry.templateName === selectedTemplate);
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

    const renderChart = () => {
        const entries = currentExerciseEntries;

        if (!entries.length) {
            return (
                <p className="history-chart-empty">
                    Selecione um exercício para ver a evolução das cargas.
                </p>
            );
        }

        const width = 600;
        const height = 220;
        const paddingX = 40;
        const paddingY = 24;

        const weights = entries.map((e) => e.weight || 0);
        const minWeight = Math.min(...weights);
        const maxWeight = Math.max(...weights);

        const uniqueDates = Array.from(
            new Set(entries.map((e) => formatDate(e.date)))
        );

        const getX = (dateStr) => {
            const idx = uniqueDates.indexOf(dateStr);
            if (idx === -1) {
                return paddingX;
            }
            if (uniqueDates.length === 1) {
                return width / 2;
            }
            const step =
                (width - paddingX * 2) /
                Math.max(uniqueDates.length - 1, 1);
            return paddingX + idx * step;
        };

        const getY = (weight) => {
            if (maxWeight === minWeight) {
                return height / 2;
            }

            const normalized =
                (weight - minWeight) / (maxWeight - minWeight || 1);
            return (
                height - paddingY - normalized * (height - paddingY * 2)
            );
        };

        const points = entries.map((entry) => ({
            x: getX(formatDate(entry.date)),
            y: getY(entry.weight || 0),
            entry
        }));

        const pathD = points
            .map((p, index) => {
                const prefix = index === 0 ? 'M' : 'L';
                return `${prefix} ${p.x} ${p.y}`;
            })
            .join(' ');

        return (
            <svg
                className="history-chart"
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid meet"
            >
                <line
                    x1={paddingX}
                    y1={height - paddingY}
                    x2={width - paddingX}
                    y2={height - paddingY}
                    className="history-chart-axis"
                />
                <line
                    x1={paddingX}
                    y1={paddingY}
                    x2={paddingX}
                    y2={height - paddingY}
                    className="history-chart-axis"
                />

                <text
                    x={paddingX}
                    y={paddingY - 4}
                    className="history-chart-axis-label"
                >
                    Peso
                </text>
                <text
                    x={width - paddingX}
                    y={height - paddingY + 16}
                    className="history-chart-axis-label"
                    textAnchor="end"
                >
                    Datas
                </text>

                {uniqueDates.map((dateStr) => {
                    const x = getX(dateStr);
                    return (
                        <g key={dateStr}>
                            <line
                                x1={x}
                                y1={height - paddingY}
                                x2={x}
                                y2={height - paddingY + 6}
                                className="history-chart-tick"
                            />
                            <text
                                x={x}
                                y={height - paddingY + 18}
                                className="history-chart-tick-label"
                                textAnchor="middle"
                            >
                                {dateStr}
                            </text>
                        </g>
                    );
                })}

                {points.length > 0 && (
                    <path d={pathD} className="history-chart-line" />
                )}

                {points.map((p, index) => (
                    <g key={index}>
                        <circle
                            cx={p.x}
                            cy={p.y}
                            r={3.2}
                            className="history-chart-point"
                        />
                        <text
                            x={p.x}
                            y={p.y - 8}
                            className="history-chart-label"
                        >
                            {p.entry.weight}
                        </text>
                        <text
                            x={p.x}
                            y={height - paddingY + 14}
                            className="history-chart-date-label"
                            textAnchor="middle"
                        >
                            {formatDate(p.entry.date)}
                        </text>
                    </g>
                ))}
            </svg>
        );
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
                <p className="history-intro">Carregando histórico...</p>
            </div>
        );
    }

    const hasHistory = Object.keys(exerciseHistory).length > 0;

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
                    Nenhum treino encontrado ainda. Comece registrando suas
                    sessões para ver a evolução aqui.
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
                                    setSelectedTemplate(e.target.value)
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
                                    setSelectedExercise(e.target.value)
                                }
                            >
                                <option value="">
                                    Selecione um exercício
                                </option>
                                {filteredExercises.map((name) => (
                                    <option key={name} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="history-chart-card">
                        <h3>Evolução das cargas</h3>
                        {renderChart()}
                    </div>

                    <div className="history-card">
                        <div className="history-card-header">
                            <h3>Histórico detalhado</h3>
                            <span>
                                {selectedExercise} ·{' '}
                                {selectedTemplate === 'todos'
                                    ? 'Todos os treinos'
                                    : `Treino ${selectedTemplate}`}
                            </span>
                        </div>

                        <div className="history-table-wrapper">
                            <table className="history-table">
                                <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Treino</th>
                                    <th>Peso</th>
                                    <th>Alvo</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentExerciseEntries.map(
                                    (entry, index) => (
                                        <tr key={index}>
                                            <td>
                                                {formatDate(entry.date)}
                                            </td>
                                            <td>
                                                {entry.templateName}
                                            </td>
                                            <td>
                                                {formatWeight(
                                                    entry.weight
                                                )}
                                            </td>
                                            <td>{entry.target}</td>
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
