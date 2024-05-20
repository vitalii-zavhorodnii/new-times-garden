import { css } from 'lit';

export const styles = css`
  .container {
    z-index: 1;
    position: absolute;
    left: 10px;
    bottom: 39px;
    display: flex;
    padding: 4px;
    border-radius: 8px;
    background-color: #00000040;
    transform-origin: left bottom;
  }

  .container.hidden {
    left: -100vw;
  }

  .preview {
    height: 64px;
    width: 64px;
    border-radius: 6px;
    margin-right: 6px;
    background-color: #a3d8ff;
  }

  .content {
    display: flex;
    flex-direction: column;
    padding: 0 4px 4px 4px;
    border-radius: 6px;
    background-color: #e2dfd0;
  }

  .title {
    color: #272829;
    font-family: 'Paper';
    font-size: 18px;
  }

  .growing {
    margin-top: 4px;
    color: #272829;
    font-family: 'Latin';
    font-size: 24px;
  }

  .growing.ready {
    color: green;
  }

  .income {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    margin-top: 2px;
  }

  .value {
    display: flex;
    align-items: center;
    margin-right: 4px;
    color: #272829;
    font-family: 'Paper';
    font-size: 14px;
    font-weight: bold;
  }

  .value-icon {
    width: 18px;
    margin-right: 2px;
  }
`;
