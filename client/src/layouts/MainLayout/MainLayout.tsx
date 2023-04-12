import React, { ReactElement, useEffect, useRef, useState } from "react";

import { SideMenu } from "@/components";

import { Container, Main } from "./MainLayout.styled";
import { LINKS } from "@/const";
import { useAppSelector } from "@/hooks";
import { selectKanban } from "@/store";
import { LinkType } from "@/types";

interface MainLayputProps {
  children: ReactElement;
}

export const MainLayout: React.FC<MainLayputProps> = ({ children }) => {
  const currentKanban = useAppSelector(selectKanban);

  const [links, setLinks] = useState<LinkType[]>([]);

  useEffect(() => {
    setLinks(
      currentKanban
        ? LINKS.map((link) => ({
            ...link,
            link: `${link.link}/${currentKanban.id}`,
          }))
        : []
    );
  }, [currentKanban]);

  const menuTitle = currentKanban ? currentKanban.name : "Выберите доску";

  return (
    <Container>
      <SideMenu links={links} menuTitle={menuTitle} />
      <Main>{children}</Main>
    </Container>
  );
};
