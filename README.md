# Faêda Cloud ERP

<p align="center">
  <strong>Mini-ERP em Nuvem desenvolvido com Google Sheets + Apps Script</strong><br>
  Arquitetura distribuída • Regras de negócio robustas • Automação financeira
</p>
<p align="center">
O projeto aplica princípios de arquitetura de software corporativa em um ambiente low-code, estruturando separação de camadas, regras de negócio, controle de integridade e automação financeira.
</p>

---

## 🎯 Objetivo do Projeto

Transformar planilhas isoladas em um **Sistema Integrado de Gestão**, com:

- Separação entre interface e base de dados
- Regras de negócio automatizadas
- Controle financeiro estruturado
- Geração automática de relatórios
- Arquitetura preparada para escalabilidade futura

---

## 🏗 Arquitetura do Sistema

O sistema foi estruturado em três camadas:

### 1️⃣ Camada de Apresentação (Front-end)
Google Sheets (Painel/CRM)
- Formulários de entrada
- Botões de ação
- Dashboard
- Interface do usuário

### 2️⃣ Camada de Aplicação (Back-end Lógico)
Google Apps Script
- Validação de regras de negócio
- Controle anti-duplicidade
- Roteamento dinâmico por mês
- Geração automática de PDF
- Envio automático por e-mail
- Controle de concorrência com LockService
- Geração de IDs únicos (UUID)

### 3️⃣ Camada de Dados (Back-end Persistente)
Planilhas segregadas:

- `[BD] Alunos`
- `[BD] Financeiro` (separado por abas mensais)
- `[BD] Despesas`

Essa separação garante melhor organização, segurança e performance.

---

## 📊 Funcionalidades

- Cadastro estruturado de alunos
- Classificação por vínculo (Personal ou Consultoria)
- Registro de pagamentos com validação inteligente
- Controle de despesas categorizadas
- Bloqueio de lançamentos duplicados
- Cálculo automático de lucro líquido mensal
- Geração de relatório financeiro em PDF
- Envio automático de relatório por e-mail
- Estrutura pronta para dashboard analítico

---

## 🧠 Principais Decisões Arquiteturais

- Separação entre interface e base de dados
- Uso de UUID para identificação única de entidades
- Estratégia de Soft Delete (evita exclusões físicas)
- Controle de concorrência com LockService
- Estrutura modular de serviços no Apps Script
- Validação defensiva antes de qualquer gravação
- Preparação para futura migração para banco estruturado (Firestore/API própria)

---

## 🚀 Roadmap de Evolução

- Implementação de RBAC (controle por perfil)
- Sistema completo de auditoria (log estruturado)
- Dashboard executivo em tempo real
- API WebApp para integração externa
- Migração para banco NoSQL (Firestore)
- Versão multiusuário escalável

---

## 💡 Diferencial Técnico

Este projeto demonstra que princípios de arquitetura corporativa podem ser aplicados mesmo em ambientes como Google Sheets.

A robustez não está na ferramenta, mas na modelagem, estrutura e decisões técnicas.

---

## 📎 Tecnologias Utilizadas

- Google Sheets
- Google Apps Script (V8)
- Gmail Service
- LockService
- Utilities (UUID)
- JavaScript

- ## 📚 Documentação Técnica

- [Arquitetura do Sistema](docs/arquitetura.md)
- [Modelo de Dados](docs/modelo-de-dados.md)
- [Regras de Negócio](docs/regras-de-negocio.md)

