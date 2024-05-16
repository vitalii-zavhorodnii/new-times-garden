import { css } from 'lit';

export const styles = css`
  .container {
    z-index: 10;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #e2dfd0;
    transition: top 300ms ease-in-out;
  }

  .container.hidden {
    top: 100vh;
  }

  .foreground {
    z-index: 12;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    pointer-events: none;
  }

  .btn-close {
    z-index: 12;
    position: absolute;
    top: 15px;
    right: 15px;
    width: 46px;
    pointer-events: auto;
  }

  .frame {
    width: 100vw;
    pointer-events: none;
  }

  .information {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-top: 48px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .header {
    margin: 0;
    color: #272829;
    font-size: 48px;
    font-family: 'Newspapper', sans-serif;
  }

  .description {
    margin-top: 16px;
    padding: 0 32px;
    text-align: center;
    color: #272829;
    font-size: 14px;
    font-family: 'Newspapper', sans-serif;
  }

  .content {
    display: flex;
    margin: 30px;
    padding: 30px;
    width: 100%;
  }
`;
