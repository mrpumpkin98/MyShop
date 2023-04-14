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
  ///////////////////////////////////////////////////////////////
  // router
  //////////////////////////////////////////////////////////////

  const router = useRouter();

  ///////////////////////////////////////////////////////////////
  // useState
  //////////////////////////////////////////////////////////////

  const [keyword, setKeyword] = useState("");

  ///////////////////////////////////////////////////////////////
  // queries
  //////////////////////////////////////////////////////////////

  const { data, refetch } = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const { data: dataBoardsCount, refetch: refetchBoardsCount } =
    useQuery(FETCH_BOARDS_COUNT);
  const { data: dataBoardsOfTheBest, refetch: refetchBoardsOfTheBest } =
    useQuery(FETCH_BOARDS_OF_THE_BEST);

  ///////////////////////////////////////////////////////////////
  //  게시물 삭제
  //////////////////////////////////////////////////////////////

  const onClickDelete = (event: React.ChangeEvent<HTMLInputElement>) => {
    deleteBoard({
      variables: { boardId: event.currentTarget.id },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
  };

  ///////////////////////////////////////////////////////////////
  //  게시물 이동
  //////////////////////////////////////////////////////////////

  const onClickSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`/Board/${event.currentTarget.id}`);
  };

  ///////////////////////////////////////////////////////////////
  //  게시물 등록 이동
  //////////////////////////////////////////////////////////////

  const onClickWrite = () => {
    router.push(`/Board/Write`);
  };

  ///////////////////////////////////////////////////////////////
  //  검색 컴포넌트 관련
  //////////////////////////////////////////////////////////////

  const getDebounce = _.debounce((value) => {
    void refetch({ search: value, page: 1 });
    setKeyword(value);
  }, 500);

  const onChangeKeyword = (value: string): void => {
    setKeyword(value);
  };

  ///////////////////////////////////////////////////////////////
  // 페이지 새로고침
  //////////////////////////////////////////////////////////////

  useEffect(() => {
    refetchBoardsOfTheBest({ page: 1 });
    refetch({ page: 1 });
  }, []);

  ///////////////////////////////////////////////////////////////
  // 대체 이미지
  //////////////////////////////////////////////////////////////
  const onErrorImg = (e: any) => {
    e.target.src = "/images/none.png";
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
        onErrorImg={onErrorImg}
      />
    </>
  );
}
