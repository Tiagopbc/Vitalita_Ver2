// src/ExercisePicker.jsx
import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import {
    collection,
    getDocs,
    query,
    orderBy,
} from 'firebase/firestore';

function ExercisePicker({ value, onChange, label = 'Exercício' }) {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchExercises() {
            setLoading(true);
            setError('');
            try {
                const ref = collection(db, 'exercise_library');
                const q = query(ref, orderBy('namePt'));
                const snap = await getDocs(q);

                const list = snap.docs.map((docSnap) => ({
                    id: docSnap.id,
                    ...docSnap.data(),
                }));

                setExercises(list);
            } catch (err) {
                console.error('Erro ao carregar exercícios', err);
                setError('Não foi possível carregar a lista de exercícios.');
            } finally {
                setLoading(false);
            }
        }

        fetchExercises();
    }, []);

    const normalizedSearch = search.trim().toLowerCase();

    const filteredExercises = exercises.filter((ex) => {
        if (!normalizedSearch) {
            return true;
        }
        const name = (ex.namePt || ex.nameEn || '').toLowerCase();
        const group = (ex.bodyPartPt || ex.bodyPartEn || '').toLowerCase();
        return (
            name.includes(normalizedSearch) || group.includes(normalizedSearch)
        );
    });

    if (loading) {
        return <p>Carregando exercícios…</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="exercise-picker">
            <label className="exercise-picker-label">
                {label}
                <input
                    type="text"
                    className="exercise-picker-search"
                    placeholder="Buscar por nome ou grupo"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="exercise-picker-select"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                >
                    <option value="">Selecione um exercício</option>
                    {filteredExercises.map((ex) => (
                        <option key={ex.id} value={ex.namePt || ex.nameEn}>
                            {ex.namePt || ex.nameEn}
                            {ex.bodyPartPt
                                ? ` (${ex.bodyPartPt})`
                                : ex.bodyPartEn
                                    ? ` (${ex.bodyPartEn})`
                                    : ''}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
}

export default ExercisePicker;