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
    width: 100px;
    height: 100px;
    background-color: black;
    /* transition: top 200ms ease-in-out; */
  }

  .content {
    padding: 14px;
  }

  .title {
    color: orange;
  }
`;
