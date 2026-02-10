# 💳 Testes de API para Gateway de Pagamento (Zoop Sandbox)
## 💡 Contexto de Negócio
Coleção de testes para APIs de gateway de pagamento, baseada na minha experiência com Zoop entre 2019 e 2022. O foco é validar fluxos críticos de transações financeiras com atenção especial à segurança PCI-DSS e estabilidade das integrações usadas por marketplaces e e-commerce.
## 📊 Resultados no Projeto BIPP
| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| Cobertura de testes de integração | 60% | 90% | +30 pontos percentuais |
| Transações com falha não detectada | 5% | 0,8% | redução de 84% |
| Tempo de validação por release | 8h | 2h | ganho de 75% |

## Como Executar
### Opção 1: Postman (recomendado)
1. Importe a coleção: postman/collections/payment-api.json
2. Importe o ambiente: postman/environments/sandbox.json
3. Use o Collection Runner para executar todos os testes

### Opção 2: Linha de comando com Newman
```bash
npm install
npx newman run postman/collections/payment-api.json -e postman/environments/sandbox.json --reporters cli,html --reporter-html-export report.html
```
#### Opção 3: Testes unitários (simulação)
```bash
node tests/api-tests.js
```

Estrutura do Projeto
api-payment-tests/
├── postman/
│   ├── collections/
│   │   └── payment-api.json
│   └── environments/
│       └── sandbox.json
├── tests/
│   └── api-tests.js
├── .gitignore
├── package.json
└── README.md891011

### 🔒 Conformidade PCI-DSS
* Validação de CVV sem armazenamento em banco
* Mascaramento de cartões (ex: ************1111)
* Comunicação com TLS 1.2+
* Tokens OAuth2 com expiração curta

> ✨ **Feito por Cleilson José** — trabalhei com gateways de pagamento na BIPP Tecnologia (2019-2022) e desenvolvi esses testes para compartilhar conhecimento prático com a comunidade.