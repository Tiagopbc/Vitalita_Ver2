import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "COLOQUE_SUA_CHAVE",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "COLOQUE_SEU_AUTH_DOMAIN",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "COLOQUE_SEU_PROJECT_ID",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "COLOQUE_SEU_STORAGE_BUCKET",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "COLOQUE_SEU_SENDER_ID",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "COLOQUE_SEU_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

enableIndexedDbPersistence(db).catch((err) => {
    if (err?.code === "failed-precondition") {
        console.warn("Persistência offline do Firestore não pôde ser ativada. Outra aba pode estar usando o banco.");
        return;
    }
    if (err?.code === "unimplemented") {
        console.warn("Persistência offline do Firestore não é suportada neste navegador.");
        return;
    }
    console.error("Erro ao ativar persistência offline do Firestore", err);
});