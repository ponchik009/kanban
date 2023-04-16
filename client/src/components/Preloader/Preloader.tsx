import React from "react";
import { LoaderContainer, Triangle } from "./Preloader.styled";

export const Preloader = () => {
  return (
    <div>
      <LoaderContainer>
        <svg viewBox="0 0 80 80">
          <circle id="test" cx="40" cy="40" r="32"></circle>
        </svg>
      </LoaderContainer>

      <Triangle>
        <svg viewBox="0 0 86 80">
          <polygon points="43 8 79 72 7 72"></polygon>
        </svg>
      </Triangle>

      <LoaderContainer>
        <svg viewBox="0 0 80 80">
          <rect x="8" y="8" width="64" height="64"></rect>
        </svg>
      </LoaderContainer>
    </div>
  );
};
