import { Global, css } from "@emotion/core";
import React from 'react'

const GlobalStyles = () => (
  <>
    <Global
      styles={css`
        *,
        *:before,
        *:after {
          box-sizing: border-box;
        }
      `}
    />
    <Global
      styles={css`
        input,
        button {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          outline: none;
          border-style: none;
        }
      `}
    />
    <Global
      styles={css`
        body,
        html {
          // background-color: rgba(255, 50, 0, 0.025);
          background-color: #e8e8e8;
          font-size: 16px;
          padding-top: 40px;
        }
      `}
    />
  </>
);

export default GlobalStyles;
