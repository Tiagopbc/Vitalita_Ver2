// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDIddnotO2FO3R44RiwuN_gAsrqO37GX4M",
    authDomain: "app-treino-17bbf.firebaseapp.com",
    projectId: "app-treino-17bbf",
    storageBucket: "app-treino-17bbf.firebasestorage.app",
    messagingSenderId: "674294174962",
    appId: "1:674294174962:web:f244a6931163815f84ec6b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// provider do Google pronto para uso
export const googleProvider = new GoogleAuthProvider();
