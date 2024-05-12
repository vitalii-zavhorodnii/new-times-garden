import { useState } from 'react';

interface IBalanceBarProps {
  isHidden: boolean;
  coins: number;
  tokens: number;
  xp: number;
  handleShopOpen: (value: boolean) => void;
}

const BalanceBar = ({
  isHidden,
  coins,
  tokens,
  xp,
  handleShopOpen
}: IBalanceBarProps): JSX.Element => {
  return (
    <div className={`balance-bar ${isHidden ? 'hidden' : null}`}>
      <div className="balance-bar__cell">
        <span className="balance-bar__value">{xp}</span>
        <img
          className="balance-bar__icon"
          src="./assets/utils/experience.png"
          alt="xp"
        />
      </div>
      <div className="balance-bar__cell">
        <img
          className="balance-bar__icon"
          src="./assets/utils/coin.png"
          alt="coin"
        />
        <span className="balance-bar__value">{coins}</span>
      </div>
      <div className="balance-bar__cell">
        <img
          className="balance-bar__icon"
          src="./assets/utils/token.svg"
          alt="coin"
        />
        <span className="balance-bar__value">{tokens}</span>
      </div>
      <div onClick={() => handleShopOpen(true)} className="balance-bar__cell">
        <img className="balance-bar__icon" src="./assets/utils/plus.svg" alt="add" />
      </div>
    </div>
  );
};

export default BalanceBar;
