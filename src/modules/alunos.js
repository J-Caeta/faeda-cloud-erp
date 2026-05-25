//=============================================================
// CADASTRO DE NOVO ALUNO
//=============================================================
function cadastrarNovoAluno() {
  const dadosPlanilha = getDadosDaPlanilhaAlunos();
  if (!dadosPlanilha) return;

  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  const aba = planilha.getSheetByName(CONFIG.ABAS.ADMIN);

  const nome = aba.getRange("B2").getValue();
  if (!nome) {
    SpreadsheetApp.getUi().alert("Nome é obrigatório.");
    return;
  }

  const dados = {
    whatsapp: aba.getRange("B3").getValue(),
    email: aba.getRange("B4").getValue(),
    dia: aba.getRange("B5").getValue(),
    plano: aba.getRange("B6").getValue(),
    valor: aba.getRange("B7").getValue(),
    tipo: aba.getRange("B8").getValue()
  };

  const novaId = gerarIdAluno(dadosPlanilha.abaAtivos);
  const dataCadastro = new Date();

  const novoAluno = [];

    novoAluno[COLUNAS_ALUNO.ID] =
      novoId;

    novoAluno[COLUNAS_ALUNO.NOME] =
      nome;
    
    novoAluno[COLUNAS_ALUNO.EMAIL] =
      dados.email;
    
    novoAluno[COLUNAS_ALUNO.WHATSAPP] =
      dados.whatsapp;

    novoAluno[COLUNAS_ALUNO.DIA_VENCIMENTO] =
      dados.dia;

    novoAluno[COLUNAS_ALUNO.PLANO] =
      dados.plano;

    novoAluno[COLUNAS_ALUNO.STATUS] =
      "EM ABERTO";
    
    novoAluno[COLUNAS_ALUNO.VALOR] =
      dados.valor;
    
    novoAluno[COLUNAS_ALUNO.OBS] =
      "";

    novoAluno[COLUNAS_ALUNO.VINCULO] =
      dados.tipo;

    novoAluno[COLUNAS_ALUNO.DATA_CADASTRO] =
      dataCadastro;

  try {
    dadosPlanilha.abaAtivos.appendRow(novoAluno);

    const linha = dadosPlanilha.abaAtivos.getLastRow();
    dadosPlanilha.abaAtivos.getRange(
      linha,
       COLUNAS_ALUNO.DATA_CADASTRO + 1
       )
      .setNumberFormat("dd/MM/yyyy HH:mm:ss");

    aba.getRange("B2:B8").clearContent();

    planilha.toast(`${nome} cadastrado com sucesso!`);
  } catch (e) {
    SpreadsheetApp.getUi().alert("Erro ao cadastrar: " + e.message);
  }
}

//=============================================================
// DURANTE O CADASTRO, GERA O ID MANTENDO O PADRÃO
//=============================================================
function gerarIdAluno(aba) {
  const ultimaLinha = aba.getLastRow();
  if (ultimaLinha <= 1) return "FAEDA-001";

  try {
    const ultimaId = aba.getRange(ultimaLinha, 1).getValue();
    const match = ultimaId.toString().match(/FAEDA-(\d+)/i);
    const numero = match ? parseInt(match[1], 10) + 1 : ultimaLinha;

    return `FAEDA-${numero.toString().padStart(3, '0')}`;
  } catch {
    return `FAEDA-${ultimaLinha.toString().padStart(3, '0')}`;
  }
}

//===================================================================
// DESATIVAR ALUNO
//===================================================================
function desativarAluno() {
  const ui = SpreadsheetApp.getUi();

  try {
    const ss = SpreadsheetApp.openById(CONFIG.IDS.ALUNOS);
    const abaAtivos = ss.getSheetByName(CONFIG.ABAS.ALUNOS_ATIVOS);
    let abaInativos = ss.getSheetByName("INATIVOS");

    if (!abaAtivos) {
      ui.alert("Erro: Aba de alunos ativos não encontrada.");
      return;
    }

    // Cria aba INATIVOS se não existir
    if (!abaInativos) {
      abaInativos = ss.insertSheet("INATIVOS");
    }

    // 🔹 Pega aluno da aba ADMIN
    const planilhaCRM = SpreadsheetApp.getActiveSpreadsheet();
    const abaAdmin = planilhaCRM.getSheetByName(CONFIG.ABAS.ADMIN);
    const nomeSelecionado = abaAdmin.getRange(CONFIG.CELULAS.SELECAO_ALUNO).getValue();

    if (!nomeSelecionado) {
      ui.alert("Selecione um aluno para desativar.");
      return;
    }

    const nomeBusca = normalizarTexto(nomeSelecionado);
    const dados = abaAtivos.getDataRange().getValues();

    for (let i = dados.length - 1; i >= 1; i--) {
      const linha = dados[i];
      const nomeLinha = normalizarTexto(
        linha[COLUNAS_ALUNO.NOME]); // Coluna B

      if (nomeLinha === nomeBusca) {

        // 🔄 Move para INATIVOS
        abaInativos.appendRow(linha);

        // ❌ Remove de ATIVOS
        abaAtivos.deleteRow(i + 1);

        // 🧹 Limpa seleção
        abaAdmin.getRange(CONFIG.CELULAS.SELECAO_ALUNO).clearContent();

        SpreadsheetApp.getActiveSpreadsheet().toast(
          `Aluno ${nomeSelecionado} desativado com sucesso.`,
          "Sucesso",
          5
        );

        return;
      }
    }

    ui.alert("Aluno não encontrado na lista de ativos.");

  } catch (e) {
    ui.alert("Erro ao desativar aluno: " + e.message);
  }
}

// =========================================================================
// HELPERS
// =========================================================================
function getDadosDaPlanilhaAlunos() {
  try {
    const planilha = SpreadsheetApp.openById(CONFIG.IDS.ALUNOS);
    const abaAtivos = planilha.getSheetByName(CONFIG.ABAS.ALUNOS_ATIVOS);

    if (!abaAtivos) {
      throw new Error(`Aba '${CONFIG.ABAS.ALUNOS_ATIVOS}' não encontrada`);
    }

    return {
      planilha,
      abaAtivos,
      abaEx: planilha.getSheetByName(CONFIG.ABAS.EX_ALUNOS),
      dados: abaAtivos.getDataRange().getValues()
    };

  } catch (e) {
    Logger.log("Erro ao acessar planilha de alunos:", e);
    SpreadsheetApp.getUi().alert(
      "Erro ao acessar a planilha de alunos. Verifique URL e permissões."
    );
    return null;
  }
}




