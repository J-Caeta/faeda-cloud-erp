// =========================================================================
// GESTÃO VIA DESKTOP
// =========================================================================
const props = PropertiesService.getScriptProperties();

const CONFIG = {
  IDS: {
    FINANCEIRO: props.getProperty('ID_BD_FINANCEIRO'),
    ALUNOS: props.getProperty('ID_BD_ALUNOS'),
    DESPESAS: props.getProperty('ID_DESPESAS_FAEDA')
  },
  ABAS: {
    REGISTRO: "REGISTRAR PAGAMENTO",
    ADMIN: "ADMINISTRAÇÃO",
    EX_ALUNOS: "EX-ALUNOS",
    ALUNOS_ATIVOS: "ALUNOS ATIVOS",
    DASHBOARD: "DASHBOARD",
    CONFIG: "CONFIG"
  },
  CELULAS: {
    DATA_DASHBOARD: "K2",
    SELECAO_ALUNO: "B10"
  }
};

// =========================================================================
// CONSTANTES DE COLUNAS
// =========================================================================
const COLUNAS_ALUNO = {
  ID: 0,
  NOME: 1,
  EMAIL: 2,
  WHATSAPP: 3,
  DIA_VENCIMENTO: 4,
  PLANO: 5,
  STATUS: 6,
  VALOR: 7,
  OBS: 8,
  VINCULO: 9,
  DATA_CADASTRO: 10
};

const COLUNAS_FINANCEIRO = {
  DATA_PAGAMENTO: 0,
  NOME: 1,
  PLANO: 2,
  VINCULO: 3,
  VENCIMENTO: 4,
  VALOR: 5,
  STATUS: 6
};

const COLUNAS_ANALYTICS_INAD = {
  NOME: 1,
  VENCIMENTO: 4,
  STATUS: 6,
  ACOMPANHAMENTO: 9
};

// =========================================================================
// GATILHO
// =========================================================================
function dispararPreenchimentoAutomatico(e) {
  const aba = e.range.getSheet();
  const celula = e.range;

  if (
    aba.getName() === CONFIG.ABAS.REGISTRO &&
    celula.getA1Notation() === 'B3'
  ) {
    preencherDadosAutomaticos();
  }
}

