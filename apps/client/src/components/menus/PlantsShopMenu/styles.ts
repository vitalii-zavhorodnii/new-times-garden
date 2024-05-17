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
    padding: 14px 0 6px;
    background: #e2dfd0;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  }

  .balance-value {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 68px;
    margin-right: 8px;
    font-family: 'Newspapper', sans-serif;
    font-size: 16px;
  }

  .balance-icon {
    margin-right: 3px;
    width: 28px;
  }

  .plant-item {
    display: grid;
    grid-template-columns: 64px 1fr;
    grid-gap: 14px;
    width: 100%;
    padding: 8px 16px 8px 24px;
    color: #272829;
    border-top: 1px dashed #61677a;
  }

  .plant-item.disabled {
    color: #7d7c7c;
  }

  .plant-item:last-child() {
    margin-bottom: 0;
  }

  .image {
    width: 64px;
  }

  .about {
    display: grid;
    grid-template-columns: 1fr;
    gap: 6px;
  }

  .title {
    font-size: 20px;
    font-family: 'Newspapper', sans-serif;
    color: #272829;
    letter-spacing: 1px;
  }

  .title.disabled {
    color: #c40c0c;
  }

  .grow-time {
    font-family: 'Newspapper', sans-serif;
    font-size: 14px;
    color: #272829;
  }

  .grow-time.disabled {
    color: #525252;
  }

  .stats {
    display: flex;
    align-items: center;
    max-width: 100%;
  }

  .value {
    display: flex;
    align-items: center;
    width: 72px;
    margin-right: 8px;
    font-family: 'Newspapper', sans-serif;
    font-size: 16px;
  }

  .value:last-child {
    margin-right: 0;
  }

  .value.red {
    color: #c40c0c;
  }

  .value.disabled {
    color: #525252;
  }

  .value.none {
    display: none;
  }

  .icon {
    margin-right: 3px;
    width: 24px;
  }
`;
