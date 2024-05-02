export const markup = (
  coins: number,
  tokens: number,
  timer: string,
): string => `
  <li class="plants-menu__item">
    <img class="plants-menu__icon" 
      src="./assets/plants/icons/potato.png" 
      alt="Potato"
    >
    <div class="plants-menu__card">
      <h4 class="plants-menu__title">Potato</h4>
      <div class="plants-menu__info">
        ${
          coins
            ? `<span class="plants-menu__value">
                <img class="plants-menu__stat-icon" 
                  src="./assets/utils/coin.png" 
                  alt="Potato"
                >
              ${coins}
            </span>`
            : null
        }

        ${
          tokens
            ? `<span class="plants-menu__value">
                <img class="plants-menu__stat-icon" 
                  src="./assets/utils/coin.png" 
                  alt="Potato"
                >
              ${coins}
            </span>`
            : null
        }
        
        <span class="plants-menu__value">
          <img class="plants-menu__stat-icon" 
            src="./assets/utils/timer.png" 
            alt="Potato"
          >
          ${timer}
        </span>
      </div>
    </div>
  </li>
`;
