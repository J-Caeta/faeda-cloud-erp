function gerarRelatorioInadimplentesPDF() {

  const props = PropertiesService.getScriptProperties();
  const ID_ALUNOS = props.getProperty('ID_BD_ALUNOS');

  if (!ID_ALUNOS) {
    console.error("❌ ID_BD_ALUNOS não configurado.");
    return;
  }

  // =========================
  // ABRE PLANILHA
  // =========================

  const ssAlunos = SpreadsheetApp.openById(ID_ALUNOS);

  const abaAlunos = ssAlunos.getSheetByName("ALUNOS ATIVOS");

  if (!abaAlunos) {
    console.error('❌ Aba "ALUNOS ATIVOS" não encontrada.');
    return;
  }

  // =========================
  // CAPTURA DADOS
  // =========================

  const matriz = abaAlunos.getDataRange().getDisplayValues();

  let listaInadimplentes = [];

  // Ignora cabeçalho
  for (let i = 1; i < matriz.length; i++) {

    const linha = matriz[i];

    // COLUNAS
    const nome = String(
      linha[COLUNAS_ALUNO.NOME] || ''
    ).trim();

    const vencimento = String(
      linha[COLUNAS_ALUNO.DIA_VENCIMENTO] || ''
    ).trim();
      
    const status = String(
      linha[COLUNAS_ALUNO.STATUS]
    ).trim();

    // Validação básica
    if (!nome || !status) continue;

    // FILTRO INADIMPLENTES
    if (statusEhInadimplente(status))
    {

      listaInadimplentes.push({
        nome,
        vencimento,
        acompanhamento
      });

    }
  }

  // =========================
  // SEM RESULTADOS
  // =========================

  if (listaInadimplentes.length === 0) {
    console.warn("🛑 Nenhum inadimplente encontrado.");
    return;
  }

  // =========================
  // ORDER BY ASC VENCIMENTO
  // =========================

  listaInadimplentes.sort((a, b) => {

    const vencA = Number(a.vencimento) || 0;
    const vencB = Number(b.vencimento) || 0;

    return vencA - vencB;

  });

  // =========================
  // DATA ATUAL
  // =========================

  const dataHoje = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    "dd/MM/yyyy"
  );

  // =========================
  // HTML PDF
  // =========================

  let htmlParaPDF = `
  <!DOCTYPE html>
  <html>

    <head>

      <meta charset="UTF-8">

      <style>

        body{
          font-family: Arial, sans-serif;
          color:#333;
          padding:20px;
        }

        h2{
          color:#c62828;
          border-bottom:2px solid #c62828;
          padding-bottom:10px;
        }

        table{
          width:100%;
          border-collapse:collapse;
          margin-top:20px;
        }

        th{
          background:#f2f2f2;
          border:1px solid #ddd;
          padding:10px;
          text-align:left;
        }

        td{
          border:1px solid #ddd;
          padding:10px;
        }

        .vencimento{
          text-align:center;
          color:#c62828;
          font-weight:bold;
        }

        .footer{
          margin-top:30px;
          text-align:center;
          font-size:10px;
          color:#777;
        }

      </style>

    </head>

    <body>

      <h2>
        Relatório de Inadimplentes - ${dataHoje}
      </h2>

      <table>

        <thead>

          <tr>
            <th>Aluno</th>
            <th>Acompanhamento</th>
            <th>Vencimento</th>
          </tr>

        </thead>

        <tbody>
  `;

  // =========================
  // LINHAS TABELA
  // =========================

  listaInadimplentes.forEach(aluno => {

    htmlParaPDF += `
      <tr>

        <td>
          ${escapeHtml(aluno.nome)}
        </td>

        <td>
          ${escapeHtml(aluno.acompanhamento)}
        </td>

        <td class="vencimento">
          Dia ${escapeHtml(aluno.vencimento)}
        </td>

      </tr>
    `;

  });

  htmlParaPDF += `

        </tbody>

      </table>

      <div class="footer">
        Relatório automático de inadimplência.
      </div>

    </body>

  </html>
  `;

  // =========================
  // GERA PDF
  // =========================

  const nomeArquivoPDF =
    `Cobranca_Faeda_${dataHoje.replace(/\//g, '-')}.pdf`;

  const htmlOutput =
    HtmlService.createHtmlOutput(htmlParaPDF);

  const arquivoPDF = htmlOutput
    .getBlob()
    .getAs(MimeType.PDF)
    .setName(nomeArquivoPDF);

  // =========================
  // ENVIA EMAIL
  // =========================

  MailApp.sendEmail({

    to: "eucaeetano@gmail.com, faedaflavio@gmail.com, gestaofaeda@gmail.com",

    subject:
      `🚨 Relatório de Inadimplentes - ${dataHoje}`,

    htmlBody: `
  <div style="font-family:Arial,sans-serif; color:#333;">

    <p>
      Fala, Flavinho!
    </p>

    <p>
      Segue em anexo o relatório de inadimplência atualizado.
    </p>

    <br>

    <p style="
      color: rgb(153, 153, 153);
      font-size: 11px;
      font-style: italic;
    ">
      Relatório automático relacionando os inadimplentes até o dia de hoje.
    </p>

  </div>
`,

    attachments: [arquivoPDF]

  });

  // =========================
  // LOG FINAL
  // =========================

  console.log("✅ Relatório enviado com sucesso!");

}