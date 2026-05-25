Claro — aqui está o `architecture.md` já pronto em **Markdown puro**, direto pra colar no GitHub:

````md
# 🧠 Architecture - FAEDA CRM System

## 📌 Visão Geral

O sistema FAEDA CRM foi construído utilizando **Google Apps Script + Google Sheets**, com arquitetura modular e foco em automação financeira, controle de alunos, despesas e geração de relatórios.

Ele funciona como um **ERP leve baseado em planilhas**, com lógica distribuída por módulos e integração entre diferentes domínios de negócio.

---

## 🏗️ Camadas da Arquitetura

### 🔹 1. Camada de Dados (Google Sheets)

Responsável pelo armazenamento principal do sistema.

Inclui:

- Alunos
- Financeiro mensal
- Despesas
- Configurações
- Status de inadimplência

📌 Características:
- Estrutura tabular
- Cada aba representa uma entidade de negócio
- Baixo custo e alta integração

---

### 🔹 2. Camada de Lógica (Apps Script Core)

Responsável pelas regras de negócio.

Exemplos:

- `salvarRegistro()`
- `cadastrarNovoAluno()`
- `atualizarStatusAlunos()`
- `verificarDuplicidadeRegistro()`

📌 Função:
- Processamento de dados
- Validações
- Regras financeiras

---

### 🔹 3. Camada de Integração

Responsável pela comunicação entre módulos e planilhas.

Funções:

- Leitura de dados externos
- Escrita em múltiplas abas
- Sincronização entre sistemas

📌 Exemplo:
- Alunos ↔ Financeiro ↔ Despesas

---

### 🔹 4. Camada de Interface (UI)

Responsável pela interação com o usuário dentro do Google Sheets.

Inclui:

- Formulários internos
- Preenchimento automático
- Eventos `onEdit`

Funções:

- `preencherDadosAutomaticos()`
- Triggers de automação

---

### 🔹 5. Camada de Relatórios (BI)

Responsável pela geração de relatórios gerenciais.

Inclui:

- PDFs automáticos
- Indicadores financeiros (KPIs)
- Relatórios de inadimplência
- Relatórios executivos mensais

Funções:

- `gerarRelatorioMensalPDF()`
- `gerarRelatorioInadimplentesPDF()`

---

## 🔄 Fluxo Geral do Sistema

```mermaid
flowchart TD

A[Cadastro de Aluno] --> B[Planilha ALUNOS ATIVOS]
B --> C[Registro Financeiro]
C --> D[Planilha Financeira Mensal]
D --> E[Atualização de Status]
E --> F[Identificação de Inadimplência]
F --> G[Geração de Relatórios PDF]
G --> H[Envio por Email]
````

---

## 🧩 Modelagem de Dados

### 👤 Alunos

| Campo   | Descrição                    |
| ------- | ---------------------------- |
| ID      | Identificador único do aluno |
| Nome    | Nome completo                |
| Email   | Contato                      |
| Plano   | Tipo de serviço              |
| Status  | Adimplente / Inadimplente    |
| Vínculo | Categoria (Consultoria, etc) |

---

### 💰 Financeiro

| Campo          | Descrição           |
| -------------- | ------------------- |
| Data pagamento | Data do recebimento |
| Nome           | Nome do aluno       |
| Plano          | Serviço contratado  |
| Valor          | Valor pago          |
| Status         | Pago / Em aberto    |

---

### 💸 Despesas

| Campo     | Descrição          |
| --------- | ------------------ |
| Data      | Data da despesa    |
| Categoria | Tipo de gasto      |
| Natureza  | Empresa ou pessoal |
| Valor     | Valor da despesa   |

---

## ⚙️ Módulos do Sistema

| Módulo        | Responsabilidade            |
| ------------- | --------------------------- |
| alunos.gs     | Cadastro e gestão de alunos |
| financeiro.gs | Controle de pagamentos      |
| despesas.gs   | Registro de gastos          |
| registro.gs   | Orquestração de registros   |
| analytics.gs  | Relatórios e indicadores    |
| utils.gs      | Funções auxiliares          |

---

## 🧠 Padrões Arquiteturais

* Separação de responsabilidades (Separation of Concerns)
* Pipeline de execução (ex: salvarRegistro)
* Funções puras para cálculo
* Funções isoladas de escrita
* Normalização global de dados

---

## ⚠️ Limitações Atuais

* Uso de Google Sheets como banco de dados
* Forte acoplamento com planilhas
* Sem API externa
* Sem autenticação de usuários
* Escalabilidade limitada

---

## 🚀 Evolução Arquitetural

### Fase 1 — Atual

* Apps Script + Google Sheets
* Automação interna

### Fase 2

* WebApp com dashboard
* Interface mais amigável

### Fase 3

* Backend externo (Node.js / .NET)
* Banco de dados relacional

### Fase 4

* SaaS completo
* Multi-tenant
* Sistema escalável

---

## 🧭 Conclusão

O sistema FAEDA CRM evoluiu de uma automação em planilha para um **ERP leve funcional**, com arquitetura modular, relatórios automatizados e indicadores financeiros.

A estrutura atual permite evolução gradual para um sistema web completo sem necessidade de reescrever a lógica principal.