import React, { ReactElement } from "react";

import { SideMenu } from "@/components";

import { Container, Main } from "./MainLayout.styled";

interface MainLayputProps {
  children: ReactElement;
}

export const MainLayout: React.FC<MainLayputProps> = ({ children }) => {
  return (
    <Container>
      <SideMenu />
      <Main>{children}</Main>
    </Container>
  );
};
