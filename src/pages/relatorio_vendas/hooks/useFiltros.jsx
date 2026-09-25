import { useState, useMemo, useEffect } from "react";

// Configuração de data atual para os filtros
const dataAtual = new Date();
const anoAtual = dataAtual.getFullYear();
const mesAtual = String(dataAtual.getMonth() + 1).padStart(2, "0");
const diaAtual = String(dataAtual.getDate()).padStart(2, "0");
const dataFormatada = `${anoAtual}-${mesAtual}-${diaAtual}`;

export const useFiltros = (vendas, retiradas, filtrarRetiradasLocalmente) => {
  const [filtroDataInicio, setFiltroDataInicio] = useState(dataFormatada);
  const [filtroDataFim, setFiltroDataFim] = useState(dataFormatada);
  const [filtroMetodosPagamento, setFiltroMetodosPagamento] = useState([]);

  const METODOS_PAGAMENTO = ["Dinheiro", "Pix", "Crédito", "Débito", "Misto"];

  // Quando os filtros mudam, aplica filtragem local nas retiradas
  useEffect(() => {
    if (filtrarRetiradasLocalmente) {
      filtrarRetiradasLocalmente(filtroDataInicio, filtroDataFim);
    }
  }, [filtroDataInicio, filtroDataFim, filtrarRetiradasLocalmente]);

  const toggleMetodoPagamento = (metodo) => {
    setFiltroMetodosPagamento((prev) =>
      prev.includes(metodo)
        ? prev.filter((m) => m !== metodo)
        : [...prev, metodo]
    );
  };

  const limparFiltros = () => {
    setFiltroDataInicio("");
    setFiltroDataFim("");
    setFiltroMetodosPagamento([]);
  };

  const limparFiltrosMetodos = () => {
    setFiltroMetodosPagamento([]);
  };

  // Função auxiliar para normalizar datas
  const normalizeToISODate = (raw) => {
    if (!raw) return "";
    const date = new Date(raw);
    if (isNaN(date.getTime())) {
        const match = String(raw).match(/(\d{2})\/(\d{2})\/(\d{4})/);
        if (match) {
          const [, dd, mm, yyyy] = match;
          return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
        }
        return String(raw).slice(0, 10);
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const filtrarPorData = (item, dataField) => {
    if (!filtroDataInicio && !filtroDataFim) return true;
    const dataItemStr = normalizeToISODate(item[dataField]);

    if (filtroDataInicio && filtroDataFim && filtroDataInicio === filtroDataFim) {
      return dataItemStr === filtroDataInicio;
    }
    if (filtroDataInicio && !filtroDataFim) {
      return dataItemStr >= filtroDataInicio;
    }
    if (!filtroDataInicio && filtroDataFim) {
      return dataItemStr <= filtroDataFim;
    }
    if (filtroDataInicio && filtroDataFim) {
      return dataItemStr >= filtroDataInicio && dataItemStr <= filtroDataFim;
    }
    return true;
  };

  // Vendas filtradas apenas pelo período de datas (base estável para ver quais moedas tiveram vendas)
  const vendasNoPeriodo = useMemo(() => {
    if (!vendas || vendas.length === 0) return [];
    return vendas.filter((venda) => filtrarPorData(venda, "data_hora"));
  }, [vendas, filtroDataInicio, filtroDataFim]);

  // Vendas filtradas por data e por métodos de pagamento selecionados
  const vendasFiltradas = useMemo(() => {
    if (!vendasNoPeriodo || vendasNoPeriodo.length === 0) return [];

    let lista = vendasNoPeriodo;

    if (filtroMetodosPagamento.length > 0) {
      lista = lista.filter((venda) => {
        if (!venda.pagamentos || venda.pagamentos.length === 0) return false;
        return venda.pagamentos.some((pagamento) =>
          filtroMetodosPagamento.includes(pagamento.metodo)
        );
      });
    }

    return [...lista].sort((a, b) => new Date(b.data_hora) - new Date(a.data_hora));
  }, [vendasNoPeriodo, filtroMetodosPagamento]);

  const retiradasFiltradas = retiradas; 

  return {
    filtroDataInicio,
    setFiltroDataInicio,
    filtroDataFim,
    setFiltroDataFim,
    filtroMetodosPagamento,
    toggleMetodoPagamento,
    limparFiltros,
    limparFiltrosMetodos,
    METODOS_PAGAMENTO,
    vendasNoPeriodo,
    vendasFiltradas,
    retiradasFiltradas,
  };
};