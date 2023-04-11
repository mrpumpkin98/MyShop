import { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  FETCH_BOARDS,
  DELETE_BOARD,
  FETCH_BOARDS_COUNT,
  FETCH_BOARDS_OF_THE_BEST,
} from "./BoardList.queries";
import BoardListUI from "./BoardList.presenter";
import _ from "lodash";

export default function StaticRoutingPage() {
  const router = useRouter();
  const { data, refetch } = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const { data: dataBoardsCount, refetch: refetchBoardsCount } =
    useQuery(FETCH_BOARDS_COUNT);
  const { data: dataBoardsOfTheBest } = useQuery(FETCH_BOARDS_OF_THE_BEST);
  const [keyword, setKeyword] = useState("");
  // const [keyword1, setKeyword2] = useState("");

  const onClickDelete = (event: React.ChangeEvent<HTMLInputElement>) => {
    deleteBoard({
      variables: { boardId: event.currentTarget.id },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
  };

  const onClickSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`/Board/${event.currentTarget.id}`);
  };

  const onClickWrite = () => {
    router.push(`/Board/Write`);
  };

  const getDebounce = _.debounce((value) => {
    void refetch({ search: value, page: 1 });
    setKeyword(value);
  }, 500);

  // const getDebounce2 = _.debounce((value) => {
  //   void refetch({ search: value, page: 1 });
  //   setKeyword2(value);
  // }, 500);

  const onChangeKeyword = (value: string): void => {
    setKeyword(value);
  };

  return (
    <>
      <BoardListUI
        onClickDelete={onClickDelete}
        onClickSubmit={onClickSubmit}
        onClickWrite={onClickWrite}
        data={data}
        count={dataBoardsCount?.fetchBoardsCount}
        best={dataBoardsOfTheBest}
        refetch={refetch}
        refetchBoardsCount={refetchBoardsCount}
        keyword={keyword}
        onChangeKeyword={onChangeKeyword}
      />
    </>
  );
}
