import React, { ReactElement } from "react";

import { SideMenuTitle, Container, LinksContainer } from "./SideMenu.styled";

import { NavLink } from "@/components";
import Image from "next/image";
import { useRouter } from "next/router";
import { LinkType } from "@/types";

interface SideMenuProps {
  links: LinkType[];
  menuTitle?: string;
}

export const SideMenu: React.FC<SideMenuProps> = ({
  links,
  menuTitle = "Менюшка",
}) => {
  const router = useRouter();

  return (
    <Container>
      <SideMenuTitle>{menuTitle}</SideMenuTitle>
      <LinksContainer>
        {links.map((link) => (
          <NavLink
            text={link.name}
            to={link.link}
            active={router.asPath === link.link}
            leftIcon={
              <Image
                alt={link.description}
                src={link.iconPath}
                width={32}
                height={32}
              />
            }
            key={link.name}
          />
        ))}
      </LinksContainer>
    </Container>
  );
};
