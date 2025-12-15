// src/trainingMethods.js

const trainingMethods = [
    {
        id: 'convencional',
        name: 'Convencional',
        badgeColor: '#60a5fa',
        shortDescription: 'Série tradicional com carga estável e descanso normal entre as séries.',
        howTo: [
            'Defina a carga de acordo com a faixa de repetições planejada.',
            'Execute todas as repetições com movimento controlado.',
            'Descanse o tempo combinado e repita o processo nas próximas séries.'
        ],
        whenToUse: [
            'Serve como base para qualquer treino bem estruturado.',
            'Facilita o controle de volume e de progressão de carga.',
            'Costuma ser menos estressante para o sistema nervoso do que métodos avançados.'
        ],
        cautions: [
            'Mantenha a técnica sempre em primeiro lugar, mesmo em séries simples.',
            'Progrida a carga aos poucos, sem pressa e sem sacrificar a execução.'
        ],
        aliases: ['convencional', 'Convencional']
    },
    {
        id: 'drop_set',
        name: 'Drop-set',
        badgeColor: '#38bdf8',
        shortDescription: 'Ao terminar a série, reduza a carga e continue sem descanso.',
        howTo: [
            'Escolha uma carga que leve perto da falha muscular.',
            'Ao terminar as repetições, reduza a carga em torno de 20% a 30% e continue.',
            'Repita esse processo duas ou três vezes na mesma série, se fizer sentido para o treino.'
        ],
        whenToUse: [
            'Aumenta o tempo sob tensão muscular.',
            'Ótimo para finalizar o músculo no fim do treino.',
            'Funciona muito bem em máquinas e halteres.'
        ],
        cautions: [
            'Use com moderação, pois a fadiga acumulada é alta.',
            'Evite aplicar em todos os exercícios do treino.'
        ],
        aliases: ['drop-set', 'drop set', 'Drop-set']
    },
    {
        id: 'piramide_crescente',
        name: 'Pirâmide crescente',
        badgeColor: '#a855f7',
        shortDescription: 'Comece mais leve e aumente a carga enquanto reduz as repetições.',
        howTo: [
            'Inicie com uma série usando carga mais leve e repetições mais altas.',
            'Em cada série seguinte, aumente a carga e reduza um pouco as repetições.',
            'Exemplo: 15 repetições, depois 12, depois 10, depois 8.'
        ],
        whenToUse: [
            'Aquece bem a musculatura ao longo das primeiras séries.',
            'Ajuda a encontrar a carga ideal à medida que o exercício progride.',
            'Boa opção para exercícios principais, como supino ou agachamento guiado.'
        ],
        cautions: [
            'Evite começar leve demais para não gastar energia à toa.',
            'Mantenha a técnica estável mesmo quando a carga aumentar.'
        ],
        aliases: ['pirâmide crescente', 'piramide crescente', 'Piramide Crescente']
    },
    {
        id: 'piramide_decrescente',
        name: 'Pirâmide decrescente',
        badgeColor: '#f97316',
        shortDescription: 'Comece mais pesado com poucas repetições e depois reduza a carga.',
        howTo: [
            'Inicie com uma série usando carga mais alta e poucas repetições.',
            'Em cada série seguinte, reduza um pouco a carga e aumente as repetições.',
            'Exemplo: 8 repetições, depois 10, depois 12, depois 15.'
        ],
        whenToUse: [
            'Permite usar mais força logo no início, quando há menos fadiga.',
            'Mantém o músculo trabalhando em diferentes faixas de repetições.'
        ],
        cautions: [
            'Capriche no aquecimento antes da primeira série pesada.',
            'Evite exagerar na carga para não comprometer a técnica.'
        ],
        aliases: ['pirâmide decrescente', 'piramide decrescente', 'Piramide Decrescente']
    },
    {
        id: 'cluster_set',
        name: 'Cluster set',
        badgeColor: '#22c55e',
        shortDescription: 'Divida uma série longa em mini blocos com pausas bem curtas.',
        howTo: [
            'Escolha uma carga relativamente alta.',
            'Faça um pequeno bloco de repetições, por exemplo 4 ou 5.',
            'Descanse de 10 a 20 segundos e repita o bloco.',
            'Some todos os blocos, que contam como uma única série estendida.'
        ],
        whenToUse: [
            'Permite trabalhar com cargas altas por mais tempo.',
            'Ajuda a manter a técnica graças aos minidescansos.',
            'Boa opção para ganhos de força e hipertrofia.'
        ],
        cautions: [
            'Controle bem o tempo das pausas, senão o método perde o efeito.',
            'Evite usar em todos os exercícios para não tornar o treino excessivamente longo.'
        ],
        aliases: ['cluster set', 'Cluster set', 'Cluster']
    },
    {
        id: 'bi_set',
        name: 'Bi-set',
        badgeColor: '#ec4899',
        shortDescription: 'Dois exercícios seguidos para o mesmo músculo, sem descanso entre eles.',
        howTo: [
            'Escolha dois exercícios que combinem bem para o mesmo músculo.',
            'Execute a série completa do primeiro exercício.',
            'Sem descansar, passe imediatamente para o segundo.',
            'Descanse apenas depois de completar os dois exercícios.'
        ],
        whenToUse: [
            'Aumenta bastante a intensidade do treino.',
            'Ajuda a economizar tempo, já que concentra mais trabalho em menos séries.',
            'Boa estratégia para músculos que respondem bem a maior volume de treino.'
        ],
        cautions: [
            'Reduza um pouco a carga em relação ao que usaria em séries isoladas.',
            'Controle a respiração, pois o esforço contínuo é maior.'
        ],
        aliases: ['bi-set', 'bi set', 'Bi-set']
    },
    {
        id: 'pico_contracao',
        name: 'Pico de contração',
        badgeColor: '#eab308',
        shortDescription: 'Segure um ou dois segundos no ponto de máxima contração do movimento.',
        howTo: [
            'Execute o movimento de forma controlada até o ponto de maior contração.',
            'Segure a posição por um ou dois segundos.',
            'Retorne controlando a fase excêntrica, sem deixar a carga cair.'
        ],
        whenToUse: [
            'Melhora a conexão mente músculo.',
            'Mantém o músculo sob tensão por mais tempo.',
            'Funciona muito bem para panturrilhas, bíceps e ombros.'
        ],
        cautions: [
            'Evite travar completamente as articulações.',
            'Se a carga estiver alta demais, será difícil segurar o pico com boa técnica.'
        ],
        aliases: ['pico de contração', 'pico de contracao', 'Pico de contração']
    },
    {
        id: 'falha_total',
        name: 'Falha total',
        badgeColor: '#f97373',
        shortDescription: 'Leve a série até o ponto em que não sai mais uma repetição com técnica segura.',
        howTo: [
            'Escolha uma carga adequada para a faixa de repetições planejada.',
            'Execute o movimento até não conseguir realizar outra repetição com técnica segura.',
            'Ao atingir esse ponto, encerre a série de forma controlada.'
        ],
        whenToUse: [
            'Pode gerar um estímulo forte para o músculo quando aplicado com critério.',
            'Geralmente funciona melhor na última série de um exercício.'
        ],
        cautions: [
            'Use com moderação, pois o desgaste é maior.',
            'Evite aplicar falha total em exercícios extremamente pesados ou complexos.'
        ],
        aliases: ['falha total', 'Falha total']
    },
    {
        id: 'negativa',
        name: 'Negativa',
        badgeColor: '#67e8f9',
        shortDescription: 'Destaque para a fase excêntrica, descida lenta com controle de quatro a cinco segundos.',
        howTo: [
            'Execute o movimento de forma controlada.',
            'A fase de descida deve ser intencionalmente lenta e controlada, durando de quatro a cinco segundos.',
            'A fase de subida pode ser mais explosiva, desde que a técnica se mantenha.'
        ],
        whenToUse: [
            'Aumenta o dano muscular controlado, ideal para hipertrofia.',
            'Ajuda a fortalecer o músculo sob tensão prolongada.',
            'Boa opção para exercícios como banco flexor e variações guiadas.'
        ],
        cautions: [
            'Reduza a carga se for difícil manter o controle lento da descida.',
            'Foque na técnica para evitar lesões por excesso de estresse na fase excêntrica.'
        ],
        aliases: ['negativa', 'Negativa']
    },
    {
        id: 'cardio_140',
        name: 'Cardio 140 bpm',
        badgeColor: '#4ade80',
        shortDescription: 'Zona de intensidade estratégica em torno de 140 batimentos por minuto.',
        howTo: [
            'Monitore sua frequência cardíaca durante os 15 a 30 minutos de esteira ou bicicleta.',
            'Ajuste a velocidade e a inclinação, se for o caso, para manter seu batimento em torno de 140 bpm.',
            'O ritmo deve permitir falar frases curtas, porém sem manter uma conversa longa.'
        ],
        whenToUse: [
            'Melhora a capacidade cardiorrespiratória.',
            'Ajuda na composição corporal, favorecendo o uso de gordura como energia.',
            'Serve como complemento que não atrapalha a recuperação da musculação quando bem controlado.'
        ],
        cautions: [
            'Evite intensidade tão alta que gere fadiga que comprometa os treinos de força.',
            'Mantenha a intensidade constante e controlada durante todo o período.',
            'Cuide da hidratação antes, durante e depois do exercício.'
        ],
        aliases: ['cardio 140 bpm', 'cardio140', 'Cardio 140 bpm']
    }
];

export function getAllTrainingMethods() {
    return trainingMethods;
}

export function findTrainingMethodByName(name) {
    if (!name) {
        return trainingMethods.find((m) => m.id === 'convencional');
    }

    const lower = name.toLowerCase().trim();

    const direct = trainingMethods.find((m) =>
        m.aliases.some((alias) => alias.toLowerCase() === lower)
    );

    return direct || trainingMethods.find((m) => m.id === 'convencional');
}