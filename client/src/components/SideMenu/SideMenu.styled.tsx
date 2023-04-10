import styled from "styled-components";

export const Container = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 48px;

  width: 336px;
  height: 680px;
  border-radius: 0 24px 24px 0;
  padding: 32px 16px;
  background: #fff;

  position: fixed;
  z-index: 4;
`;

export const SideMenuTitle = styled.h3`
  padding: 8px;
  font-size: 32px;
  font-weight: 500;
  text-transform: uppercase;
`;
