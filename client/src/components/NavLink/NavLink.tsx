import React, { ReactElement } from "react";
import Link from "next/link";

import { LinkContainer } from "./NavLink.styled";

interface NavLinkProps {
  text: string;
  to: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  size?: number;
  active?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({
  text,
  to,
  leftIcon,
  rightIcon,
  size = 3,
  active = false,
}) => {
  return (
    <Link href={to}>
      <LinkContainer fontSize={size} active={active}>
        {leftIcon}
        {text}
        {rightIcon}
      </LinkContainer>
    </Link>
  );
};
