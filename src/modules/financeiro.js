//=============================================================
// VERIFICA SE JÁ TEM ABA DO MÊS CORRENTE
//=============================================================
function obterOuCriarAbaFinanceira(nomeAba) {

  const planilhaFinanceiro = SpreadsheetApp.openById(
    CONFIG.IDS.FINANCEIRO
  );

  let aba = planilhaFinanceiro.getSheetByName(nomeAba);

  if (aba) {
    return aba;
  }

  aba = planilhaFinanceiro.insertSheet(nomeAba);

  const cabecalho = [[
    "Data do Pagamento",
    "Nome do Aluno",
    "Plano Contratado",
    "Vínculo",
    "Data de Vencimento",
    "Valor Pago",
    "Status"
  ]];

  aba
    .getRange(1, 1, 1, cabecalho[0].length)
    .setValues(cabecalho);

  return aba;
}

//=============================================================
// CONFIRMA O PAGAMENTO PARA O FINANCEIRO
//=============================================================
function salvarLinhaFinanceira(
  aba,
  ctx,
  vinculoAluno,
  dataVencimento
) {

  const proximaLinha = 
    aba.getLastRow() + 1;

    const novaLinha = [];

    novaLinha[
      COLUNAS_FINANCEIRO.DATA_PAGAMENTO
      ] = new Date();

    novaLinha[
      COLUNAS_FINANCEIRO.NOME
      ] = ctx.nomeAluno;

    novaLinha[
      COLUNAS_FINANCEIRO.PLANO
      ] = ctx.plano;
    
    novaLinha[
      COLUNAS_FINANCEIRO.VINCULO
      ] = vinculoAluno;

    novaLinha[
      COLUNAS_FINANCEIRO.VENCIMENTO
      ] = dataVencimento;
    
    novaLinha[
      COLUNAS_FINANCEIRO.VALOR
      ] = ctx.valor;

    novaLinha[
      COLUNAS_FINANCEIRO.STATUS
      ] = ctx.status;

      aba
        .getRange(
          proximaLinha,
          1,
          1,
          novaLinha.length
          )
    .setValues([novaLinha]);
}

//=============================================================
// VERIFIFICA A DUPLICIDADE
//=============================================================
function verificarDuplicidadeRegistro(
  nomeAba,
  nomeAluno
) {

  const planilhaFinanceiro = 
  SpreadsheetApp.openById(
    CONFIG.IDS.FINANCEIRO
  );

  const aba = 
    planilhaFinanceiro.getSheetByName(
      nomeAba
      );

  if (!aba) return;

  const dados = 
    aba.getDataRange().getValues();

  const nomeNormalizado = 
    normalizarTexto(nomeAluno);

  const existeRegistro = 
    dados.some((linha, index) => {

    if (index === 0) return false;

    return (
      normalizarTexto(
        linha[COLUNAS_ALUNO.NOME]
      ) === nomeNormalizado
    );
  });

  if (existeRegistro) {
    throw new Error(
      `OPA OPA!!! Já existe registro para ${nomeAluno} em ${nomeAba}.`
    );
  }
}