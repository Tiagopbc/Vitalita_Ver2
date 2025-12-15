import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Login } from "./Login";

export default function LoginPage({ onShowRegister }) {
    const { loginWithEmail, loginWithGoogle } = useAuth();

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleLoginEmail(email, password) {
        setLoading(true);
        setErrorMessage("");
        const res = await loginWithEmail(email, password);
        if (!res.ok) setErrorMessage(res.error);
        setLoading(false);
    }

    async function handleLoginGoogle() {
        setLoading(true);
        setErrorMessage("");
        const res = await loginWithGoogle();
        if (!res.ok) setErrorMessage(res.error);
        setLoading(false);
    }

    return (
        <Login
            onLoginEmail={handleLoginEmail}
            onLoginGoogle={handleLoginGoogle}
            onShowRegister={onShowRegister}
            loading={loading}
            errorMessage={errorMessage}
        />
    );
}