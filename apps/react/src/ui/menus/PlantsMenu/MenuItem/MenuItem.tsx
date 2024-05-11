interface IMenuItemProps {
  title: string;
  timer: number;
  coins: number;
  tokens: number;
  coinsIncome: number;
  tokensIncome: number;
  xpIncome: number;
  icon: string;
  onClick: React.MouseEventHandler<HTMLLIElement>;
}

const MenuPlantsItem = ({
  title,
  timer,
  coins,
  tokens,
  coinsIncome,
  tokensIncome,
  xpIncome,
  icon,
  onClick
}: IMenuItemProps) => {
  return (
    <li className="plants-menu__item" onClick={onClick}>
      <img
        className="plants-menu__icon"
        src={`./assets/plants/icons/${icon.toLowerCase()}.png`}
        alt="icon"
      />
      <div className="plants-menu__card">
        <h2 className="plants-menu__title">{title}</h2>
        <p className="plants-menu__growing">Growing time: {timer}</p>
        <div className="plants-menu__info">
          {coins ? (
            <p className="plants-menu__value">
              <img
                className="plants-menu__stat-icon"
                src="./assets/utils/coin.png"
                alt="coin"
              />
              {coins}
            </p>
          ) : null}
          {tokens ? (
            <p className="plants-menu__value">
              <img
                className="plants-menu__stat-icon"
                src="./assets/utils/token.svg"
                alt="token"
              />
              {tokens}
            </p>
          ) : null}
          {coinsIncome ? (
            <p className="plants-menu__value">
              <img
                className="plants-menu__stat-icon"
                src="./assets/utils/profit-coins.svg"
                alt="coin"
              />
              {coinsIncome}
            </p>
          ) : null}
          {tokensIncome ? (
            <p className="plants-menu__value">
              <img
                className="plants-menu__stat-icon"
                src="./assets/utils/profit-tokens.svg"
                alt="token"
              />
              {tokensIncome}
            </p>
          ) : null}
          {xpIncome ? (
            <p className="plants-menu__value">
              <img
                className="plants-menu__stat-icon"
                src="./assets/utils/experience.png"
                alt="coin"
              />
              {xpIncome}
            </p>
          ) : null}
        </div>
      </div>
    </li>
  );
};

export default MenuPlantsItem;
