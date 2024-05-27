import { css } from 'lit';

export const styles = css`
  * {
    box-sizing: border-box;
  }

  .container {
    z-index: 10;
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    background-color: #e2dfd0;
    transition: top 300ms ease-in-out;
  }

  .container.hidden {
    top: 100vh;
  }

  .page {
    position: relative;
    padding: 0;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    height: 100vh;
  }

  .content.left {
    padding: 72px 28px 0 24px;
  }

  .content.right {
    padding: 72px 36px 0 8px;
  }

  .title {
    color: #272829;
    text-align: center;
    font-size: 36px;
    font-family: 'Paper', sans-serif;
  }

  .description {
    margin-top: 18px;
    color: #272829;
    text-align: center;
    font-size: 14px;
    font-family: 'Paper', sans-serif;
  }

  .list {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 12px;
  }

  .decor {
    z-index: 5;
    position: absolute;
    top: 0;
    width: 100%;
    pointer-events: none;
  }

  .decor.left {
    left: 0;
  }

  .decor.right {
    right: 0;
  }

  .decor.center {
    z-index: 7;
    right: 0;
    transform: translateX(50%);
  }

  .close-btn {
    z-index: 10;
    position: absolute;
    top: 10px;
    width: 56px;
  }

  .close-btn.left {
    left: 10px;
  }

  .close-btn.right {
    right: 10px;
  }
`;
