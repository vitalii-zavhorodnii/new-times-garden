export const markup = (
  title: string,
  coins: number,
  tokens: number,
  coinsIncome: number,
  tokensIncome: number,
  timer: string,
  icon: string
): string => `
  <img 
    class="plants-menu__icon" 
    src="${icon}" 
    alt="icon"
  >
  <div class="plants-menu__card">
    <h2 class="plants-menu__title">${title}</h2>
    <div class="plants-menu__info">
      ${
        coins > 0
          ? `<p class="plants-menu__value">
              <img 
                class="plants-menu__stat-icon" 
                src="./assets/utils/coin.svg" 
                alt="coin"
              >
              ${coins}
            </p>`
          : ''
      }
      ${
        tokens > 0
          ? `<p class="plants-menu__value">
              <img 
                class="plants-menu__stat-icon" 
                src="./assets/utils/token.png" 
                alt="token"
              >
              ${tokens}
            </p>`
          : ''
      }
      ${
        coinsIncome > 0
          ? `<p class="plants-menu__value">
              <img 
                class="plants-menu__stat-icon" 
                src="./assets/utils/profit-coins.svg" 
                alt="coin"
              >
              ~${coinsIncome}
            </p>`
          : ''
      }
      ${
        tokensIncome > 0
          ? `<p class="plants-menu__value">
              <img 
                class="plants-menu__stat-icon" 
                src="./assets/utils/profit-tokens.svg" 
                alt="token"
              >
              ~${tokensIncome}
            </p>`
          : ''
      }
      <p class="plants-menu__value">
        <img 
          class="plants-menu__stat-icon" 
          src="./assets/utils/timer.svg" 
          alt="timer"
        >
        ${timer}
      </p>
    </div>
  </div>
`;
