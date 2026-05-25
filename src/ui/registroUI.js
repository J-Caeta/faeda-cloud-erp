// =========================================================================
// PREENCHIMENTO AUTOMÁTICO
// =========================================================================
function preencherDadosAutomaticos() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  const aba = planilha.getSheetByName(CONFIG.ABAS.REGISTRO);

  const nomeSelecionado = aba.getRange("B3").getValue();

  if (!nomeSelecionado || nomeSelecionado === "Selecione um aluno") {
    aba.getRange("C3:F3").clearContent();
    return;
  }

  const dadosPlanilha = getDadosDaPlanilhaAlunos();
  if (!dadosPlanilha) return;

  const nomeBusca = normalizarTexto(nomeSelecionado);

  for (let i = 1; i < dadosPlanilha.dados.length; i++) {
    const linha = dadosPlanilha.dados[i];

    if (
      normalizarTexto(
        linha[COLUNAS_ALUNO.NOME]
      ) === nomeBusca
    ) {

      const dia = linha[
        COLUNAS_ALUNO.DIA_VENCIMENTO
      ];

      const plano = linha[
        COLUNAS_ALUNO.PLANO
      ];

      const valor = linha[
        COLUNAS_ALUNO.VALOR
      ];

      const vinculo = linha[
        COLUNAS_ALUNO.VINCULO
      ];

      aba.getRange("C3").setValue(plano);
      
      aba.getRange("D3").setValue(dia);
      
      aba.getRange("E3").clearContent();

      if (normalizarTexto(vinculo) === "CONSULTORIA"
      ) {
        aba.getRange("E3").setValue(valor);
      }

      return;
    }
  }

  planilha.toast(`Aluno '${nomeSelecionado}' não encontrado`, "Erro", 5);
  aba.getRange("B3:E3").clearContent();
}