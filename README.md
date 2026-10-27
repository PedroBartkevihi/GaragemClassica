# Garagem Clássica — Site de carros clássicos (projeto de estudo)

**Ver online:** https://pedrobartkevihi.github.io/GaragemClassica/

Site **fictício** de uma loja de compra e venda de carros clássicos, criado
**para fins de estudo**. Partindo de um exercício de curso feito só com HTML e
CSS, o objetivo foi modernizar o visual — layout, tipografia, cores,
espaçamentos, botões, cards, responsividade e pequenas interações — mantendo a
estrutura de várias páginas e o estilo de escrita do código original.

A loja **Garagem Clássica**, os veículos, os depoimentos e os dados de contato
e endereço são inventados para este projeto e não correspondem a nenhuma
pessoa ou empresa real.

## Tecnologias

- HTML5 (site de 4 páginas, sem framework)
- CSS3 (variáveis em `:root`, flexbox, grid, `clamp()` e media queries)
- JavaScript (vanilla, sem dependências)
- [Google Fonts](https://fonts.google.com/) — Oswald e Barlow

Sem etapa de build: é só abrir o `index.html`.

## Estrutura

```
Projeto4/
├── index.html            (home: banner, destaques, serviços/depoimentos, contato)
├── venda.html            (vitrine com filtro de preço e década)
├── veiculo-teste.html    (página de um veículo, com galeria de fotos)
├── sobre.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── imagens/
    ├── hero.jpg
    ├── carro-1..6.jpg    (vitrines)
    ├── veiculo-1..5.jpg  (fotos da página de veículo)
    └── sobre-1..2.jpg
```

O ícone do logo, as setas e os selos do banner são feitos em SVG/CSS (sem
depender de imagem).

## Interações (`js/script.js`)

- Menu mobile (abre/fecha pelo botão, `Esc`, clique fora ou em link).
- Sombra no cabeçalho ao rolar a página.
- Elementos `[data-revelar]` surgem ao entrar na tela (`IntersectionObserver`).
- Carrossel de depoimentos (setas prev/next).
- Página de Venda: filtro de veículos por preço (range) e por década (radios).
- Página de Veículo: galeria — clique na miniatura troca a foto principal e as
  setas rolam a faixa de miniaturas.
- Feedback ao enviar o formulário (não há back-end).
- Respeita `prefers-reduced-motion` e funciona sem JavaScript.

## Como executar

Abra o `index.html` no navegador, ou rode um servidor estático na pasta do
projeto:

```bash
python -m http.server 8080
```

E acesse `http://localhost:8080`.

## Créditos das imagens

As fotos vêm do [Pexels](https://www.pexels.com/) (licença livre, sem
necessidade de atribuição) e foram apenas redimensionadas e otimizadas.

## Uso

Repositório de **estudo de front-end, sem fins comerciais**. O código-fonte
(HTML, CSS e JavaScript) é de autoria de **Pedro Farias** e pode ser
reaproveitado livremente. Toda a identidade (nome da loja, veículos, textos e
contatos) é fictícia.
