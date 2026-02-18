# Arquitetura do Sistema

## 1. Visão Geral

O Faêda Cloud ERP foi projetado como um sistema distribuído dentro do Google Workspace.

A arquitetura segue o modelo de três camadas:

- Apresentação
- Aplicação
- Dados

---

## 2. Fluxo de Funcionamento

1. Usuário interage com formulário no Google Sheets
2. Botão aciona função no Apps Script
3. Sistema valida regras de negócio
4. Sistema verifica duplicidade
5. LockService garante escrita atômica
6. Registro é salvo na planilha correspondente
7. Evento é registrado em log (estrutura preparada)

---

## 3. Estratégia de Concorrência

Utilização de:

LockService.getScriptLock()

Evita condições de corrida quando múltiplos usuários executam ações simultaneamente.

---

## 4. Separação de Dados

A interface (CRM) não armazena dados históricos pesados.

Os dados são segregados em planilhas específicas:

- Base de Alunos
- Base Financeira
- Base de Despesas

Essa abordagem melhora organização, manutenção e escalabilidade.

---

## 5. Geração de Relatórios

O fechamento mensal:

- Soma entradas com status "Pago"
- Soma despesas do período
- Calcula lucro líquido
- Gera PDF formatado
- Envia automaticamente por e-mail
