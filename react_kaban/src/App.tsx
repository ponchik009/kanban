import React from "react";
import { DropResult } from "react-beautiful-dnd";

import "./App.css";
import moveElInList from "./utils/moveElementInList";
import move, { IMoveResult } from "./utils/moveFromListToAnotherList";
import Board from "./components/Board/Board";

const initialData = [
  {
    name: "Column 1",
    items: Array(30)
      .fill(0)
      .map(() => Math.random()),
  },
  {
    name: "Column 2",
    items: Array(30)
      .fill(0)
      .map(() => Math.random()),
  },
  {
    name: "Column 3",
    items: Array(30)
      .fill(0)
      .map(() => Math.random()),
  },
];

function App() {
  const [columns, setColumns] = React.useState(initialData);

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = moveElInList(
        columns[sInd].items,
        source.index,
        destination.index
      );

      const newState: any[] = JSON.parse(JSON.stringify(columns)); // TODO :) решить проблему производительности с JSON.parse???
      newState[sInd].items = items;

      setColumns(newState);
    } else {
      const result: IMoveResult = move(
        columns[sInd].items,
        columns[dInd].items,
        source,
        destination
      );

      const newState: any[] = JSON.parse(JSON.stringify(columns)); // TODO :) решить проблему производительности с JSON.parse???
      newState[sInd].items = result[sInd];
      newState[dInd].items = result[dInd];

      setColumns(newState);
    }
  }

  return (
    <>
      <Board data={columns} onDragEnd={onDragEnd} />
    </>
  );
}

export default App;
