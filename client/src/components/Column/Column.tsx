import React from "react";
import {
  Draggable,
  DraggableProvided,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";

import {
  Container,
  DropshadowContainer,
  RowContainer,
  RowDropshadow,
  Title,
  TitleContainer,
} from "./Column.styled";

import { useDragDrop } from "@/components";
import { Row } from "@/components";
import { StrictModeDroppable as Droppable } from "@/components";

import { ColumnType } from "@/types";

type Props = {
  column: ColumnType;
  columnIndex: number;
};

const Column: React.FC<Props> = ({ column, columnIndex }) => {
  const { rowDropshadowProps } = useDragDrop();

  return (
    <Draggable key={column.id} draggableId={column.id} index={columnIndex}>
      {(provided: DraggableProvided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <TitleContainer>
            <Title {...provided.dragHandleProps}>{column.title}</Title>
          </TitleContainer>

          <Droppable droppableId={column.id} type="task">
            {(prov: DroppableProvided, snapshot: DroppableStateSnapshot) => (
              <RowContainer ref={prov.innerRef} {...prov.droppableProps}>
                {column.tasks.map((task, taskIndex) => (
                  <Row key={task.id} task={task} index={taskIndex} />
                ))}
                {prov.placeholder}
                <DropshadowContainer>
                  {snapshot.isDraggingOver && (
                    <RowDropshadow
                      marginTop={rowDropshadowProps.marginTop}
                      height={rowDropshadowProps.height}
                    />
                  )}
                </DropshadowContainer>
              </RowContainer>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
