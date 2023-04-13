import React, { ReactElement, useEffect, useRef, useState } from "react";

import { SideMenu } from "@/components";

import { Container, Main, PageTitle } from "./MainLayout.styled";
import { LINKS } from "@/const";
import { useAppSelector } from "@/hooks";
import { selectKanban } from "@/store";
import { LinkType } from "@/types";
import { useRouter } from "next/router";

interface MainLayputProps {
  children: ReactElement;
}

export const MainLayout: React.FC<MainLayputProps> = ({ children }) => {
  const currentKanban = useAppSelector(selectKanban);
  const router = useRouter();

  const [links, setLinks] = useState<LinkType[]>([]);
  const [pageTitle, setPageTitle] = useState("");

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

  useEffect(() => {
    setPageTitle(links.find((link) => link.link === router.asPath)?.name ?? "");
  }, [router, links]);

  const menuTitle = currentKanban ? currentKanban.name : "Выберите доску";

  return (
    <Container>
      <SideMenu links={links} menuTitle={menuTitle} />
      <Main>
        <PageTitle>{pageTitle}</PageTitle>
        {children}
      </Main>
    </Container>
  );
};
