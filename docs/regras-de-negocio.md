# Regras de Negócio

## 1. Validação de Pagamento

- Nome do aluno é obrigatório
- Status é obrigatório
- Se vínculo = Personal → valor é obrigatório

---

## 2. Regra Anti-Duplicidade

Antes de salvar pagamento:

- Verifica se já existe registro para o aluno no mês corrente
- Bloqueia duplicidade

---

## 3. Cálculo de Resultado

Lucro Líquido = Entradas Pagas - Despesas do mês

---

## 4. Roteamento Mensal

Se aba do mês não existir:

- Criar automaticamente
- Inserir registro na aba correspondente

---

## 5. Estratégia de Exclusão

Não há exclusão física.

Registros podem ser marcados como inativos (Soft Delete).
