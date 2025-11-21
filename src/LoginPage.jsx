// src/LoginPage.jsx
import React, { useState } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider } from './firebaseConfig';
import './style.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const trimmedEmail = email.trim();

            if (isRegistering) {
                await createUserWithEmailAndPassword(auth, trimmedEmail, password);
            } else {
                await signInWithEmailAndPassword(auth, trimmedEmail, password);
            }
        } catch (err) {
            console.error(err);
            setError(
                'Não foi possível autenticar. Verifique os dados e tente novamente.'
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogleSignIn() {
        setError('');
        setLoading(true);

        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
            setError('Não foi possível entrar com o Google. Tente novamente.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-title">Vitalità</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label className="login-label">
                        E mail
                        <input
                            type="email"
                            className="login-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>

                    <label className="login-label">
                        Senha
                        <input
                            type="password"
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>

                    {error && (
                        <p className="login-error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="header-history-button"
                        disabled={loading}
                    >
                        {loading
                            ? 'Enviando...'
                            : isRegistering
                                ? 'Criar conta'
                                : 'Entrar'}
                    </button>
                </form>

                <div className="login-divider">
                    <span>ou</span>
                </div>

                <div className="login-actions">
                    <button
                        type="button"
                        className="google-image-button"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        aria-label="Entrar com Google"
                    >
                        <img
                            src="/google-logo.svg"
                            alt="Entrar com Google"
                        />
                    </button>

                    <button
                        type="button"
                        className="login-toggle-button"
                        onClick={() => setIsRegistering((prev) => !prev)}
                        disabled={loading}
                    >
                        {isRegistering
                            ? 'Já tenho conta com e mail'
                            : 'Quero criar uma conta com e mail'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
