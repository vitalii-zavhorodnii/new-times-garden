import { css } from 'lit';

export const styles = css`
  * {
    box-sizing: border-box;
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
    width: 100%;
    padding-bottom: 6px;
  }

  .page {
    height: 34px;
    padding-bottom: 0;
    margin: 0 8px;
    color: #272829;
    font-family: 'America', sans-serif;
    font-size: 28px;
    line-height: 42px;
    transition: border 300ms ease-in;
    border-bottom: 0px solid transparent;
  }

  .page.active {
    color: #57a109;
    border-bottom: 4px solid #57a109;
  }
`;
