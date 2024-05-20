import { css } from 'lit';

export const styles = css`
  .container {
    z-index: 1;
    position: absolute;
    left: 10px;
    bottom: 82px;
    transition: left 200 cubic-bezier(0.42, 0, 0.58, 1);
  }

  .container.hidden {
    left: -100vw;
  }

  .preview {
    height: 64px;
    width: 64px;
    border-radius: 8px;
    background-color: #a3d8ff;
  }

  .content {
    display: flex;
    background-color: #524c4280;
    border-radius: 10px;
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
