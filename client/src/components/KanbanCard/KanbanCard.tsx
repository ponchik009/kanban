import { KanbanType } from "@/types";
import React from "react";
import {
  KanbanCardContainer,
  KanbanImageContainer,
  KanbanNameContainer,
} from "./KanbanCard.styled";

interface KanbanCardProps {
  kanban: KanbanType;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ kanban }) => {
  return (
    <li>
      <KanbanCardContainer href={`/kanban/${kanban.id}`}>
        <KanbanImageContainer
          src={`http://localhost:8080/${kanban.avatar}`}
          alt={kanban.name}
          key={kanban.id}
        />
        <KanbanNameContainer>{kanban.name}</KanbanNameContainer>
      </KanbanCardContainer>
    </li>
  );
};
