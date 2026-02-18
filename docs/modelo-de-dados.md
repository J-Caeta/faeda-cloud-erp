# Modelo de Dados

## Entidade: Aluno

- id (UUID)
- nome
- plano
- vinculo (Personal | Consultoria)
- ativo (boolean)

---

## Entidade: TransacaoFinanceira

- id (UUID)
- alunoId
- mesReferencia
- valor
- status
- dataRegistro

---

## Entidade: Despesa

- id (UUID)
- categoria
- descricao
- valor
- data
