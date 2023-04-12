import { KanbanType } from "@/types";
import React from "react";
import { Container, ImageContainer, NameContainer } from "./KanbanCard.styled";

interface KanbanCardProps {
  kanban: KanbanType;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ kanban }) => {
  return (
    <li>
      <Container href={`/kanban/${kanban.id}`}>
        <ImageContainer
          src={`http://localhost:8080/${kanban.avatar}`}
          alt={kanban.name}
          key={kanban.id}
        />
        <NameContainer>{kanban.name}</NameContainer>
      </Container>
    </li>
  );
};
