// src/workoutStorage.js

const DB_NAME = 'vitalita_workouts';
const DB_VERSION = 1;
const SESSIONS_STORE = 'sessions';

function openWorkoutDB() {
    return new Promise((resolve, reject) => {
        if (typeof indexedDB === 'undefined') {
            console.warn('IndexedDB não está disponível neste ambiente.');
            resolve(null);
            return;
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            if (!db.objectStoreNames.contains(SESSIONS_STORE)) {
                const store = db.createObjectStore(SESSIONS_STORE, {
                    keyPath: 'id'
                });

                store.createIndex('userId', 'userId', { unique: false });
                store.createIndex('completedAt', 'completedAt', { unique: false });
            }
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            console.error('Erro ao abrir IndexedDB de sessões', request.error);
            reject(request.error);
        };
    });
}

/**
 * Salva sessão de treino localmente, associada a um userId.
 */
export async function saveWorkoutSessionLocally(userId, session) {
    if (!userId) {
        console.warn('saveWorkoutSessionLocally chamado sem userId.');
        return;
    }

    const db = await openWorkoutDB();
    if (!db) return;

    return new Promise((resolve, reject) => {
        const tx = db.transaction(SESSIONS_STORE, 'readwrite');
        const store = tx.objectStore(SESSIONS_STORE);

        const id =
            session.firestoreSessionId ||
            session.id ||
            (typeof crypto !== 'undefined' && crypto.randomUUID
                ? crypto.randomUUID()
                : String(Date.now()));

        const record = {
            id,
            userId,
            ...session
        };

        const request = store.put(record);

        request.onsuccess = () => resolve();
        request.onerror = () => {
            console.error('Erro ao salvar sessão localmente', request.error);
            reject(request.error);
        };
    });
}

/**
 * Busca todas as sessões locais de um usuário, ordenadas por completedAt descendente.
 */
export async function fetchWorkoutSessions(userId) {
    if (!userId) return [];

    const db = await openWorkoutDB();
    if (!db) return [];

    return new Promise((resolve, reject) => {
        const tx = db.transaction(SESSIONS_STORE, 'readonly');
        const store = tx.objectStore(SESSIONS_STORE);

        let request;

        if (store.indexNames.contains('userId')) {
            const index = store.index('userId');
            const range = IDBKeyRange.only(userId);
            request = index.getAll(range);
        } else {
            // fallback caso o índice não exista
            request = store.getAll();
        }

        request.onsuccess = () => {
            let sessions = request.result || [];

            // se não houver índice, filtra manualmente
            sessions = sessions.filter((s) => s.userId === userId);

            sessions.sort((a, b) => {
                const da = new Date(a.completedAt || a.createdAt || 0).getTime();
                const dbt = new Date(b.completedAt || b.createdAt || 0).getTime();
                return dbt - da;
            });

            resolve(sessions);
        };

        request.onerror = () => {
            console.error('Erro ao buscar sessões locais', request.error);
            reject(request.error);
        };
    });
}