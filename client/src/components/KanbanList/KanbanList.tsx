import { KanbanType } from "@/types";
import React from "react";
import { KanbanCard } from "../KanbanCard";
import { Container } from "./KanbanList.styled";

interface KanbanListProps {
  kanbans: KanbanType[];
}

export const KanbanList: React.FC<KanbanListProps> = ({ kanbans }) => {
  return (
    <Container>
      {kanbans.map((kanban) => (
        <KanbanCard kanban={kanban} key={kanban.id} />
      ))}
    </Container>
  );
};
