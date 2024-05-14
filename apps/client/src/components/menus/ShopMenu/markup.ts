export const markup = (
  img: string,
  value: number,
  price: number,
  oldPrice: number | null
): string => `
    <img 
      class="shop-menu__img" 
      src="${img}" 
      alt="icon"
    >
    <div class="shop-menu__card">
      <h2 class="shop-menu__title">
        <img 
          class="shop-menu__currency" 
          src="./assets/utils/token.png" 
          alt="token"
        >  
        ${value}
      </h2>
      <div class="shop-menu__info">
        ${
          price > 0
            ? `<p class="shop-menu__price">
                $ ${price}
              </p>`
            : ''
        }
        ${
          oldPrice > 0
            ? `<p class="shop-menu__old-price">
                $ ${oldPrice}
              </p>`
            : ''
        }
        </p>
      </div>
    </div>
`;
