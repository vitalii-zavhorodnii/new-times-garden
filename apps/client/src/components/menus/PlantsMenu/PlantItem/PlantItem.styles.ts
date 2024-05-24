import { css } from 'lit';

export const styles = css`
  * {
    box-sizing: border-box;
  }

  .plant-item {
    position: relative;
    display: grid;
    grid-template-columns: 64px 1fr;
    grid-gap: 14px;
    width: 100%;
    padding: 8px 16px 8px 24px;
    color: #272829;
    border-bottom: 1px dashed #272829;
  }

  .locker {
    position: absolute;
    top: 26px;
    right: 26px;
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

  .grow-time {
    font-family: 'Paper', sans-serif;
    font-size: 14px;
    color: #272829;
  }

  .required {
    font-family: 'Paper', sans-serif;
    font-size: 14px;
    color: #c40c0c;
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

  .value.none {
    display: none;
  }

  .icon {
    margin-right: 3px;
    width: 24px;
  }

  .insufficient {
    color: #c40c0c;
  }

  .locked {
    color: #61677a;
  }

  .hidden {
    display: none;
  }
`;
