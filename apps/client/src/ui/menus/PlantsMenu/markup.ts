export const markup = (
  title: string,
  coins: number,
  tokens: number,
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
                src="./assets/utils/token.png" 
                alt="token"
              >
              ${tokens}
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
