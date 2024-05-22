import { css } from 'lit';

export const styles = css`
  // * {
  //   box-sizing: border-box;
  // }

  .container {
    z-index: 10;
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #e2dfd0;
    transition: top 300ms ease-in-out;
  }

  .container.hidden {
    top: 100vh;
  }

  .page {
    position: relative;
    min-height: 100vh;
    padding: 0;
  }

  .page.left {
    padding: 72px 8px 0 36px;
  }

  .page.right {
    padding: 72px 36px 0 8px;
  }

  .content {
    display: flex;
  }

  .decor {
    z-index: 5;
    position: absolute;
    top: 0;
    width: 100%;
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
