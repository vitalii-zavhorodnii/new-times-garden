import { css } from 'lit';

export const styles = css`
  .container {
    z-index: 1;
    position: absolute;
    left: 10px;
    bottom: 39px;
    width: 245px;

    transform-origin: left bottom;
    transition: bottom 300ms ease-in-out;
  }

  .container.closed {
    bottom: -260px;
  }

  .wrapper {
    position: relative;
    display: flex;
    padding: 30px 10px 0 30px;
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
    margin-top: 10px;
    margin-right: 18px;
  }

  .content {
    display: flex;
    flex-direction: column;
    padding: 0 4px 4px 4px;
    border-radius: 6px;
  }

  .title {
    color: #272829;
    font-family: 'Paper';
    font-size: 18px;
  }

  .growing {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4px;
    color: #272829;
    font-family: 'Latin';
    font-size: 20px;
  }

  .income {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    border-top: 1px dashed #61677a;
    padding-top: 3px;
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

  .hidden {
    display: none;
  }
`;
