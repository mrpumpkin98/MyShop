import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import type {
  IQuery,
  IQueryFetchBoardCommentsArgs,
} from "../../../../commons/types/generated/types";
import BoardCommentListUI from "./BoardCommentList.presenter";
import {
  FETCH_USED_ITEM_QUESTIONS,
  FETCH_USED_ITEM_QUESTION_ANSWERS,
} from "./BoardCommentList.queries";

export default function BoardCommentList(): JSX.Element {
  ///////////////////////////////////////////////////////////////
  // router
  //////////////////////////////////////////////////////////////
  const router = useRouter();
  if (typeof router.query.useditemId !== "string") return <></>;

  ///////////////////////////////////////////////////////////////
  // queries
  //////////////////////////////////////////////////////////////

  const { data, fetchMore } = useQuery(FETCH_USED_ITEM_QUESTIONS, {
    variables: { useditemId: router.query.useditemId },
  });

  ///////////////////////////////////////////////////////////////
  // 인피니티 스크롤 onLoadMore
  //////////////////////////////////////////////////////////////

  const onLoadMore = (): void => {
    if (data === undefined) return;

    void fetchMore({
      variables: {
        page: Math.ceil(data?.fetchUseditemQuestions.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult?.fetchUseditemQuestions === undefined)
          return { fetchUseditemQuestions: [...prev.fetchUseditemQuestions] };

        return {
          fetchUseditemQuestions: [
            ...prev.fetchUseditemQuestions,
            ...fetchMoreResult.fetchUseditemQuestions,
          ],
        };
      },
    });
  };

  ///////////////////////////////////////////////////////////////
  // 대댓글
  //////////////////////////////////////////////////////////////

  if (typeof router.query.useditemId !== "string") return <></>;

  const { data: dataAnswers, fetchMore: fetchMoreAnswers } = useQuery(
    FETCH_USED_ITEM_QUESTION_ANSWERS,
    {
      variables: { useditemQuestionId: router.query.useditemQuestionId },
    }
  );

  const onLoadMoreAnswers = (): void => {
    if (dataAnswers === undefined) return;

    void fetchMoreAnswers({
      variables: {
        page: Math.ceil(data?.fetchUseditemQuestionAnswers.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult?.fetchUseditemQuestionAnswers === undefined)
          return {
            fetchUseditemQuestionAnswers: [
              ...prev.fetchUseditemQuestionAnswers,
            ],
          };

        return {
          fetchUseditemQuestionAnswers: [
            ...prev.fetchUseditemQuestionAnswers,
            ...fetchMoreResult.fetchUseditemQuestionAnswers,
          ],
        };
      },
    });
  };

  /////////////////////////////return/////////////////////////////////

  return (
    <BoardCommentListUI
      data={data}
      onLoadMore={onLoadMore}
      dataAnswers={dataAnswers}
      onLoadMoreAnswers={onLoadMoreAnswers}
    />
  );
}
