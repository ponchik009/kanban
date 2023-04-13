import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export const KanbanCardContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: 16px 32px;
  border-radius: 8px;

  background: #fff;
  border: 1px solid #fff;

  &:hover {
    background: #e1e1e1;
    box-shadow: 8px 8px 8px #a1a1a1;
  }
`;

export const KanbanImageContainer = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 100%;
`;

export const KanbanNameContainer = styled.span`
  font-size: 32px;
  font-weight: 400;
  /* color: #858585; */
`;
