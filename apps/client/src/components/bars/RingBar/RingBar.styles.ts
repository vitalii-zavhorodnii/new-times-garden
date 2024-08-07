import { css } from 'lit';

export const styles = css`
  .container {
    z-index: 1;
    position: absolute;
    right: -86px;
    bottom: -64px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 172px;
    height: 172px;
    transform-origin: center;
    transform: rotate(0deg);
    transition: transform 500ms ease-in-out,
      right 600ms cubic-bezier(0.17, 0.67, 1, 1.23);
  }

  .container.hidden {
    right: -180px;
    transform: rotate(80deg);
  }

  .container.rotated {
    transform: rotate(180deg);
  }

  .ring {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .background {
    position: absolute;
    pointer-events: none;
    z-index: -1;
    width: 128px;
    height: 128px;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
  }

  .background-image {
    width: 100%;
    height: 100%;
  }

  .btn-group {
    position: absolute;
    pointer-events: none;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(0deg);
  }
  .btn-group.rotated {
    transform: rotate(180deg);
  }

  .btn {
    pointer-events: all;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
  }

  .btn-icon {
    width: 72px;
  }

  .escape {
    transform: rotate(180deg);
  }
`;
