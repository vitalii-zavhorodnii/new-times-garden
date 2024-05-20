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
    background-color: #00000070;
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
    font-size: 16px;
    margin-bottom: 4px;
  }

  .info {
    display: flex;
    flex-direction: column;
  }

  .progress {
    width: 100%;
    height: 6px;
    border-radius: 5px;
    background-color: 
  }

  .income {
    display: flex;
    align-items: center;
    margin: 5px 0 0 0;
    padding: 0;
  }

  .value {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-family: sans-serif;
    font-size: 20px;
  }

  .value-icon {
    width: 16px;
  }
`;
