//=============================================================
  //TROCA AUTOMÁTICA DE STATUS DO ALUNO
//=============================================================
function atualizarStatusAlunos() {
  try {
    const planilhaCRM = SpreadsheetApp.getActiveSpreadsheet();

    const abaConfig = planilhaCRM.getSheetByName(CONFIG.ABAS.CONFIG);

    if (!abaConfig) {
      throw new Error(`Aba "${CONFIG.ABAS.CONFIG}" não encontrada.`);
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const mesAtual = hoje.getMonth();
    const anoAtual = hoje.getFullYear();

    // =====================================================
    // LISTA DE ALUNOS ADIMPLENTES
    // =====================================================

    const ultimaLinhaConfig = abaConfig.getLastRow();

    const alunosAdimplentes = new Set(
      abaConfig
        .getRange(1, 22, ultimaLinhaConfig - 1, 1) // Coluna V
        .getValues()
        .flat()
        .map(nome => normalizarTexto(nome))
        .filter(nome => nome !== "")
    );

    // =====================================================
    // DADOS DOS ALUNOS
    // =====================================================

    const dadosPlanilha = getDadosDaPlanilhaAlunos();

    if (!dadosPlanilha) {
      Logger.log("Dados da planilha de alunos não encontrados.");
      return;
    }

    const { dados, abaAtivos } = dadosPlanilha;

    if (!dados || dados.length <= 1) {
      planilhaCRM.toast("Nenhum aluno encontrado.");
      return;
    }

    const novosStatus = [];

    // =====================================================
    // PROCESSAMENTO DOS STATUS
    // =====================================================

    for (let i = 1; i < dados.length; i++) {

      const linha = dados[i];

      const nomeAluno = normalizarTexto(linha[1]); // Coluna B
      const diaVencimento = parseInt(linha[4], 10); // Coluna E

      let status = "EM ABERTO";

      // === Verifica adimplência ===
      if (alunosAdimplentes.has(nomeAluno)) {

        status = "ADIMPLENTE";

      } else {

        // === Validação do vencimento ===
        const diaValido =
          !isNaN(diaVencimento) &&
          diaVencimento >= 1 &&
          diaVencimento <= 31;

        if (!diaValido) {

          status = "ERRO: DIA INVÁLIDO";

        } else {

          const dataVencimento = new Date(
            anoAtual,
            mesAtual,
            diaVencimento
          );

          if (hoje > dataVencimento) {
            status = "INADIMPLENTE";
          }
        }
      }

      novosStatus.push([status]);
    }

    // =====================================================
    // ATUALIZA STATUS NA PLANILHA
    // =====================================================

    abaAtivos
      .getRange(2, 7, novosStatus.length, 1) // Coluna G
      .setValues(novosStatus);

    planilhaCRM.toast(
      `${novosStatus.length} status atualizados com sucesso.`
    );

    Logger.log("Atualização concluída.");

  } catch (error) {

    Logger.log(`Erro ao atualizar status: ${error.message}`);

    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Erro ao atualizar status dos alunos."
    );

    throw error;
  }
}

/**
 * Normaliza texto para comparação segura
 */
