# 📊 CRM Esportivo & Gestão Financeira - Faêda Consultoria

Este repositório contém o código-fonte do Sistema de Gestão Automatizado desenvolvido no Google Apps Script (JavaScript) para a consultoria esportiva Faêda. O sistema gerencia matrículas, pagamentos mensais (via Google Forms), controle de despesas e geração de relatórios executivos em PDF.

## 🏗️ Arquitetura do Sistema
O princípio fundamental deste CRM é a **descentralização de dados**. Para garantir performance e segurança de acesso, o sistema não utiliza uma planilha única. Ele é estruturado em três bases de dados independentes que se comunicam via API (SpreadsheetApp) usando IDs seguros:

1. **Financeiro (Módulo Principal):** Onde os formulários de pagamento chegam e os relatórios são gerados. As abas são separadas por mês (ex: "abril", "maio").
2. **BD Alunos (Módulo Externo):** Banco de dados central com a relação de todos os alunos, planos, acompanhamentos e status (Ativo/Inativo).
3. **Despesas Faêda (Módulo Externo):** Planilha apartada para registro de custos operacionais da empresa e saques pessoais.

## 🚀 Funcionalidades (Módulos)

### 1. Processamento de Pagamentos (`processarNovoEnvio`)
Acionado via gatilho (Trigger) sempre que um aluno preenche o formulário de pagamento.
* **Normalização Extrema:** Limpa acentos, caracteres especiais e espaços invisíveis para garantir 100% de precisão no cruzamento de dados.
* **Prevenção de Objetos Java:** Coerção rigorosa de dados para `String` para evitar vazamentos de memória da máquina virtual do Google (`[Ljava.lang.Object;`).
* **Busca Inteligente (Cascata):** Prioriza a busca dos dados (Plano, Acompanhamento, Vencimento) na aba do mês anterior para ganho de performance. Caso seja aluno novo, faz o fallback acessando o BD Alunos externamente.

### 2. Processamento em Massa ("O Trator" - `processarRegistrosAntigos`)
Script de varredura para ler respostas acumuladas no Google Forms e processar todos os alunos retroativamente, depositando os dados higienizados e estruturados na aba do mês vigente.

### 3. Soft Delete de Alunos (`desativarAluno`)
Interface que solicita o nome do aluno e realiza a transferência física da linha da aba "ALUNOS ATIVOS" para "INATIVOS" no banco de dados externo, mantendo o histórico intacto e limpando a base principal.

### 4. Relatório Executivo em PDF (`gerarRelatorioMensalPDF`)
Módulo de inteligência de negócios (BI) que:
* Captura a Receita Bruta da planilha Financeira.
* Captura e segrega as Despesas (Custos da Empresa vs. Gastos Pessoais) da planilha de Despesas.
* Calcula KPIs de negócio (Ticket Médio, Margem Operacional).
* Destaca o item de maior impacto financeiro do mês.
* Compila os dados em um template HTML estilizado.
* Converte o HTML para PDF, salva um backup no Google Drive e dispara automaticamente por e-mail para os stakeholders.

## 🔐 Segurança e Variáveis de Ambiente
Nenhuma URL ou ID sensível está *hardcoded* (fixa) no código-fonte dos processadores lógicos. O sistema utiliza o `PropertiesService` do Google Apps Script para armazenar os IDs das planilhas como variáveis de ambiente da nuvem.

### Como configurar em um novo ambiente:
Antes de acionar as automações, é necessário rodar o script de configuração uma única vez no editor:

```javascript
function configurarPropriedades() {
  const props = PropertiesService.getScriptProperties();
  props.setProperties({
    'ID_DE_ESCOLHA': 'INSIRA_O_ID_AQUI',
    'ID_DE_ESCOLHA': 'INSIRA_O_ID_AQUI',
    'ID_DE_ESCOLHA': 'INSIRA_O_ID_AQUI',
  });
}
```

## ⚙️ Instalação e Deploy
1. Crie um projeto no [Google Apps Script](https://script.google.com/) vinculado à sua planilha Financeira.
2. Copie os arquivos `.gs` deste repositório para o editor.
3. Insira os IDs reais das suas planilhas e execute a função `configurarPropriedades()`.
4. Conceda as permissões de acesso da Conta Google (OAuth) solicitadas.
5. No menu lateral "Acionadores" (Triggers), crie um novo gatilho para a função `processarNovoEnvio` selecionando o evento **"Ao enviar formulário"**.

---
*Desenvolvido por Jhonata Caetano - Analista de Sistemas*
