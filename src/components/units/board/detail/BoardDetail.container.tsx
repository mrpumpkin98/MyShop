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
  const router = useRouter();
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const [likeBoard] = useMutation(LIKE_BOARD);
  const [dislikeBoard] = useMutation(DIS_LIKE_BOARD);

  const { data, refetch } = useQuery(FETCH_BOARD, {
    variables: { boardId: router.query.boardId },
  });

  const onClickDelete = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const result = await deleteBoard({
      variables: { boardId: router.query.boardId },
    });
    router.push(`/Board`);
  };

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

  const onClickBoard = () => {
    router.push(`/Board`);
  };

  const onClickUpdate = () => {
    router.push(`/Board/${router.query.boardId}/edit`);
  };

  useEffect(() => {
    const result = refetch({
      variables: {},
      refetchQueries: [
        {
          query: FETCH_BOARD,
          variables: { boardId: router.query.boardId },
        },
      ],
    });
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
