export const markup = (
  coins: number,
  tokens: number,
  timer: string,
  icon: string
): string => `
  <img class="picked-plant-bar__preview" 
    src="${icon}" 
    alt="icon"
  >
  <div class="picked-plant-bar__stats">
    ${
      coins > 0
        ? `<p class="picked-plant-bar__value">
            <img class="picked-plant-bar__icon" 
              src="./assets/utils/coin.png" 
              alt="coin"
            >
            ${coins}
          </p>`
        : ''
    }
    ${
      tokens > 0
        ? `<p class="picked-plant-bar__value">
            <img class="picked-plant-bar__icon" 
              src="./assets/utils/token.png" 
              alt="token"
            >
            ${tokens}
          </p>`
        : ''
    }
    <p class="picked-plant-bar__value">
      <img class="picked-plant-bar__icon" 
        src="./assets/utils/timer.png" 
        alt="timer"
      >
      ${timer}
    </p>
  </div>
`;
