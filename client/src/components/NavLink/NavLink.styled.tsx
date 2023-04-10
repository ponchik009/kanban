import { DEFAULT_FONT_SIZE } from "@/const";
import styled from "styled-components";

interface LinkContainerProps {
  fontSize?: number;
}

export const LinkContainer = styled.li<LinkContainerProps>`
  font-size: ${({ fontSize }) => (fontSize || 2) * DEFAULT_FONT_SIZE}px;

  display: flex;
  align-items: center;
  gap: 8px;

  border-radius: 8px;
  padding: 12px;

  background: #f2f4f7;

  & svg {
    width: ${({ fontSize }) => ((fontSize || 2) + 1) * DEFAULT_FONT_SIZE}px;
    height: ${({ fontSize }) => ((fontSize || 2) + 1) * DEFAULT_FONT_SIZE}px;
  }

  & svg * {
    width: 32px;
    height: 32px;
  }

  &:hover {
    background: #e1e1e1;
  }
`;
