import React, { useMemo, useState } from "react";

const SPECIAL_REGEX = /[!@#$%^&*(),.?":{}|<>[\]\\\/`~;_+=-]/;

function buildPasswordRequirements(password) {
    return [
        { key: "len", label: "Mínimo de 8 caracteres", met: password.length >= 8 },
        { key: "upper", label: "Pelo menos uma letra maiúscula", met: /[A-Z]/.test(password) },
        { key: "lower", label: "Pelo menos uma letra minúscula", met: /[a-z]/.test(password) },
        { key: "num", label: "Pelo menos um número", met: /\d/.test(password) },
        { key: "spec", label: "Pelo menos um caractere especial", met: SPECIAL_REGEX.test(password) },
    ];
}

function passwordStrengthMeta(requirements) {
    const total = requirements.length;
    const met = requirements.filter((r) => r.met).length;
    const percent = Math.round((met / total) * 100);

    let label = "";
    if (met === 0) label = "";
    else if (met <= 2) label = "Fraca";
    else if (met === 3) label = "Média";
    else if (met === 4) label = "Forte";
    else label = "Excelente";

    return { met, total, percent, label };
}

function summarizePasswordMissing(requirements) {
    const missing = requirements.filter((r) => !r.met).map((r) => r.label);
    if (missing.length === 0) return "";
    return `A senha deve atender: ${missing.join("; ")}.`;
}

export default function RegisterEmail({
                                          onSubmitRegister,
                                          onBackToLogin,
                                          loading = false,
                                          errorMessage = "",
                                      }) {
    const [step, setStep] = useState(1);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [gender, setGender] = useState("masculino");
    const [birthDate, setBirthDate] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

    const [localError, setLocalError] = useState("");

    const passwordReqs = useMemo(() => buildPasswordRequirements(password), [password]);
    const strength = useMemo(() => passwordStrengthMeta(passwordReqs), [passwordReqs]);

    const isStep1 = step === 1;
    const combinedError = localError || errorMessage;

    function validateStep1() {
        if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
            return "Preencha todos os campos de dados básicos.";
        }

        const missingMsg = summarizePasswordMissing(passwordReqs);
        if (missingMsg) return missingMsg;

        if (password !== confirmPassword) {
            return "A confirmação de senha não confere.";
        }

        return "";
    }

    function validateStep2() {
        if (!gender || !birthDate || !height || !weight) {
            return "Preencha todos os dados pessoais.";
        }

        const h = Number(height);
        const w = Number(weight);

        if (Number.isNaN(h) || h <= 0) {
            return "Informe uma altura válida em centímetros.";
        }

        if (Number.isNaN(w) || w <= 0) {
            return "Informe um peso válido em quilogramas.";
        }

        return "";
    }

    function handleNext() {
        const message = validateStep1();
        if (message) {
            setLocalError(message);
            return;
        }
        setLocalError("");
        setStep(2);
    }

    function handleBackWithinRegister() {
        if (step === 1) {
            onBackToLogin();
            return;
        }
        setLocalError("");
        setStep(1);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (loading) return;

        const message = validateStep2();
        if (message) {
            setLocalError(message);
            return;
        }

        setLocalError("");

        const payload = {
            fullName: fullName.trim(),
            email: email.trim(),
            password,
            gender,
            birthDate,
            heightCm: Number(height),
            weightKg: Number(weight),
        };

        onSubmitRegister(payload);
    }

    const showPasswordUX = isStep1 && (password.length > 0 || confirmPassword.length > 0);

    return (
        <div className="app-shell">
            <div className="app-inner">
                <div className="app-header">
                    <h1 className="app-logo-name">Vitalità</h1>
                    <p className="app-header-subtitle">Crie sua conta</p>
                </div>

                <div className="app-header-card login-card register-card">
                    <div className="register-steps">
                        <span className={`register-step-dot ${step >= 1 ? "active" : ""}`} />
                        <span className={`register-step-dot ${step >= 2 ? "active" : ""}`} />
                        <span className="register-step-dot disabled" />
                    </div>

                    <h2 className="register-title">{isStep1 ? "Dados básicos" : "Dados pessoais"}</h2>

                    <form onSubmit={handleSubmit} className="login-form">
                        {isStep1 && (
                            <>
                                <label className="login-label">
                                    Nome completo
                                    <input
                                        className="login-input"
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        disabled={loading}
                                        autoComplete="name"
                                    />
                                </label>

                                <label className="login-label">
                                    E-mail
                                    <input
                                        className="login-input"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={loading}
                                        autoComplete="email"
                                    />
                                </label>

                                <label className="login-label">
                                    Senha
                                    <input
                                        className="login-input"
                                        type="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (localError) setLocalError("");
                                        }}
                                        disabled={loading}
                                        autoComplete="new-password"
                                    />
                                </label>

                                {showPasswordUX && (
                                    <>
                                        <div className="password-hints">
                                            <p className="password-hints-title">Requisitos da senha</p>

                                            <ul className="password-hints-list">
                                                {passwordReqs.map((req) => (
                                                    <li
                                                        key={req.key}
                                                        className={`password-hint-item ${req.met ? "ok" : ""}`}
                                                    >
                                                        <span className="password-hint-dot" />
                                                        <span>{req.label}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="password-strength">
                                                <div className="password-strength-bar">
                                                    <div
                                                        className="password-strength-fill"
                                                        style={{ width: `${strength.percent}%` }}
                                                    />
                                                </div>

                                                <div className="password-strength-label">
                                                    Força da senha:{" "}
                                                    <strong style={{ color: "rgba(229,231,235,0.95)" }}>
                                                        {strength.label || "Digite para avaliar"}
                                                    </strong>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <label className="login-label">
                                    Confirmar senha
                                    <input
                                        className="login-input"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            if (localError) setLocalError("");
                                        }}
                                        disabled={loading}
                                        autoComplete="new-password"
                                    />
                                </label>
                            </>
                        )}

                        {!isStep1 && (
                            <>
                                <label className="login-label">
                                    Gênero
                                    <div className="register-select-wrapper">
                                        <select
                                            className="register-select"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            disabled={loading}
                                        >
                                            <option value="masculino">Masculino</option>
                                            <option value="feminino">Feminino</option>
                                            <option value="nao_informar">Prefiro não informar</option>
                                        </select>
                                    </div>
                                </label>

                                <label className="login-label">
                                    Data de nascimento
                                    <input
                                        className="login-input"
                                        type="date"
                                        value={birthDate}
                                        onChange={(e) => setBirthDate(e.target.value)}
                                        disabled={loading}
                                    />
                                </label>

                                <div className="register-row">
                                    <label className="login-label">
                                        Altura (cm)
                                        <input
                                            className="login-input"
                                            type="number"
                                            inputMode="numeric"
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                            disabled={loading}
                                        />
                                    </label>

                                    <label className="login-label">
                                        Peso (kg)
                                        <input
                                            className="login-input"
                                            type="number"
                                            inputMode="numeric"
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                            disabled={loading}
                                        />
                                    </label>
                                </div>
                            </>
                        )}

                        {combinedError ? <p className="login-error">{combinedError}</p> : null}

                        <div className="register-actions">
                            {isStep1 ? (
                                <button
                                    type="button"
                                    className="login-primary"
                                    onClick={handleNext}
                                    disabled={loading}
                                >
                                    PRÓXIMO
                                </button>
                            ) : (
                                <button type="submit" className="login-primary" disabled={loading}>
                                    {loading ? "CRIANDO CONTA..." : "CRIAR CONTA"}
                                </button>
                            )}

                            <button
                                type="button"
                                className="login-create"
                                onClick={handleBackWithinRegister}
                                disabled={loading}
                            >
                                {isStep1 ? "VOLTAR AO LOGIN" : "VOLTAR"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}