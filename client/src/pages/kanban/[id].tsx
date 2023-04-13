import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";

import { Board, DragDropProvider, Modal } from "@/components";
import { KanbanWithColumnsType } from "@/types";
import { KanbanApi } from "@/api";
import { useAppDispatch } from "@/hooks";
import { setKanban } from "@/store";

interface KanbanIndexProps {
  data: KanbanWithColumnsType;
  id: string;
}

const index = ({ data, id }: KanbanIndexProps) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setKanban(data));
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  const onModalOpenClick = () => setModalOpen(true);
  const onModalCloseClick = () => setModalOpen(false);

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
      <button onClick={onModalOpenClick}>Открыть модалку</button>
      <DragDropProvider>
        <Board />
      </DragDropProvider>
      <Modal title="МОДАЛКА" onClose={onModalCloseClick} open={modalOpen}>
        123
      </Modal>
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

  const data = await KanbanApi.getKanbanBoard(id);

  return {
    props: {
      data,
      id: ctx.params?.id as string,
    },
  };
};

export default index;
