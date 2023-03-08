import { css } from "utils/css";

css`
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-button {
    display: none;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: var(--brand);
  }
`;
