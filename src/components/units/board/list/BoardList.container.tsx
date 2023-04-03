import { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  FETCH_BOARDS,
  DELETE_BOARD,
  FETCH_BOARDS_COUNT,
} from "./BoardList.queries";
import BoardListUI from "./BoardList.presenter";

export default function StaticRoutingPage() {
  const router = useRouter();
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);

  const { data: dataBoardsCount } = useQuery<
    Pick<IQuery, "fetchBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);

  const onClickDelete = (event: React.ChangeEvent<HTMLInputElement>) => {
    deleteBoard({
      variables: { boardId: event.target.id },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
  };

  const onClickSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`/Board/${event.target.id}`);
  };

  const onClickWrite = () => {
    router.push(`/Board/Write`);
  };

  return (
    <>
      <BoardListUI
        onClickDelete={onClickDelete}
        onClickSubmit={onClickSubmit}
        onClickWrite={onClickWrite}
        data={data}
        count={dataBoardsCount?.fetchBoardsCount}
        refetch={refetch}
      />
    </>
  );
}
