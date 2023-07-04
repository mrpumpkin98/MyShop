//####################################################################
//
// BOARD_DETAIL MAIN
//
//####################################################################

import BoardDetail from "../../../src/components/units/board/detail/BoardDetail.index";
import BoardComment from "../../../src/components/units/board/comment/BoardComment.container";
import BoardCommentList from "../../../src/components/units/board/commentlist/BoardCommentList.container";
import { useState } from "react";
import { Spin } from "antd";
import { FETCH_BOARD } from "../../../src/commons/hooks/queries/UseQueryFetchBoard";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

const CenteredSpin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LargeSpin = styled(Spin)`
  font-size: 48px;
`;

export default function GraphqlMutationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { data, refetch } = useQuery(FETCH_BOARD, {
    variables: { boardId: router.query.boardId },
    onCompleted: () => setLoading(false),
  });

  return (
    <>
      {loading ? (
        <CenteredSpin>
          <LargeSpin size="large" />
        </CenteredSpin>
      ) : (
        <>
          <BoardDetail />
          <BoardComment />
          <BoardCommentList />
        </>
      )}
    </>
  );
}
