# 📊 FAEDA CRM & FINANCE SYSTEM

Sistema de gestão financeira e operacional desenvolvido em **Google Apps Script + Google Sheets**, com automação completa de processos administrativos, controle de alunos, faturamento, despesas e relatórios gerenciais.

---

## 🚀 Visão Geral

O sistema evoluiu de uma simples planilha para um **ERP leve de gestão financeira**, capaz de:

- Gerenciar alunos ativos e inativos
- Automatizar cobranças e registros financeiros
- Controlar inadimplência
- Registrar despesas operacionais e pessoais
- Gerar relatórios executivos em PDF
- Calcular indicadores financeiros automaticamente

---

## 🧠 Arquitetura

O sistema segue uma arquitetura modular dentro do Google Apps Script:

```

/core          → Configuração e lógica principal
/modules       → Regras de negócio (alunos, financeiro, etc.)
/ui            → Interações com usuário (formulários)
/utils         → Funções auxiliares
/docs          → Documentação do sistema

```

---

## ⚙️ Tecnologias

- Google Apps Script
- Google Sheets (como banco de dados)
- HTML Service (relatórios)
- MailApp (envio de emails automáticos)
- Drive API (armazenamento de PDFs)

---

## 📦 Módulos do Sistema

### 👤 Gestão de Alunos
- Cadastro de alunos
- Geração automática de ID
- Desativação de alunos
- Segmentação entre ativos e inativos

### 💰 Financeiro
- Registro de pagamentos
- Criação automática de abas mensais
- Controle de duplicidade de registros
- Separação de receita por competência

### 💸 Despesas
- Registro de despesas operacionais
- Classificação entre empresa e pessoal
- Integração com planilha externa

### 📊 Inadimplência
- Identificação automática de alunos inadimplentes
- Geração de relatório em PDF
- Envio automático por e-mail

### 📈 Analytics & BI
- Receita bruta
- Lucro operacional
- Saldo final
- Ticket médio
- Margem operacional
- Maior despesa do mês

---

## 🔄 Fluxo do Sistema

```

Cadastro de aluno
↓
Registro financeiro
↓
Atualização de status
↓
Controle de inadimplência
↓
Relatórios automáticos

```

---

## 📄 Relatórios Gerados

- 📌 Relatório de inadimplentes (PDF)
- 📌 Relatório financeiro mensal
- 📌 Relatório executivo de gestão

---

## 📊 Principais Indicadores (KPIs)

- Receita total
- Despesas operacionais
- Despesas pessoais
- Lucro operacional
- Saldo final
- Ticket médio
- Taxa de inadimplência

---

## ⚡ Destaques Técnicos

- Arquitetura modular dentro do Apps Script
- Separação entre lógica de negócio e UI
- Uso de normalização de dados para consistência
- Geração dinâmica de relatórios HTML → PDF
- Automação de processos administrativos
- Sistema de competência financeira mensal

---

## ⚠️ Limitações Atuais

- Dependência total do Google Sheets como banco de dados
- Execução limitada ao ambiente Apps Script
- Sem interface web dedicada (UI baseada em planilha)
- Performance dependente do volume de dados do Sheets

---

## 🚀 Possíveis Evoluções

- WebApp com dashboard próprio
- Banco de dados externo (Firestore / PostgreSQL)
- Sistema de autenticação (login)
- Painel BI com gráficos em tempo real
- API REST para integrações

---

## 🧑‍💻 Autor

Desenvolvido por **Jhonata Caetano**

Sistema criado com foco em automação, eficiência operacional e evolução para ERP leve.

---

## 📌 Status do Projeto

✔ Em produção  
✔ Em evolução contínua  
✔ Uso real em operação  

---

## 🔥 Nota Final

Este projeto representa a evolução de uma solução baseada em planilhas para um **ERP funcional com automação e inteligência operacional**, construído inteiramente em Google Apps Script.