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
    height: 100vh;
    padding-top: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #27282970;
    transition: top 300ms ease-in-out, background 200ms ease-out;
  }

  .container.hidden {
    top: 100vh;
    background: transparent;
  }

  .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 320px;
    overflow: hidden;
    background-color: #e2dfd0;
  }

  .foreground {
    z-index: 12;
    position: absolute;
    width: 100%;
    pointer-events: none;
  }

  .foreground.bot {
    top: auto;
    bottom: -4px;
    transform-origin: bottom;
  }

  .go-button {
    width: 100px;
    margin-top: 12px;
  }

  .frame {
    width: 100%;
    pointer-events: none;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 36px 16px 24px;
    overflow-y: scroll;
    scroll-behaviour: smooth;
  }

  .header {
    color: #272829;
    font-size: 36px;
    font-family: 'Paper', sans-serif;
  }

  .step {
    display: flex;
    align-items: center;
    padding: 14px 4px;
    border-bottom: 1px dashed #272829;
  }

  .step.reverse {
    flex-direction: row-reverse;
  }

  .arrow {
    display: none;
  }

  .image {
    width: 92px;
    margin-right: 8px;
  }

  .step.reverse > .image {
    margin-left: 8px;
    margin-right: 0;
  }

  .description {
    color: #272829;
    line-height: 1.4;
    font-size: 14px;
    font-family: 'Paper', sans-serif;
  }

  .content {
    width: 100%;
  }
`;
