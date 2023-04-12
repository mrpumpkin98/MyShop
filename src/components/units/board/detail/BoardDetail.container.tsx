import { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  FETCH_BOARD,
  DELETE_BOARD,
  LIKE_BOARD,
  DIS_LIKE_BOARD,
} from "./BoardDetail.queries";
import BoardDetailUI from "./BoardDetail.presenter";

export default function BoardDetailPage() {
  ///////////////////////////////////////////////////////////////
  // router
  //////////////////////////////////////////////////////////////

  const router = useRouter();

  ///////////////////////////////////////////////////////////////
  // queries
  //////////////////////////////////////////////////////////////

  const [deleteBoard] = useMutation(DELETE_BOARD);
  const [likeBoard] = useMutation(LIKE_BOARD);
  const [dislikeBoard] = useMutation(DIS_LIKE_BOARD);
  const { data, refetch } = useQuery(FETCH_BOARD, {
    variables: { boardId: router.query.boardId },
  });

  ///////////////////////////////////////////////////////////////
  // 게시물 삭제
  //////////////////////////////////////////////////////////////

  const onClickDelete = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const result = await deleteBoard({
      variables: { boardId: router.query.boardId },
    });
    router.push(`/Board`);
  };

  ///////////////////////////////////////////////////////////////
  // 좋아요
  //////////////////////////////////////////////////////////////

  const onClickLike = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.id);
    const result = await likeBoard({
      variables: { boardId: router.query.boardId },
      refetchQueries: [
        {
          query: FETCH_BOARD,
          variables: { boardId: router.query.boardId },
        },
      ],
    });
  };

  ///////////////////////////////////////////////////////////////
  // 싫어요
  //////////////////////////////////////////////////////////////

  const onClickDisLike = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.id);
    const result = await dislikeBoard({
      variables: { boardId: router.query.boardId },
      refetchQueries: [
        {
          query: FETCH_BOARD,
          variables: { boardId: router.query.boardId },
        },
      ],
    });
  };

  ///////////////////////////////////////////////////////////////
  // 게시판 리스트 이동
  //////////////////////////////////////////////////////////////

  const onClickBoard = () => {
    router.push(`/Board`);
  };

  ///////////////////////////////////////////////////////////////
  // 게시물 수정하기 이동
  //////////////////////////////////////////////////////////////

  const onClickUpdate = () => {
    router.push(`/Board/${router.query.boardId}/edit`);
  };

  ///////////////////////////////////////////////////////////////
  // 페이지 새로고침
  //////////////////////////////////////////////////////////////

  useEffect(() => {
    refetch({ page: 1 });
  }, []);

  return (
    <div>
      <BoardDetailUI
        data={data}
        onClickUpdate={onClickUpdate}
        onClickDelete={onClickDelete}
        onClickLike={onClickLike}
        onClickDisLike={onClickDisLike}
        onClickBoard={onClickBoard}
      />
    </div>
  );
}
