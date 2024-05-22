import { css } from 'lit';

export const styles = css`
  * {
    box-sizing: border-box;
  }

  #top {
    height: 1px;
  }

  .list {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
  }

  .balance {
    display: flex;
    justify-content: center;
    align-items: center;
    position: -webkit-sticky;
    position: sticky;
    top: 15px;
    width: 100%;
    z-index: 10;
    padding: 14px 0 6px;
    background: #e2dfd0;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }

  .balance-value {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 8px;
    color: #272829;
    font-family: 'Paper', sans-serif;
    font-size: 18px;
  }

  .balance-icon {
    margin-right: 3px;
    width: 28px;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 12px 0 2px;
  }

  .page {
    position: relative;
    height: 34px;
    padding-bottom: 0;
    margin: 0 8px;
    color: #272829;
    font-family: 'America', sans-serif;
    font-size: 28px;
    font-weight: bold;
  }

  .page::after {
    content: '';
    z-index: -1;
    position: absolute;
    width: 0;
    height: 4px;
    background-color: #c40c0c;
    border-radius: 8px;
    bottom: 4px;
    left: -2px;
    transition: all 300ms ease-in-out;
  }

  .page.active::after {
    width: 100%;
  }
`;
