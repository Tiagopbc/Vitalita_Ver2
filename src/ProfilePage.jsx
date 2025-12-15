// src/ProfilePage.jsx
import React from "react";

export default function ProfilePage({ user, onLogout, onOpenMethods }) {
    return (
        <div className="app-header-card">
            <h2 style={{ marginTop: 0 }}>Perfil</h2>
            <p style={{ color: "#94a3b8" }}>
                {user?.displayName || "Atleta"}<br />
                {user?.email || ""}
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "16px" }}>
                <button className="header-history-button" type="button" onClick={() => onOpenMethods?.()}>
                    Métodos de treino
                </button>
                <button className="header-history-button" type="button" onClick={() => onLogout?.()}>
                    Sair
                </button>
            </div>
        </div>
    );
}
