# **Vitalità**

### Meu diário inteligente de treinos, evolução e performance

O Vitalità nasceu de uma necessidade minha. Sempre treinei com consistência, mas percebia que faltava um lugar simples e organizado para registrar meus exercícios, acompanhar o peso usado, anotar observações e, principalmente, **ver minha evolução real ao longo do tempo**.

Testei vários apps, mas nenhum entregava exatamente o que eu queria, então decidi criar o meu próprio. Aproveitei também para aplicar os meus estudos em JavaScript. Desenvolver algo do meu dia a dia tornou o aprendizado muito mais significativo.

Assim surgiu o **Vitalità**.

---

## Por que eu criei o Vitalità

Eu queria um app que:

* Não perdesse informações ao atualizar a página
* Me deixasse registrar peso e observações rapidamente
* Mostrasse gráficos reais da minha evolução
* Funcionasse no celular como se fosse um aplicativo nativo
* Tivesse um visual limpo, moderno e agradável

Com isso em mente, comecei escrevendo as primeiras telas, testei durante meus treinos e fui ajustando exatamente como eu gostaria de usar.

---

## O que o Vitalità faz

### ✓ Registro completo do treino

* Exercícios organizados por sessão
* Checkbox para marcar conclusão
* Campo de peso
* Campo de observações para exercícios combinados ou variações
* Salvamento automático
* Nada se perde ao recarregar a página ou fechar o navegador

### ✓ Histórico visual

* Lista de todas as sessões que já concluí
* Filtro por treino e por exercício
* Registro detalhado de peso e observações
* **Gráfico de evolução** que mostra claramente como o peso aumentou ao longo do tempo

### ✓ Visual premium

* Fundo escuro com gradiente que lembra a estética do Atlas
* Botões com glow suave
* Cards com vidro e profundidade
* Interface minimalista
* Focado no uso diário, sem distrações

### ✓ Funciona perfeitamente no celular

* Design responsivo
* Inputs que se adaptam bem na tela pequena
* Pode ser instalado diretamente na tela inicial
* Quando aberto assim, some a barra do Safari e fica com cara de app nativo

---

## Tecnologias usadas

* **React + Vite**
* **LocalStorage** para salvar o treino localmente
* **Firebase** preparado para evolução futura
* **CSS puro** para construir toda a identidade visual
* **SVG e cálculos próprios** para o gráfico de evolução

---

## Como instalar no celular

1. Abra o endereço do Vitalità no Safari ou Chrome
2. Toque em *Compartilhar*
3. Selecione **Adicionar à Tela de Início**
4. Abra pelo ícone
5. O app ficará em tela cheia, sem barras do navegador

Essa foi uma das coisas que mais me surpreendeu quando testei. A sensação é de um app nativo.

---

## 🛠 Como rodar o projeto na minha máquina

```bash

npm install
npm run dev
```

Para gerar o build:

```bash

npm run build
```

---

## Estrutura principal

```
src/
  App.jsx
  HomePage.jsx
  WorkoutSession.jsx
  HistoryPage.jsx
  firebaseConfig.js
  style.css
  main.jsx
```

---

## Próximas ideias que quero implementar

* Tornar o Vitalità um PWA completo
* Opção de backup automático no Firebase
* Comparação entre treinos
* Histórico por período
* Exportar treinos em PDF
* Modo claro e modo escuro
* Widget para ver o treino do dia na tela inicial

---

## Sobre o projeto

Este é um projeto pessoal de estudo, evolução e disciplina. Desenvolver o Vitalità tem sido uma forma de unir minhas duas rotinas diárias: programar e treinar.

E é muito gratificante ver que algo que eu mesmo precisei se transformou em algo real e útil.
