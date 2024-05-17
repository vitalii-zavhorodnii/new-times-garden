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
    width: 68px;
    margin-right: 8px;
    font-family: 'Paper', sans-serif;
    font-size: 16px;
  }

  .balance-icon {
    margin-right: 3px;
    width: 28px;
  }

  .pagination {
    display: flex;
    justify-content: center;
    width: 100%;
    // margin: 8px 0;
  }

  .page {
    padding: 4px 8px;
    margin-right: 8px;
    color: #272829;
    font-family: 'Press', sans-serif;
    font-size: 24px;
    font-weight: 200;
    border-radius: 8px;
    text-decoration: underline;
  }

  .page:last-child() {
    margin-right: 0;
  }

  .page.active {
    color: #1679AB;
  }
`;
