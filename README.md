# Plano de Testes de Software: Carrinho de Compras

Atividade prática de testes de software. O projeto implementa a função `calcularTotal`, que calcula o valor final de um carrinho de compras, e a valida com testes de **caixa preta**, executados de duas formas: manualmente (script `index.js`) e de forma automatizada (Jest).

## Estrutura do projeto

```
.
├── carrinho.js                       # Função calcularTotal (código testado)
├── carrinho.test.js                  # Testes automatizados com Jest
├── index.js                          # Testes manuais executados via console
├── package.json                      # Configuração do projeto e dependências
├── package-lock.json
└── documentacao_planodetestes.docx   # Documentação do plano de testes
```

## Regras de negócio

A função `calcularTotal(itens, cupom)` segue estas regras:

| Regra | Descrição |
|---|---|
| Subtotal | Soma de `preco * quantidade` de todos os itens |
| Cupom `PROMO10` | Aplica 10% de desconto sobre o subtotal |
| Frete grátis | Quando o subtotal (já com desconto) for **maior ou igual a R$ 100** |
| Frete pago | R$ 15,00 quando o subtotal for menor que R$ 100 |
| Arredondamento | O total final é arredondado para 2 casas decimais |
| Validação | Lança `Error("Carrinho inválido")` se o carrinho for vazio/nulo ou se algum item tiver quantidade menor ou igual a zero |

### Exemplo de uso

```javascript
const { calcularTotal } = require('./carrinho');

const itens = [{ preco: 50, quantidade: 1 }];

calcularTotal(itens, 'PROMO10'); // 60  (50 - 10% = 45, + R$ 15 de frete)
calcularTotal(itens, null);      // 65  (50 + R$ 15 de frete)
```

## Casos de teste

| ID | Descrição | Entrada | Resultado esperado |
|---|---|---|---|
| CT-01 | Frete grátis para compra de exatamente R$ 100 | 1 item de R$ 100, sem cupom | `100` |
| CT-02 | Desconto de 10% com o cupom PROMO10 | 1 item de R$ 50, cupom `PROMO10` | `60` |
| CT-03 | Erro para item com quantidade negativa ou zero | 1 item de R$ 10, quantidade `-2` | Erro "Carrinho inválido" |
| CT-04 | Arredondamento para duas casas decimais | 1 item de R$ 33,333, sem cupom | `48.33` |
| CT-05 | Erro para carrinho vazio | `[]` | Erro "Carrinho inválido" |
| CT-06 | Frete de R$ 15 para compra abaixo de R$ 100 | 1 item de R$ 80, sem cupom | `95` |

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado

### Instalação

```bash
npm install
```

### Testes automatizados (Jest)

```bash
npm test
```

Resultado esperado: **6 testes passando**.

### Testes manuais (console)

```bash
node index.js
```

O script imprime, para cada caso, o valor esperado, o valor obtido e se o teste `PASSOU` ou `FALHOU`.

## Evolução dos testes: antes e depois da correção

Na primeira execução, 3 dos 6 casos falharam. Todos foram corrigidos na função `calcularTotal`, sem alterar as expectativas dos testes.

| Caso | Esperado | Obtido (antes) | Problema identificado | Correção aplicada |
|---|---|---|---|---|
| CT-01 | `100` | `115` | O frete de R$ 15 era cobrado em compras de exatamente R$ 100 | A condição de frete grátis passou a usar `>=` em vez de `>` |
| CT-02 | `60` | `55` | O desconto do cupom não estava sendo aplicado corretamente | O desconto de 10% passou a ser aplicado sobre o subtotal antes do cálculo do frete |
| CT-04 | `48.33` | `48.333` | O total final não era arredondado | Retorno com `Number(total.toFixed(2))` |

Os casos CT-03, CT-05 e CT-06 passaram em ambas as execuções.

**Resultado final:** 6 de 6 testes passando.


