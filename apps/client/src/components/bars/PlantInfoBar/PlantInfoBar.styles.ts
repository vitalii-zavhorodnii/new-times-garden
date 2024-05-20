import { css } from 'lit';

export const styles = css`
  .container {
    z-index: 1;
    position: absolute;
    left: 10px;
    bottom: 82px;
  }

  .container.hidden {
    left: -100vw;
  }

  .content {
    display: flex;
    background-color: #524c4280;
    border-radius: 10px;
  }

  .preview {
    height: 64px;
    width: 64px;
    border-radius: 8px;
    background-color: #a3d8ff;
  }

  .info {
    margin-left: 12px;
    display: flex;
    flex-direction: column;
  }

  .income {
    display: flex;
    align-items: center;
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
    margin-right: 5px;
  }
`;
