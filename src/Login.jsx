import React, { useState } from "react";

export function Login({ onLoginEmail, onLoginGoogle, onShowRegister, loading, errorMessage }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onLoginEmail(email, password);
    }

    return (
        <div className="login-shell">
            <div className="login-card login-card-compact">
                <div className="login-header">
                    <h1 className="login-logo">VITALITÀ</h1>
                    <p className="login-subtitle">Seu diário inteligente de treinos</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <label className="login-label" htmlFor="loginEmail">
                        E-mail
                        <input
                            id="loginEmail"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className="login-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </label>

                    <label className="login-label" htmlFor="loginPassword">
                        Senha
                        <input
                            id="loginPassword"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </label>

                    {errorMessage ? <div className="login-error">{errorMessage}</div> : null}

                    <button type="submit" className="login-primary" disabled={loading}>
                        {loading ? "ENTRANDO..." : "ENTRAR"}
                    </button>
                </form>

                <div className="login-divider">
                    <span>OU</span>
                </div>

                <button type="button" className="login-google" onClick={onLoginGoogle} disabled={loading}>
                    <svg className="login-google-svg" viewBox="0 0 18 18" aria-hidden="true">
                        <path
                            fill="#4285F4"
                            d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"
                        />
                        <path
                            fill="#34A853"
                            d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"
                        />
                        <path
                            fill="#EA4335"
                            d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"
                        />
                    </svg>
                    Fazer login com o Google
                </button>

                <button type="button" className="login-create" onClick={onShowRegister} disabled={loading}>
                    Criar uma conta com e-mail
                </button>
            </div>
        </div>
    );
}