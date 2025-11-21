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
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [exerciseOptions, setExerciseOptions] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState('');
    const [historyRows, setHistoryRows] = useState([]);
    const [prRows, setPrRows] = useState([]);
    const [loadingTemplates, setLoadingTemplates] = useState(true);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [error, setError] = useState('');

    const hasAppliedInitialFilters = useRef(false);

    // carrega templates de treino
    useEffect(() => {
        async function fetchTemplates() {
            setLoadingTemplates(true);
            setError('');
            try {
                const templatesRef = collection(db, 'workout_templates');
                const templatesQuery = query(templatesRef, orderBy('name'));
                const snap = await getDocs(templatesQuery);

                const list = snap.docs.map((docSnap) => {
                    const data = docSnap.data();
                    return {
                        id: docSnap.id,
                        name: data.name,
                        exercises: data.exercises || [],
                    };
                });

                setTemplates(list);

                if (list.length > 0) {
                    let defaultTemplateName = list[0].name;

                    if (initialTemplate) {
                        const found = list.find(
                            (t) => t.name === initialTemplate,
                        );
                        if (found) {
                            defaultTemplateName = found.name;
                        }
                    }

                    setSelectedTemplate(defaultTemplateName);
                }
            } catch (err) {
                console.error('Erro ao carregar templates do histórico', err);
                setError('Não foi possível carregar os treinos');
            } finally {
                setLoadingTemplates(false);
            }
        }

        fetchTemplates();
    }, [initialTemplate]);

    // atualiza lista de exercícios conforme template escolhido
    useEffect(() => {
        if (!selectedTemplate) {
            setExerciseOptions([]);
            setSelectedExercise('');
            return;
        }

        const template = templates.find(
            (t) => t.name === selectedTemplate,
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
    }, [selectedTemplate, templates, initialExercise, selectedExercise]);

    // carrega histórico quando template e exercício forem definidos
    useEffect(() => {
        async function fetchHistory() {
            if (!selectedTemplate || !selectedExercise) {
                setHistoryRows([]);
                setPrRows([]);
                return;
            }

            if (!user) {
                // segurança extra, mas na prática App só mostra HistoryPage se houver user
                return;
            }

            setLoadingHistory(true);
            setError('');
            try {
                const sessionsRef = collection(db, 'workout_sessions');

                const constraints = [
                    where('templateName', '==', selectedTemplate),
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

                    // monta a data a partir do completedAt
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
                setError('Não foi possível carregar o histórico');
            } finally {
                setLoadingHistory(false);
            }
        }

        fetchHistory();
    }, [selectedTemplate, selectedExercise, user]);

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

    return (
        <div className="history-page">
            <div className="history-header">
                <button
                    type="button"
                    className="back-button"
                    onClick={onBack}
                >
                    Voltar
                </button>
                <h2>Histórico de treinos</h2>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {loadingTemplates ? (
                <p>Carregando treinos...</p>
            ) : (
                <>
                    <div className="history-filters">
                        <div className="history-filter">
                            <label htmlFor="templateSelect">
                                Rotina
                            </label>
                            <select
                                id="templateSelect"
                                value={selectedTemplate || ''}
                                onChange={(e) =>
                                    setSelectedTemplate(e.target.value)
                                }
                            >
                                {templates.map((t) => (
                                    <option key={t.id} value={t.name}>
                                        {t.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="history-filter">
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
                        <p>Carregando histórico...</p>
                    ) : (
                        <>
                            <section className="history-section">
                                <h3>Histórico detalhado</h3>
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
                                                        {row.weight !=
                                                        null
                                                            ? `${row.weight} kg`
                                                            : ''}
                                                    </td>
                                                    <td>
                                                        {row.reps !=
                                                        null
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

                            <section className="history-section">
                                <h3>PRs por carga</h3>
                                {prRows.length === 0 ? (
                                    <p>
                                        Ainda não há PRs calculados para este
                                        exercício.
                                    </p>
                                ) : (
                                    <div className="history-table-wrapper">
                                        <table className="history-table">
                                            <thead>
                                            <tr>
                                                <th>Carga</th>
                                                <th>Melhor número de repetições</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {prRows.map((row) => (
                                                <tr
                                                    key={row.weight}
                                                >
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
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default HistoryPage;