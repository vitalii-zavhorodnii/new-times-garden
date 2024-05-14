import { css } from 'lit';

export const styles = css`
  .balance-bar {
    z-index: 1;
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    transition: top 500ms ease-in-out; /* заменил $start-animation на ease-in-out */
  }

  .balance-bar__cell {
    display: flex;
    align-items: center;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }

  .balance-bar__icon {
    width: 24px;
    margin-right: 6px;
  }

  .balance-bar__value {
    font-size: 20px;
    font-family: 'Bebas Neue', sans-serif;
    color: #fff;
  }

  .balance-bar.hidden {
    top: -60px;
  }
`;
