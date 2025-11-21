// src/LoginPage.jsx
import React, { useState } from 'react';
import { auth } from './firebaseConfig';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from 'firebase/auth';

function LoginPage() {
    const [mode, setMode] = useState('login'); // login ou register
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setErrorMessage('');

        try {
            if (mode === 'login') {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            // o AuthContext pega a mudança e o App troca para a Home
        } catch (error) {
            console.error(error);
            let msg = 'Erro ao autenticar';

            if (error.code === 'auth/user-not-found') {
                msg = 'Usuário não encontrado';
            } else if (error.code === 'auth/wrong-password') {
                msg = 'Senha incorreta';
            } else if (error.code === 'auth/email-already-in-use') {
                msg = 'Este e mail já está em uso';
            }

            setErrorMessage(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="app-shell">
            <div className="app-inner">
                <header className="app-header">
                    <h1 className="app-logo-name">Vitalità</h1>
                    <p className="app-header-subtitle">
                        Seu diário inteligente de treinos
                    </p>
                </header>

                <main className="login-page">
                    <div className="login-card">
                        <h2>{mode === 'login' ? 'Entrar' : 'Criar conta'}</h2>

                        <form onSubmit={handleSubmit} className="login-form">
                            <label>
                                E mail
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </label>

                            <label>
                                Senha
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </label>

                            {errorMessage && (
                                <p className="login-error">
                                    {errorMessage}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="header-history-button"
                                disabled={submitting}
                            >
                                {submitting
                                    ? 'Enviando...'
                                    : mode === 'login'
                                        ? 'Entrar'
                                        : 'Criar conta'}
                            </button>
                        </form>

                        <button
                            type="button"
                            className="header-secondary-button login-toggle"
                            onClick={() =>
                                setMode((current) => (current === 'login' ? 'register' : 'login'))
                            }
                        >
                            {mode === 'login'
                                ? 'Criar uma nova conta'
                                : 'Já tenho conta, entrar'}
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default LoginPage;