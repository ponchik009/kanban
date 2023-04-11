import React, { ReactElement } from "react";

import { SideMenuTitle, Container, LinksContainer } from "./SideMenu.styled";

import { NavLink } from "@/components";
import Image from "next/image";
import { useRouter } from "next/router";

export const SideMenu = () => {
  const router = useRouter();

  return (
    <Container>
      <SideMenuTitle>Менюшка</SideMenuTitle>
      <LinksContainer>
        <NavLink
          text="Задачи"
          to="/kanban"
          leftIcon={
            <Image
              alt="Список задач проекта"
              src="/assets/IconTask.svg"
              width={32}
              height={32}
            />
          }
          active={router.asPath === "/kanban"}
        />
        <NavLink
          text="Аналитика"
          to="/analytics"
          leftIcon={
            <Image
              alt="Аналитика по проекту"
              src="/assets/IconAnalytics.svg"
              width={32}
              height={32}
            />
          }
          active={router.asPath === "/analytics"}
        />
        <NavLink
          text="Участники"
          to="/participants"
          leftIcon={
            <Image
              alt="Участники проекта"
              src="/assets/IconPerson.svg"
              width={32}
              height={32}
            />
          }
          active={router.asPath === "/participants"}
        />
      </LinksContainer>
    </Container>
  );
};
