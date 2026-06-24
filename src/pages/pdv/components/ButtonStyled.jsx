import styled, { keyframes, css } from "styled-components";

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.1); opacity: 1; filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.8)); }
  100% { transform: scale(1); opacity: 0.9; }
`;

export const ButtonStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100% !important; 
  height: 96px; /* Aumentado levemente para respirar melhor com o padding */
  padding: 16px 14px;
  border-radius: 12px; /* Cantos modernos são mais suaves (8px a 16px) */
  box-sizing: border-box;
  user-select: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); /* Transição "iOS-like" ultra suave */
  overflow: hidden;

  /* COR BASE DESSATURADA E GRADIENTE DE LUZ (Efeito Glass/Glossy Moderno) */
  background-color: ${(props) => props.$background};
  background-image: linear-gradient(
    180deg, 
    rgba(255, 255, 255, 0.15) 0%, 
    rgba(255, 255, 255, 0.05) 40%, 
    rgba(0, 0, 0, 0.08) 100*
  );
  
  color: ${(props) => props.$corTexto || '#FFFFFF'};
  
  /* Borda interna refinada (Inner Glow) */
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);

  cursor: ${(props) => props.$isEsgotado ? 'not-allowed' : 'pointer'};

  /* ESTADO: ESTOQUE BAIXO (Mais elegante, sem parecer erro crítico) */
  ${props => props.$isEstoqueBaixo && !props.$isEsgotado && css`
    border: 1px solid rgba(255, 152, 0, 0.5);
    box-shadow: 
      0 0 12px rgba(255, 152, 0, 0.15),
      inset 0 1px 1px rgba(255, 152, 0, 0.2);
  `}

  /* ESTADO: SELECONADO (Glow moderno focado no produto) */
  ${props => props.$selecionado && css`
    border: 1px solid #64ff8a; /* 1px mantém o botão do mesmo tamanho física, evitando "pulos" na tela */
    box-shadow: 
      0 0 0 3px rgba(100, 255, 138, 0.2), /* Anel de foco externo moderno */
      0 8px 20px rgba(0, 0, 0, 0.15);
  `}

  /* ESTADO: ESGOTADO (Visual limpo de desativação) */
  ${props => props.$isEsgotado && css`
    border: 1px solid rgba(255, 255, 255, 0.05);
    filter: grayscale(0.9) brightness(0.6);
    opacity: 0.6;
    pointer-events: none;
    box-shadow: none;
  `}

  /* INTERAÇÕES */
  &:hover {
    transform: translateY(-2px); /* 4px era muito agressivo, 2px é mais sutil e elegante */
    background-image: linear-gradient(
      180deg, 
      rgba(255, 255, 255, 0.25) 0%, 
      rgba(255, 255, 255, 0.1) 50%, 
      rgba(0, 0, 0, 0.05) 100%
    );
    box-shadow: 
      0 12px 24px -4px rgba(0, 0, 0, 0.2),
      0 4px 12px -2px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translateY(0) scale(0.98);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  /* COMPONENTES INTERNOS */
  .badge-superior {
    position: absolute;
    top: 8px;
    left: 12px;
    right: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: none;

    .indice {
      font-size: 10px;
      font-weight: 700;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(4px); /* Efeito de vidro fosco no índice */
      padding: 2px 6px;
      border-radius: 4px;
      opacity: 0.8;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .tag-popular {
      img {
        width: 14px;
        height: 14px;
        filter: drop-shadow(0 2px 4px rgba(255, 215, 0, 0.3));
        animation: ${pulse} 2.5s infinite ease-in-out;
      }
    }
  }

  .conteudo-produto {
    display: flex;
    text-align: left; /* Alinhado à esquerda costuma parecer mais profissional em cards/botões complexos */
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    margin-top: 12px; /* Abre espaço para a badge superior não encavalar */

    .categoria-label {
      display: block;
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      opacity: 0.7; /* Suaviza sem sumir */
    }

    .descricao-titulo {
      font-size: 13px;
      font-weight: 500; /* Medium costuma ser mais moderno que Bold para textos corridos */
      color: #ffffff;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .preco-tag {
      color: #ffffff; /* Preço na mesma cor do texto ou branco puro traz minimalismo */
      text-align: right;
      
      small {
        font-size: 10px;
        font-weight: 500;
        opacity: 0.7;
        margin-right: 1px;
      }
      
      strong {
        font-size: 16px; /* Reduzido levemente para equilibrar a hierarquia visual */
        font-weight: 700;
      }
    }
  }

  /* STATUS REESTRUTURADOS */
  .overlay-status.esgotado {
    position: absolute;
    inset: 0;
    background: rgba(20, 20, 20, 0.45); /* Escurece o fundo de forma sutil */
    backdrop-filter: blur(3px); /* Desfoca o produto esgotado ao fundo */
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff5252;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    transform: none; /* Remove a rotação de 15 graus antiga para um look mais limpo/clean */
    border: 1px solid rgba(255, 82, 82, 0.3);
    border-radius: 12px;
  }

  .tag-alerta-estoque {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: auto; /* Movido para o topo para não cobrir as informações de preço abaixo */
    background: #ff9800;
    color: #fff;
    font-size: 9px;
    font-weight: 700;
    padding: 3px;
    text-align: center;
    letter-spacing: 0.5px;
  }
`; 