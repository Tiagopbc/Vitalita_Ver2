import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, db, googleProvider } from "./firebaseConfig";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const AuthContext = createContext(null);

function normalizeAuthError(err) {
    const code = err?.code || "";
    if (code === "auth/invalid-credential") return "E mail ou senha inválidos";
    if (code === "auth/user-not-found") return "Usuário não encontrado";
    if (code === "auth/wrong-password") return "Senha incorreta";
    if (code === "auth/email-already-in-use") return "Esse e mail já está em uso";
    if (code === "auth/weak-password") return "A senha deve ter pelo menos 6 caracteres";
    if (code === "auth/unauthorized-domain") return "Domínio não autorizado no Firebase Authentication";
    return err?.message || "Erro inesperado";
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u || null);
            setAuthLoading(false);
        });
        return () => unsub();
    }, []);

    async function loginWithEmail(email, password) {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { ok: true, error: "" };
        } catch (err) {
            return { ok: false, error: normalizeAuthError(err) };
        }
    }

    async function loginWithGoogle() {
        try {
            await signInWithPopup(auth, googleProvider);
            return { ok: true, error: "" };
        } catch (err) {
            return { ok: false, error: normalizeAuthError(err) };
        }
    }

    async function registerWithEmail(payload) {
        try {
            const { fullName, email, password, gender, birthDate, heightCm, weightKg } = payload;

            const cred = await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(cred.user, { displayName: fullName });

            await setDoc(
                doc(db, "users", cred.user.uid),
                {
                    uid: cred.user.uid,
                    fullName,
                    email,
                    gender,
                    birthDate,
                    heightCm,
                    weightKg,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                },
                { merge: true }
            );

            return { ok: true, error: "" };
        } catch (err) {
            return { ok: false, error: normalizeAuthError(err) };
        }
    }

    async function logout() {
        await signOut(auth);
    }

    const value = useMemo(
        () => ({
            user,
            authLoading,
            loginWithEmail,
            loginWithGoogle,
            registerWithEmail,
            logout,
        }),
        [user, authLoading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
    return ctx;
}