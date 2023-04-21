import { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  FETCH_BOARD,
  DELETE_BOARD,
  LIKE_BOARD,
  DIS_LIKE_BOARD,
  FETCH_USED_ITEM,
  TOGGLE_USED_ITEM_PICK,
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
  const { data, refetch } = useQuery(FETCH_USED_ITEM, {
    variables: { useditemId: router.query.useditemId },
  });
  const [toggleUseditemPick] = useMutation(TOGGLE_USED_ITEM_PICK);

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
  // 마켓 좋아요
  //////////////////////////////////////////////////////////////

  const onClickLike = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.id);
    const result = await toggleUseditemPick({
      variables: { useditemId: router.query.useditemId },
      refetchQueries: [
        {
          query: FETCH_USED_ITEM,
          variables: { useditemId: router.query.useditemId },
        },
      ],
    });
  };

  ///////////////////////////////////////////////////////////////
  // 게시판 리스트 이동
  //////////////////////////////////////////////////////////////

  const onClickBoard = () => {
    router.push(`/Market`);
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

  ///////////////////////////////////////////////////////////////
  // 이미지 캐러셀
  //////////////////////////////////////////////////////////////

  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <BoardDetailUI
        data={data}
        onClickUpdate={onClickUpdate}
        onClickDelete={onClickDelete}
        onClickLike={onClickLike}
        onClickBoard={onClickBoard}
        settings={settings}
      />
    </div>
  );
}
