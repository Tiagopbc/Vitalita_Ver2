// src/achievementsStorage.js

// chave base de armazenamento das conquistas
const BASE_KEY = 'vitalita_achievements';

/**
 * Carrega a lista de conquistas do usuário.
 * A ideia é usar a mesma estrutura que o Achievements.tsx usa.
 * Cada item deve ter, no mínimo, um campo booleano `unlocked`.
 */
export function loadUserAchievements(userId) {
    // se na versão nova você estiver usando chave com userId, fica assim
    const userKey = `${BASE_KEY}_${userId}`;

    // tenta chave específica do usuário, se não achar cai na chave genérica
    const raw =
        localStorage.getItem(userKey) ||
        localStorage.getItem(BASE_KEY);

    if (!raw) {
        return [];
    }

    try {
        const parsed = JSON.parse(raw);
        // garante que é array
        if (Array.isArray(parsed)) {
            return parsed;
        }
        return [];
    } catch (e) {
        console.error('Erro ao ler conquistas do localStorage', e);
        return [];
    }
}

/**
 * Conta quantas conquistas estão desbloqueadas.
 * Depende do campo `unlocked` que o Achievements.tsx deve setar.
 */
export function countUnlockedAchievements(userId) {
    const achievements = loadUserAchievements(userId);
    return achievements.filter((a) => a && a.unlocked).length;
}