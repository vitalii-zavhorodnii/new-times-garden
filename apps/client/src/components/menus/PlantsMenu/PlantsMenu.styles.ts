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
    font-family: 'Press', sans-serif;
    font-size: 24px;
  }

  .balance-icon {
    margin-right: 3px;
    width: 28px;
  }

  .pagination {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 6px 0;
  }

  .page {
    padding-bottom: 0;
    margin-right: 16px;
    color: #272829;
    font-family: 'America', sans-serif;
    font-size: 28px;
    transition: color 200ms ease-in-out;
  }

  .page.active {
    color: #0089dd;
    text-decoration: underline;
    text-decoration-thickness: 4px;
  }

  .page:last-child {
    margin-right: 0;
  }
`;
