import { css } from 'lit';

export const styles = css`
  .container {
    z-index: 1;
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    transition: top 400ms cubic-bezier(.17,.67,1,1.23);
  }

  .container.hidden {
    top: -60px;
  }

  .item {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  .item:last-child {
    margin-right: 0;
  }

  .value {
    font-size: 20px;
    font-family: 'Bebas Neue', sans-serif;
    color: #fff;
  }

  .icon {
    width: 24px;
    margin-right: 6px;
  }
`;
