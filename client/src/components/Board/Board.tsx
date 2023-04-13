import React from "react";
import { DragDropContext } from "react-beautiful-dnd";

import { ColumnDropshadow, Container } from "./Board.styled";

import { useDragDrop } from "@/components";
import { Column } from "@/components";
import { StrictModeDroppable as Droppable } from "@/components";
import { useAppSelector } from "@/hooks";
import { selectKanbanColumns } from "@/store";

const Board: React.FC = () => {
  const {
    handleDragEnd,
    handleDragStart,
    handleDragUpdate,
    colDropshadowProps,
  } = useDragDrop();

  const columns = useAppSelector(selectKanbanColumns);

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
    >
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided, snapshot) => (
          <Container
            id="task-board"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {columns &&
              columns.map((column, columnIndex) => (
                <Column
                  key={column.id}
                  column={column}
                  columnIndex={columnIndex}
                />
              ))}
            {provided.placeholder}
            {snapshot.isDraggingOver && (
              <ColumnDropshadow
                marginLeft={colDropshadowProps.marginLeft}
                height={colDropshadowProps.height}
              />
            )}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
