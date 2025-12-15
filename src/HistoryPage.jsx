// src/HistoryPage.jsx

import React, { useState, useEffect, useRef } from 'react';
import { db } from './firebaseConfig';
import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
} from 'firebase/firestore';

function HistoryPage({ onBack, initialTemplate, initialExercise, user }) {
    const [templates, setTemplates] = useState([]);
    const [selectedTemplateId, setSelectedTemplateId] = useState('');
    const [exerciseOptions, setExerciseOptions] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState('');
    const [historyRows, setHistoryRows] = useState([]);
    const [prRows, setPrRows] = useState([]);
    const [loadingTemplates, setLoadingTemplates] = useState(true);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [error, setError] = useState('');

    const hasAppliedInitialFilters = useRef(false);

    // carrega templates de treino das coleções base e do usuário
    useEffect(() => {
        async function fetchTemplates() {
            if (!user) {
                setTemplates([]);
                setSelectedTemplateId('');
                setLoadingTemplates(false);
                return;
            }

            setLoadingTemplates(true);
            setError('');

            try {
                const list = [];

                // templates base
                const baseRef = collection(db, 'workout_templates');
                const baseQuery = query(baseRef, orderBy('name'));
                const baseSnap = await getDocs(baseQuery);

                baseSnap.forEach((docSnap) => {
                    const data = docSnap.data();
                    list.push({
                        id: docSnap.id,
                        name: data.name,
                        exercises: data.exercises || [],
                        source: 'default',
                    });
                });

                // templates personalizados do usuário
                const userRef = collection(db, 'user_workout_templates');
                const userQuery = query(userRef, where('userId', '==', user.uid));
                const userSnap = await getDocs(userQuery);

                userSnap.forEach((docSnap) => {
                    const data = docSnap.data();
                    list.push({
                        id: docSnap.id,
                        name: data.name,
                        exercises: data.exercises || [],
                        source: 'user',
                    });
                });

                // ordena por nome
                list.sort((a, b) => a.name.localeCompare(b.name));

                setTemplates(list);

                if (list.length > 0) {
                    let defaultTemplate = list[0];

                    // tenta respeitar o initialTemplate, se existir
                    if (initialTemplate) {
                        const found = list.find(
                            (t) => t.name === initialTemplate,
                        );
                        if (found) {
                            defaultTemplate = found;
                        }
                    }

                    setSelectedTemplateId(defaultTemplate.id);
                } else {
                    setSelectedTemplateId('');
                }
            } catch (err) {
                console.error('Erro ao carregar templates do histórico', err);
                setError('Não foi possível carregar os treinos.');
            } finally {
                setLoadingTemplates(false);
            }
        }

        fetchTemplates();
    }, [initialTemplate, user?.uid]);

    // atualiza lista de exercícios conforme template escolhido
    useEffect(() => {
        if (!selectedTemplateId) {
            setExerciseOptions([]);
            setSelectedExercise('');
            return;
        }

        const template = templates.find(
            (t) => t.id === selectedTemplateId,
        );

        const options =
            template && Array.isArray(template.exercises)
                ? template.exercises.map((ex) => ex.name)
                : [];

        setExerciseOptions(options);

        if (!options.length) {
            setSelectedExercise('');
            return;
        }

        // aplica initialExercise somente uma vez
        if (!hasAppliedInitialFilters.current) {
            let defaultExercise = options[0];

            if (initialExercise && options.includes(initialExercise)) {
                defaultExercise = initialExercise;
            }

            setSelectedExercise(defaultExercise);
            hasAppliedInitialFilters.current = true;
        } else if (!options.includes(selectedExercise)) {
            setSelectedExercise(options[0]);
        }
    }, [selectedTemplateId, templates, initialExercise, selectedExercise]);

    // carrega histórico quando template e exercício forem definidos
    useEffect(() => {
        async function fetchHistory() {
            if (!selectedTemplateId || !selectedExercise) {
                setHistoryRows([]);
                setPrRows([]);
                return;
            }

            if (!user) {
                setHistoryRows([]);
                setPrRows([]);
                return;
            }

            const template = templates.find(
                (t) => t.id === selectedTemplateId,
            );

            if (!template) {
                setHistoryRows([]);
                setPrRows([]);
                return;
            }

            setLoadingHistory(true);
            setError('');
            try {
                const sessionsRef = collection(db, 'workout_sessions');

                const constraints = [
                    where('templateId', '==', template.id),
                    where('userId', '==', user.uid),
                    orderBy('completedAt', 'desc'),
                ];

                const sessionsQuery = query(sessionsRef, ...constraints);
                const snap = await getDocs(sessionsQuery);

                const rows = [];
                const prMap = new Map();

                snap.forEach((docSnap) => {
                    const data = docSnap.data();
                    const results = data.results || {};

                    const exerciseResult = results[selectedExercise];

                    if (!exerciseResult) {
                        return;
                    }

                    const completedAt = data.completedAt;
                    let date = null;
                    if (completedAt && typeof completedAt.toDate === 'function') {
                        date = completedAt.toDate();
                    }

                    const weight =
                        typeof exerciseResult.weight === 'number'
                            ? exerciseResult.weight
                            : null;

                    const reps =
                        typeof exerciseResult.reps === 'number'
                            ? exerciseResult.reps
                            : null;

                    const notes = exerciseResult.notes ?? exerciseResult.note ?? '';

                    rows.push({
                        id: docSnap.id,
                        date,
                        weight,
                        reps,
                        notes,
                    });

                    if (weight != null && reps != null) {
                        const key = String(weight);
                        const existing = prMap.get(key);
                        if (!existing || reps > existing.reps) {
                            prMap.set(key, { weight, reps });
                        }
                    }
                });

                setHistoryRows(rows);

                const prList = Array.from(prMap.values()).sort(
                    (a, b) => a.weight - b.weight,
                );
                setPrRows(prList);
            } catch (err) {
                console.error('Erro ao carregar histórico', err);
                setError('Não foi possível carregar o histórico.');
            } finally {
                setLoadingHistory(false);
            }
        }

        fetchHistory();
    }, [selectedTemplateId, selectedExercise, user?.uid, templates]);

    function formatDate(date) {
        if (!date) {
            return '';
        }
        try {
            return date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
        } catch {
            return '';
        }
    }

    const selectedTemplate = templates.find(
        (t) => t.id === selectedTemplateId,
    );

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

            {selectedTemplate && (
                <p className="history-intro">
                    Rotina selecionada, {selectedTemplate.name}.
                </p>
            )}

            {error && (
                <p className="login-error" style={{ marginTop: 8 }}>
                    {error}
                </p>
            )}

            {loadingTemplates ? (
                <p style={{ marginTop: 12 }}>Carregando treinos...</p>
            ) : (
                <>
                    <div className="history-filters" style={{ marginTop: 16 }}>
                        <div className="history-filter-group">
                            <label htmlFor="templateSelect">
                                Rotina
                            </label>
                            <select
                                id="templateSelect"
                                value={selectedTemplateId || ''}
                                onChange={(e) =>
                                    setSelectedTemplateId(e.target.value)
                                }
                            >
                                {templates.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="history-filter-group">
                            <label htmlFor="exerciseSelect">
                                Exercício
                            </label>
                            <select
                                id="exerciseSelect"
                                value={selectedExercise || ''}
                                onChange={(e) =>
                                    setSelectedExercise(e.target.value)
                                }
                            >
                                {exerciseOptions.map((name) => (
                                    <option key={name} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {loadingHistory ? (
                        <p style={{ marginTop: 16 }}>
                            Carregando histórico...
                        </p>
                    ) : (
                        <div className="history-content">
                            <section className="history-card">
                                <div className="history-card-header">
                                    <h3>Histórico detalhado</h3>
                                    {selectedExercise && (
                                        <span>
                                            Exercício, {selectedExercise}.
                                        </span>
                                    )}
                                </div>

                                {historyRows.length === 0 ? (
                                    <p>
                                        Nenhum registro encontrado para esta
                                        combinação de rotina e exercício.
                                    </p>
                                ) : (
                                    <div className="history-table-wrapper">
                                        <table className="history-table">
                                            <thead>
                                            <tr>
                                                <th>Data</th>
                                                <th>Carga</th>
                                                <th>Repetições</th>
                                                <th>Observações</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {historyRows.map((row) => (
                                                <tr key={row.id}>
                                                    <td>
                                                        {formatDate(
                                                            row.date,
                                                        )}
                                                    </td>
                                                    <td>
                                                        {row.weight != null
                                                            ? `${row.weight} kg`
                                                            : ''}
                                                    </td>
                                                    <td>
                                                        {row.reps != null
                                                            ? row.reps
                                                            : ''}
                                                    </td>
                                                    <td>
                                                        {row.notes}
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </section>

                            <section className="history-card">
                                <div className="history-card-header">
                                    <h3>PRs por carga</h3>
                                </div>

                                {prRows.length === 0 ? (
                                    <p>
                                        Ainda não há PRs calculados para este
                                        exercício.
                                    </p>
                                ) : (
                                    <div className="history-pr-table-wrapper">
                                        <table className="history-pr-table">
                                            <thead>
                                            <tr>
                                                <th>Carga</th>
                                                <th>Melhor número de repetições</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {prRows.map((row) => (
                                                <tr key={row.weight}>
                                                    <td>
                                                        {row.weight} kg
                                                    </td>
                                                    <td>
                                                        {row.reps}
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </section>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default HistoryPage;