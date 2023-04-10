import { GetServerSideProps, GetStaticProps } from "next";

import { KanbanApi } from "@/api";
import { Board, DragDropProvider } from "@/components";
import { TaskBoardType } from "@/types";

interface KanbanIndexProps {
  data: TaskBoardType;
}

const index = ({ data }: KanbanIndexProps) => {
  return (
    <DragDropProvider data={data.columns}>
      <Board />
    </DragDropProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await KanbanApi.getKanbanBoard();

  return {
    props: {
      data,
    },
  };
};

export default index;
