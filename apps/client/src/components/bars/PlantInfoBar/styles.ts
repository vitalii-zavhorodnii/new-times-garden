import { css } from 'lit';

export const styles = css`
  .container {
    z-index: 1;
    position: absolute;
    left: 10px;
    bottom: 82px;
    padding: 3px;
    width: 100px;
    height: 100px;
    border: 2px solid red;
    border-radius: 10px;
    background-color: #524c42;
    border-radius: 10px;
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

  .info {
    margin-top: 6px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .value {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-family: sans-serif;
    font-size: 20px;
  }

  .icon {
    width: 16px;
    margin-right: 5px;
  }
`;
