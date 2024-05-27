import { css } from 'lit';

export const styles = css`
  * {
    box-sizing: border-box;
  }

  .container {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 14px 12px 0;
    transition: top 400ms cubic-bezier(0.17, 0.67, 1, 1.23);
  }

  .container.hidden {
    top: -60px;
  }

  .user {
    display: flex;
    align-items: center;
  }

  .level {
    padding-top: 5px;
    color: #f8f6e3;
    font-size: 24px;
    font-weight: bold;
    font-family: 'America', sans-serif;
  }

  .currency {
    display: flex;
    align-items: center;
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
    display: flex;
    align-items: center;
    padding-top: 5px;
    color: #f8f6e3;
    font-size: 22px;
    font-weight: bold;
    font-family: 'America', sans-serif;
  }

  .icon {
    width: 24px;
    margin-right: 6px;
  }
`;
