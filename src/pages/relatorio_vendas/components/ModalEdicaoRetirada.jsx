// components/ModalEdicaoRetirada.jsx
import React from 'react';

export const ModalEdicaoRetirada = ({
  mostrar,
  onClose,
  novaRetirada,
  setNovaRetirada,
  onAtualizar,
  retiradaEditando,
}) => {
  if (!mostrar || !retiradaEditando) return null;

  const handleAtualizar = () => {
    if (!novaRetirada.valorRetirado || !novaRetirada.motivo || !novaRetirada.dataRetirada || !novaRetirada.timeRetirada) {
      alert('Preencha o valor, o motivo, a data e a hora da retirada.');
      return;
    }

    const valor = parseFloat(String(novaRetirada.valorRetirado).replace(',', '.'));
    if (isNaN(valor) || valor <= 0) {
      alert('Valor inválido. Digite um valor numérico positivo.');
      return;
    }

    onAtualizar();
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    backgroundColor: '#1e1e1e',
    color: '#BACBD9',
    border: '1px solid #555',
    borderRadius: '4px',
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '500px' }}>
        <h3>Editar Retirada do Caixa</h3>

        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#2a2a2a', borderRadius: '5px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#64ff8a' }}>Informações da Retirada</h4>
          <p style={{ margin: '5px 0' }}>
            <strong>Registro Original:</strong> {new Date(retiradaEditando.data_retirada || retiradaEditando.data_corrigida).toLocaleString("pt-BR")}
          </p>
          <p style={{ margin: '5px 0' }}>
            <strong>Valor Original:</strong> R$ {parseFloat(retiradaEditando.valor).toFixed(2)}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Data:</label>
              <input
                type="date"
                value={novaRetirada.dataRetirada}
                onChange={(e) =>
                  setNovaRetirada({
                    ...novaRetirada,
                    dataRetirada: e.target.value,
                  })
                }
                style={inputStyle}
              />
            </div>
            
            <div className="input-group" style={{ flex: 1 }}>
              <label>Hora:</label>
              <input
                type="time"
                value={novaRetirada.timeRetirada}
                onChange={(e) =>
                  setNovaRetirada({
                    ...novaRetirada,
                    timeRetirada: e.target.value,
                  })
                }
                style={inputStyle}
              />
            </div>
        </div>
        
        <div className="input-group">
          <label>Novo Valor Retirado:</label>
          <input
            type="text"
            value={novaRetirada.valorRetirado}
            onChange={(e) =>
              setNovaRetirada({
                ...novaRetirada,
                valorRetirado: e.target.value,
              })
            }
            placeholder="0.00"
            style={inputStyle}
          />
        </div>

        <div className="input-group">
          <label>Motivo:</label>
          <input
            type="text"
            value={novaRetirada.motivo}
            onChange={(e) =>
              setNovaRetirada({ ...novaRetirada, motivo: e.target.value })
            }
            placeholder="Ex: Compra de material, Pagamento de conta..."
            style={inputStyle}
          />
        </div>

        <div className="input-group">
          <label>Observação (opcional):</label>
          <textarea
            value={novaRetirada.observacao}
            onChange={(e) =>
              setNovaRetirada({ ...novaRetirada, observacao: e.target.value })
            }
            style={{
              ...inputStyle,
              minHeight: '80px',
              resize: 'vertical',
            }}
          />
        </div>

        <div className="modal-actions">
          <button 
            onClick={onClose} 
            className="btn-secondary"
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
          <button 
            onClick={handleAtualizar} 
            className="btn-primary"
            style={{
              padding: '8px 16px',
              backgroundColor: '#FF9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Atualizar Retirada
          </button>
        </div>
      </div>
    </div>
  );
};