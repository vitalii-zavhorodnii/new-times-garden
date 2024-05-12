interface IShopMenuItemProps {
  value: number;
  price: number;
  oldPrice: number | null;
  image: string;
  onClick: React.MouseEventHandler<HTMLLIElement>;
}

const ShopMenuItem = ({
  onClick,
  value,
  price,
  oldPrice,
  image
}: IShopMenuItemProps): JSX.Element => {
  return (
    <li onClick={onClick} className="shop-menu__item">
      <img className="shop-menu__img" src="${img}" alt="icon" />
      <div className="shop-menu__card">
        <h2 className="shop-menu__title">
          <img
            className="shop-menu__currency"
            src="./assets/utils/token.svg"
            alt="token"
          />
          {value}
        </h2>
        <div className="shop-menu__info">
          <p className="shop-menu__price">${price}</p>
          {oldPrice ? <p className="shop-menu__old-price">$ ${oldPrice}</p> : null}
        </div>
      </div>
    </li>
  );
};

export default ShopMenuItem;
