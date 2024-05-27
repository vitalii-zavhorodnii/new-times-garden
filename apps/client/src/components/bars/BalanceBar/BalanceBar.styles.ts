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
    padding: 4px 6px 0;
    transition: top 400ms cubic-bezier(0.17, 0.67, 1, 1.23);
  }

  .container.hidden {
    top: -60px;
  }

  .user {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
  }

  .plate {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .level {
    padding-top: 5px;
    color: #f8f6e3;
    font-size: 32px;
    font-weight: bold;
    font-family: 'Paper', sans-serif;
    transform: translateY(-2px)
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
