function normalizarTexto(texto) {
  return String(texto || "")
    .trim()
    .toUpperCase();
}

//========================================
function statusEhInadimplente(status) {

  const statusNormalizado =
    normalizarTexto(status);

  return (
    statusNormalizado.includes("INADIMP")
  );
}

function escapeHtml(texto) {

  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}