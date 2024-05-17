import { css } from 'lit';

export const styles = css`
  * {
    box-sizing: border-box;
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
    font-family: 'Paper', sans-serif;
    color: #272829;
    letter-spacing: 1px;
  }

  .title.disabled {
    color: #c40c0c;
  }

  .grow-time {
    font-family: 'Paper', sans-serif;
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
    font-family: 'Paper', sans-serif;
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
