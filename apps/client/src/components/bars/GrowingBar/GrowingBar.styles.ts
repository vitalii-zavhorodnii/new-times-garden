import { css } from 'lit';

export const styles = css`
  .container {
    z-index: 1;
    position: absolute;
    left: 10px;
    bottom: 39px;
    width: 245px;
    transform-origin: left bottom;
  }

  .container.hidden {
    left: -100vw;
  }

  .wrapper {
    position: relative;
    display: flex;
    padding: 20px 10px 0 10px;
  }

  .shield {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .preview {
    height: 64px;
    width: 64px;
    margin-right: 6px;
  }

  .content {
    display: flex;
    flex-direction: column;
    padding: 0 4px 4px 4px;
    border-radius: 6px;
    // background-color: #e2dfd0;
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
