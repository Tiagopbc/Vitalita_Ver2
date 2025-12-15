// src/MethodsPage.jsx

import React from 'react';

function MethodsPage({ onBack }) {
    const methods = [
        {
            id: 'drop-set',
            name: 'Drop-set',
            description:
                'Você continua o exercício reduzindo a carga assim que chegar perto da falha, sem descansar entre as reduções de peso.',
            howTo: [
                'Escolha um exercício com máquina ou halteres, de preferência.',
                'Use uma carga com a qual você chegue muito perto da falha na faixa de repetições planejada.',
                'Ao chegar na falha ou quase falha, reduza rapidamente a carga e continue o exercício.',
                'Repita a redução de carga uma ou duas vezes, mantendo a boa técnica.',
            ],
            whenToUse: [
                'Para aumentar o estresse metabólico no final da sessão.',
                'Quando você tem pouco tempo e quer intensificar o treino.',
                'Em exercícios isoladores, como elevações laterais ou crucifixo.',
            ],
            caution: [
                'Evite usar drop-set em todos os exercícios do treino.',
                'Não use rotineiramente com cargas muito altas em exercícios compostos, como agachamento livre.',
            ],
        },
        {
            id: 'piramide-crescente',
            name: 'Pirâmide Crescente',
            description:
                'A cada série você aumenta a carga e reduz um pouco o número de repetições, dentro de uma faixa planejada.',
            howTo: [
                'Defina uma faixa de repetições, por exemplo de 12 até 6 repetições.',
                'Comece com carga mais leve e repetições mais altas.',
                'A cada série, aumente o peso e reduza um pouco as repetições.',
                'Mantenha a técnica consistente durante todas as séries.',
            ],
            whenToUse: [
                'Boa estratégia para “entrar no exercício” com mais controle.',
                'Útil em exercícios base, como supino ou leg press.',
                'Ajuda a acumular volume em repetições moderadas e, no fim, buscar cargas mais altas.',
            ],
            caution: [
                'Planeje o peso das séries para não travar cedo demais.',
                'Não exagere no aumento de carga de uma série para outra.',
            ],
        },
        {
            id: 'piramide-decrescente',
            name: 'Pirâmide Decrescente',
            description:
                'Você começa com a carga mais alta e repetições mais baixas e, nas séries seguintes, diminui o peso e aumenta o número de repetições.',
            howTo: [
                'Aqueça bem antes da série mais pesada.',
                'Comece com a série de menor número de repetições usando a maior carga planejada.',
                'Nas séries seguintes, reduza um pouco a carga e aumente as repetições.',
                'Mantenha a execução controlada, mesmo com a fadiga se acumulando.',
            ],
            whenToUse: [
                'Quando você está descansado e quer priorizar a série mais pesada logo no início.',
                'Para exercícios principais, como agachamento, supino ou remada.',
            ],
            caution: [
                'Exige aquecimento muito bem feito para evitar lesões.',
                'Não é a melhor escolha em dias de fadiga elevada.',
            ],
        },
        {
            id: 'cluster',
            name: 'Cluster set',
            description:
                'Série em que você faz pequenas “pausas rápidas” dentro da mesma série para conseguir manter a carga ou a qualidade das repetições.',
            howTo: [
                'Escolha uma carga desafiadora, mas que você consiga repetir algumas vezes com boa técnica.',
                'Faça um pequeno bloco de repetições, por exemplo 3 a 5 repetições.',
                'Descanse de 10 a 20 segundos ainda na estação, sem sair do lugar.',
                'Repita o bloco de repetições e pausa até completar o volume planejado.',
            ],
            whenToUse: [
                'Boa opção para buscar força com segurança, pois as micropausas ajudam a manter a técnica.',
                'Útil em exercícios como supino, remada ou agachamento na máquina.',
            ],
            caution: [
                'Controle com cuidado o tempo das pausas, para não descaracterizar o método.',
                'Não use em excesso, pois ainda gera bastante fadiga.',
            ],
        },
        {
            id: 'bi-set',
            name: 'Bi-set',
            description:
                'Você executa dois exercícios para o mesmo grupo muscular, um logo em seguida do outro, com descanso só depois de completar os dois.',
            howTo: [
                'Escolha dois exercícios que trabalhem a mesma musculatura principal.',
                'Faça a série do primeiro exercício até a faixa planejada de repetições.',
                'Logo em seguida, sem descanso, faça a série do segundo exercício.',
                'Descanse apenas depois de completar os dois.',
            ],
            whenToUse: [
                'Quando você quer gerar mais densidade de treino para um grupo muscular específico.',
                'Bom em treinos de braços, ombros ou peito.',
            ],
            caution: [
                'A fadiga aumenta bastante, então ajuste a carga para não perder a técnica.',
                'Evite combinar dois exercícios muito pesados ao mesmo tempo.',
            ],
        },
        {
            id: 'pico',
            name: 'Pico de contração',
            description:
                'Você segura um ou dois segundos no ponto de máxima contração do movimento para melhorar controle e conexão mente músculo.',
            howTo: [
                'Faça o movimento de forma controlada até o ponto de maior contração.',
                'Segure a posição por um ou dois segundos, sem relaxar a musculatura.',
                'Retorne controlando a fase excêntrica, sem deixar a carga cair de uma vez.',
            ],
            whenToUse: [
                'Para melhorar a percepção do músculo que está sendo trabalhado.',
                'Muito útil em exercícios de panturrilhas, bíceps, tríceps e ombros.',
            ],
            caution: [
                'Evite travar completamente as articulações na posição de pico.',
                'Se a carga estiver alta demais, será difícil manter o tempo de contração com boa técnica.',
            ],
        },
        {
            id: 'falha-total',
            name: 'Falha total',
            description:
                'Você leva a série até o ponto em que não consegue mais completar outra repetição com boa técnica.',
            howTo: [
                'Escolha um exercício seguro, de preferência em máquina ou com supervisão.',
                'Use uma carga com a qual você chegue perto da falha na faixa de repetições planejada.',
                'Continue a série até perceber que não consegue mais completar outra repetição sem “roubar”.',
            ],
            whenToUse: [
                'Em fases específicas do treino, para aumentar o estímulo de força ou hipertrofia.',
                'Em um ou outro exercício do treino, geralmente na última série.',
            ],
            caution: [
                'Não é necessário, nem recomendável, levar todas as séries até a falha total.',
                'Exige recuperação adequada, então use com moderação na semana.',
            ],
        },
        {
            id: 'negativa',
            name: 'Negativa',
            description:
                'Você dá ênfase na fase em que o músculo “segura” a carga na descida, ou seja, na fase excêntrica do movimento.',
            howTo: [
                'Use uma carga que permita controlar bem a descida.',
                'Conte mentalmente de dois a quatro segundos enquanto abaixa a carga.',
                'Suba de forma mais natural, sem acelerar demais, e repita.',
            ],
            whenToUse: [
                'Para melhorar o controle do movimento e aumentar o tempo sob tensão.',
                'Boa estratégia em exercícios de máquina, como cadeira extensora ou flexora.',
            ],
            caution: [
                'Gera bastante dano muscular, portanto não use em excesso.',
                'Evite combinar negativas com muitos outros métodos intensos no mesmo treino.',
            ],
        },
        {
            id: 'cardio-140',
            name: 'Cardio 140 bpm',
            description:
                'Manter a frequência cardíaca em torno de 140 batimentos por minuto é uma forma prática de controlar a intensidade do cardio.',
            howTo: [
                'Use esteira, bicicleta ou elíptico, de preferência com monitor de frequência cardíaca.',
                'Ajuste velocidade e inclinação até ficar próximo de 140 bpm, sem ultrapassar demais esse valor.',
                'Mantenha esse ritmo por 15 a 30 minutos, respeitando seu nível de condicionamento.',
            ],
            whenToUse: [
                'Para melhorar o condicionamento cardiorrespiratório.',
                'Como complemento ao treino de musculação, em dias alternados ou após o treino.',
                'Quando o objetivo inclui controle de peso e saúde cardiovascular.',
            ],
            caution: [
                'Se você tiver qualquer problema cardíaco, siga sempre orientação profissional.',
                'Não aumente demais a intensidade ao ponto de não conseguir falar frases curtas.',
            ],
        },
    ];

    return (
        <div className="methods-page">
            {onBack && (
                <button
                    type="button"
                    className="btn-back-primary"
                    onClick={onBack}
                >
                    Voltar
                </button>
            )}

            <h2>Métodos avançados de treino</h2>

            <p className="history-intro">
                Aqui você encontra uma explicação prática dos principais métodos usados nos seus treinos,
                com foco em quando usar cada um, como aplicar e quais cuidados tomar.
            </p>

            <div className="methods-grid">
                {methods.map((method) => (
                    <article key={method.id} className="method-card">
                        <h3>{method.name}</h3>
                        <p>{method.description}</p>

                        {method.howTo && method.howTo.length > 0 && (
                            <>
                                <h4 style={{ marginTop: 10, marginBottom: 4, fontSize: '0.8rem' }}>
                                    Como aplicar
                                </h4>
                                <ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    {method.howTo.map((item, index) => (
                                        <li key={`${method.id}-how-${index}`}>{item}</li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {method.whenToUse && method.whenToUse.length > 0 && (
                            <>
                                <h4 style={{ marginTop: 10, marginBottom: 4, fontSize: '0.8rem' }}>
                                    Quando faz sentido usar
                                </h4>
                                <ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    {method.whenToUse.map((item, index) => (
                                        <li key={`${method.id}-when-${index}`}>{item}</li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {method.caution && method.caution.length > 0 && (
                            <>
                                <h4 style={{ marginTop: 10, marginBottom: 4, fontSize: '0.8rem' }}>
                                    Cuidados
                                </h4>
                                <ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    {method.caution.map((item, index) => (
                                        <li key={`${method.id}-caution-${index}`}>{item}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </article>
                ))}
            </div>
        </div>
    );
}

export default MethodsPage;