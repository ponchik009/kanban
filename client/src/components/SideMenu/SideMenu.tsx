import React, { ReactElement } from "react";

import { SideMenuTitle, Container } from "./SideMenu.styled";

import { NavLink } from "@/components";
import Image from "next/image";

export const SideMenu = () => {
  return (
    <Container>
      <SideMenuTitle>Менюшка</SideMenuTitle>
      <NavLink
        text="Задачи"
        to="/kanban"
        leftIcon={
          <Image alt="" src="/assets/IconTask.svg" width={32} height={32} />
        }
      />
      <NavLink
        text="Аналитика"
        to="/analytics"
        leftIcon={
          <Image
            alt=""
            src="/assets/IconAnalytics.svg"
            width={32}
            height={32}
          />
        }
      />
      <NavLink
        text="Участники"
        to="/participants"
        leftIcon={
          <Image
            alt=""
            src="/assets/Iconparticipants.svg"
            width={32}
            height={32}
          />
        }
      />
    </Container>
  );
};
