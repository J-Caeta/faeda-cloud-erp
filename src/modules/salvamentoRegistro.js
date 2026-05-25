//=============================================================
// Função principal (orquestradora)
//=============================================================
function salvarRegistro() {
  try {

    const contexto = obterContextoRegistro();

    validarFormularioRegistro(contexto);

    const competencia = obterCompetenciaRegistro(contexto);

    const vinculoAluno = buscarVinculoAluno(contexto.nomeAluno);

    verificarDuplicidadeRegistro(
      competencia.nomeAba,
      contexto.nomeAluno
    );

    const abaFinanceira = obterOuCriarAbaFinanceira(
      competencia.nomeAba
    );

    salvarLinhaFinanceira(
      abaFinanceira,
      contexto,
      vinculoAluno,
      competencia.dataVencimento
    );

    limparFormularioRegistro(contexto.abaRegistro);

    contexto.planilha.toast(
      `Registro salvo em ${competencia.nomeAba}`
    );

  } catch (erro) {

    Logger.log(erro);

    SpreadsheetApp.getUi().alert(
      `Erro ao salvar registro: ${erro.message}`
    );
  }
}

//=============================================================
// Pegando os dados do preenchimento
//=============================================================
function obterContextoRegistro() {

  const planilha = SpreadsheetApp.getActiveSpreadsheet();

  const abaRegistro = planilha.getSheetByName(
    CONFIG.ABAS.REGISTRO
  );

  const abaDashboard = planilha.getSheetByName(
    CONFIG.ABAS.DASHBOARD
  );

  return {
    planilha,
    abaRegistro,
    abaDashboard,

    nomeAluno: abaRegistro.getRange("B3").getValue(),
    plano: abaRegistro.getRange("C3").getValue(),
    vencimento: abaRegistro.getRange("D3").getValue(),
    valor: abaRegistro.getRange("E3").getValue(),
    status: abaRegistro.getRange("F3").getValue()
  };
}

//=============================================================
// ANALISE DE DADOS DO FORMULÁRIO
//=============================================================
function validarFormularioRegistro(ctx) {

  if (!ctx.nomeAluno || ctx.nomeAluno === "Selecione um aluno") {
    throw new Error("Selecione um aluno.");
  }

  const dia = Number(ctx.vencimento);

  if (
    isNaN(dia) ||
    dia < 1 ||
    dia > 31
  ) {
    throw new Error("Dia de vencimento inválido.");
  }

  if (!ctx.status) {
    throw new Error("Selecione um status.");
  }
}

//=============================================================
// VERIFICAÇÃO DE COMPETÊNCIA FINANCEIRA
//=============================================================
function obterCompetenciaRegistro(ctx) {

  const dataDashboard = ctx.abaDashboard
    .getRange(CONFIG.CELULAS.DATA_DASHBOARD)
    .getValue();

  if (!(dataDashboard instanceof Date)) {
    throw new Error("Data da dashboard inválida.");
  }

  const ultimoDiaMes = new Date(
    dataDashboard.getFullYear(),
    dataDashboard.getMonth() + 1,
    0
  ).getDate();

  const diaSeguro = Math.min(
    Number(ctx.vencimento),
    ultimoDiaMes
  );

  const dataVencimento = new Date(
    dataDashboard.getFullYear(),
    dataDashboard.getMonth(),
    diaSeguro
  );

  const nomeAba = Utilities.formatDate(
    dataVencimento,
    "pt-BR",
    "MMMM"
  ).toUpperCase();

  return {
    nomeAba,
    dataVencimento
  };
}

//=============================================================
// VERIFICA O VINCULO PARA PREENCHER NO FORMULÁRIO
//=============================================================
function buscarVinculoAluno(nomeAluno) {

  const dadosPlanilha = getDadosDaPlanilhaAlunos();

  if (!dadosPlanilha?.dados) {
    return "";
  }

  const nomeNormalizado = 
    normalizarTexto(nomeAluno);

  const alunoEncontrado = 
    dadosPlanilha.dados.find(
    (linha, index) => {

      if (index === 0) return false;

      return (
        normalizarTexto(
          linha[COLUNAS_ALUNO.NOME]
          ) === nomeNormalizado
      );
    }
  );

  return alunoEncontrado
    ? alunoEncontrado[COLUNAS_ALUNO.VINCULO]
    : "";
}

