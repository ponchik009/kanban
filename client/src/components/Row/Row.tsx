import React from "react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import styled from "styled-components";

import { TaskType } from "@/types";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  border: 1px solid red;
`;

type Props = {
  task: TaskType;
  index: number;
};

const Row: React.FC<Props> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index} key={task.id}>
      {(provided: DraggableProvided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.name}
        </Container>
      )}
    </Draggable>
  );
};

export default Row;
