// src/MethodModal.jsx

import React from 'react';
import {
    X,
    AlertTriangle,
    TrendingDown,
    TrendingUp,
    Grid,
    Link2,
    Focus,
    Repeat,
    Heart
} from 'lucide-react';

import { findTrainingMethodByName } from './trainingMethods';

// mapeamento de ícones, único ponto visual específico
const iconMap = {
    'Drop-set': TrendingDown,
    'Pirâmide Crescente': TrendingUp,
    'Pirâmide Decrescente': TrendingDown,
    'Cluster set': Grid,
    'Bi-set': Link2,
    'Pico de contração': Focus,
    'Falha total': AlertTriangle,
    'Negativa': TrendingDown,
    'Convencional': Repeat,
    'Cardio 140 bpm': Heart
};

function MethodModal({ method, onClose }) {
    // busca dados oficiais do método
    const methodData = findTrainingMethodByName(method);

    if (!methodData) {
        return null;
    }

    const Icon = iconMap[methodData.name] || Repeat;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '20px'
            }}
            onClick={onClose}
        >
            <div
                style={{
                    maxWidth: '500px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    padding: '24px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid rgba(56, 189, 248, 0.5)',
                    background:
                        'radial-gradient(circle at top left, rgba(59, 130, 246, 0.15), transparent 60%), linear-gradient(135deg, #020617 0%, #050816 55%, #000 100%)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Cabeçalho */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '20px',
                        paddingBottom: '16px',
                        borderBottom: '1px solid rgba(30, 41, 59, 0.8)'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                            style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background:
                                    'radial-gradient(circle at top left, var(--accent) 0, var(--accent-strong) 42%, var(--accent-deep) 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 20px rgba(37, 99, 235, 0.6)'
                            }}
                        >
                            <Icon size={26} color="white" />
                        </div>
                        <h3
                            style={{
                                margin: 0,
                                fontSize: '1.3rem',
                                color: '#f9fafb'
                            }}
                        >
                            {methodData.name}
                        </h3>
                    </div>

                    <button
                        onClick={onClose}
                        style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            border: '1px solid rgba(148, 163, 184, 0.4)',
                            background: 'rgba(15, 23, 42, 0.8)',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Descrição (shortDescription) */}
                <p
                    style={{
                        fontSize: '0.95rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '20px',
                        lineHeight: '1.6'
                    }}
                >
                    {methodData.shortDescription}
                </p>

                {/* Como executar */}
                <div style={{ marginBottom: '18px' }}>
                    <h4
                        style={{
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            color: 'var(--accent)',
                            marginBottom: '10px'
                        }}
                    >
                        Como executar
                    </h4>
                    <ul
                        style={{
                            margin: 0,
                            paddingLeft: '20px',
                            fontSize: '0.9rem',
                            color: 'var(--text-secondary)',
                            lineHeight: '1.7'
                        }}
                    >
                        {methodData.howTo.map((step, idx) => (
                            <li key={idx} style={{ marginBottom: '6px' }}>
                                {step}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Quando usar */}
                <div style={{ marginBottom: '18px' }}>
                    <h4
                        style={{
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            color: 'var(--accent)',
                            marginBottom: '10px'
                        }}
                    >
                        Quando usar
                    </h4>
                    <ul
                        style={{
                            margin: 0,
                            paddingLeft: '20px',
                            fontSize: '0.9rem',
                            color: 'var(--text-secondary)',
                            lineHeight: '1.7'
                        }}
                    >
                        {methodData.whenToUse.map((use, idx) => (
                            <li key={idx} style={{ marginBottom: '6px' }}>
                                {use}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Cuidados */}
                <div
                    style={{
                        padding: '14px',
                        borderRadius: '12px',
                        background: 'rgba(239, 68, 68, 0.08)',
                        border: '1px solid rgba(239, 68, 68, 0.2)'
                    }}
                >
                    <h4
                        style={{
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            color: '#fca5a5',
                            marginBottom: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        <AlertTriangle size={16} />
                        Cuidados
                    </h4>
                    <ul
                        style={{
                            margin: 0,
                            paddingLeft: '20px',
                            fontSize: '0.9rem',
                            color: '#fecaca',
                            lineHeight: '1.7'
                        }}
                    >
                        {methodData.cautions.map((care, idx) => (
                            <li key={idx} style={{ marginBottom: '6px' }}>
                                {care}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MethodModal;