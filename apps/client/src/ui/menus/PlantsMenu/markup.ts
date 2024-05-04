export const markup = (
  title: string,
  coins: number,
  tokens: number,
  coinsIncome: number,
  tokensIncome: number,
  timer: string
): string => `
  <img 
    class="plants-menu__icon" 
    src="./assets/plants/icons/${title.toLowerCase()}.png" 
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
                src="./assets/utils/coin.png" 
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
                src="./assets/utils/token.svg" 
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
          src="./assets/utils/timer.png" 
          alt="timer"
        >
        ${timer}
      </p>
    </div>
  </div>
`;
