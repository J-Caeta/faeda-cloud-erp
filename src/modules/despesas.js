// =========================================================================
// DESPESAS
// =========================================================================
function registrarDespesa() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  const aba = planilha.getSheetByName(CONFIG.ABAS.ADMIN);

  const dados = {
    categoria: aba.getRange("B14").getValue(),
    descricao: aba.getRange("B15").getValue(),
    tipo: aba.getRange("B16").getValue(),
    valor: aba.getRange("B17").getValue(),
    pagamento: aba.getRange("B18").getValue(),
    natureza: aba.getRange("B19").getValue(),
    obs: aba.getRange("B20").getValue()
  };

  if (Object.values(dados).slice(0, 6).some(v => v === "")) {
    SpreadsheetApp.getUi().alert("Preencha todos os campos obrigatórios.");
    return;
  }

  const novaDespesa = [
    new Date(),
    dados.categoria,
    dados.descricao,
    dados.tipo,
    dados.valor,
    dados.pagamento,
    dados.natureza,
    dados.obs
  ];

  try {
    const bd = SpreadsheetApp.openById(CONFIG.IDS.DESPESAS);
    const abaDestino = bd.getSheetByName("DESPESAS");

    if (!abaDestino) throw new Error("Aba DESPESAS não encontrada");

    abaDestino.appendRow(novaDespesa);
    aba.getRange("B14:B20").clearContent();

    SpreadsheetApp.getUi().alert("✅ Despesa registrada!");
  } catch (e) {
    SpreadsheetApp.getUi().alert("Erro ao salvar: " + e.message);
  }
}
