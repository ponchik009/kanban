import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";

import { KanbanApi } from "@/api";
import { Board, DragDropProvider } from "@/components";
import { KanbanWithColumnsType } from "@/types";
import axios from "axios";
import Head from "next/head";

interface KanbanIndexProps {
  data: KanbanWithColumnsType;
  id: string;
}

const index = ({ data, id }: KanbanIndexProps) => {
  return (
    <>
      <Head>
        <title>Задачи</title>
        <meta
          name={`tasks for kanban with id ${id}`}
          content={`tasks for kanban with id ${id}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DragDropProvider data={data.columns}>
        <Board />
      </DragDropProvider>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id as string;

  if (!id) {
    return {
      notFound: true,
    };
  }

  const data = (
    await axios.get<KanbanWithColumnsType>(`http://localhost:8080/kanban/${id}`)
  ).data;

  return {
    props: {
      data,
      id: ctx.params?.id as string,
    },
  };
};

export default index;
