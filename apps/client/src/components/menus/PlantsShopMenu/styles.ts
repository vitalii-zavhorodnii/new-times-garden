import { css } from 'lit';

export const styles = css`
  .list {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0;
    padding: 0 16px;
  }

  .item {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 8px 8px;
    color: #272829;
    border-top: 1px dashed #61677a;
  }

  .item:last-child() {
    margin-bottom: 0;
  }

  .image {
    width: 64px;
    margin-right: 14px;
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .title {
    display: flex;
    align-items: center;
    margin: 0 0 6px 0;
    padding: 0;
    font-size: 20px;
    font-family: 'Newspapper', sans-serif;
    letter-spacing: 1px;
  }

  .grow-time {
    margin: 0;
    font-family: 'Newspapper', sans-serif;
    font-size: 14px;
  }

  .stats {
    display: flex;
    align-items: center;
    margin-top: 6px;
    width: 100%;
  }

  .stats-value {
    display: flex;
    align-items: center;
    width: 50%;
    margin: 0;
    padding: 0;
    font-family: 'Newspapper', sans-serif;
    font-size: 16px;
  }

  .stats-value:last-child {
    margin-right: 0;
  }

  .stats-icon {
    margin-right: 3px;
    width: 24px;
  }
`;
