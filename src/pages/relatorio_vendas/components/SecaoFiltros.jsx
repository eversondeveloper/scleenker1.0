// components/SecaoFiltros.jsx
import React, { useMemo } from 'react';

export const SecaoFiltros = ({
  filtroDataInicio,
  setFiltroDataInicio,
  filtroDataFim,
  setFiltroDataFim,
  filtroMetodosPagamento = [],
  toggleMetodoPagamento,
  limparFiltros,
  limparFiltrosMetodos,
  METODOS_PAGAMENTO = [],
  vendas = [],
  vendasFiltradas = []
}) => {
  // Base de vendas a considerar para habilitar os botões no período
  const baseVendas = vendasFiltradas.length > 0 ? vendasFiltradas : vendas;

  // Identifica todos os métodos de pagamento que realmente possuem vendas registradas
  const metodosComVendaNoPeriodo = useMemo(() => {
    const metodosPresentes = new Set();

    baseVendas.forEach((venda) => {
      if (Array.isArray(venda.pagamentos)) {
        venda.pagamentos.forEach((pag) => {
          const valor = parseFloat(pag.valor_pago || pag.valorPago || 0);
          if (pag.metodo && valor > 0) {
            metodosPresentes.add(pag.metodo.trim().toUpperCase());
          }
        });
      }
    });

    return metodosPresentes;
  }, [baseVendas]);

  return (
    <div className="secao-filtros">
      {/* Estilo para tornar o ícone nativo do calendário branco no tema Dark */}
      <style>
        {`
          .secao-filtros input[type="date"] {
            color-scheme: dark;
          }
          .secao-filtros input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
            cursor: pointer;
          }
        `}
      </style>

      <div className="filtro-datas">
        <div className="input-group">
          <label>Data Início:</label>
          <input
            type="date"
            value={filtroDataInicio}
            onChange={(e) => setFiltroDataInicio(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Data Fim:</label>
          <input
            type="date"
            value={filtroDataFim}
            onChange={(e) => setFiltroDataFim(e.target.value)}
          />
        </div>
      </div>

      <div className="filtro-metodos">
        <div className="metodos-header">
          <label>Métodos de Pagamento:</label>
          {filtroMetodosPagamento.length > 0 && (
            <button onClick={limparFiltrosMetodos} className="btn-limpar-metodos">
              Limpar Métodos
            </button>
          )}
        </div>
        <div className="botoes-metodos">
          {METODOS_PAGAMENTO.map((metodo) => {
            const metodoNormalizado = metodo.trim().toUpperCase();
            const temVenda = metodosComVendaNoPeriodo.has(metodoNormalizado);
            const ativo = filtroMetodosPagamento.includes(metodo);

            return (
              <button
                key={metodo}
                type="button"
                disabled={!temVenda}
                onClick={() => toggleMetodoPagamento(metodo)}
                className={`btn-metodo ${ativo ? 'ativo' : ''} ${!temVenda ? 'desabilitado' : ''}`}
                style={!temVenda ? { opacity: 0.35, cursor: 'not-allowed' } : {}}
              >
                {metodo}
              </button>
            );
          })}
        </div>
      </div>

      <div className="acoes-filtros">
        <button onClick={limparFiltros} className="btn-limpar-todos">
          Limpar Todos os Filtros
        </button>
      </div>
    </div>
  );
};