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
  const router = useRouter();

  if (typeof router.query.useditemId !== "string") return <></>;

  const { data, fetchMore } = useQuery(FETCH_USED_ITEM_QUESTIONS, {
    variables: { useditemId: router.query.useditemId },
  });

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

  ////////////////////////////////////////
  // 댓글 답글
  ////////////////////////////////////////

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

  return (
    <BoardCommentListUI
      data={data}
      onLoadMore={onLoadMore}
      dataAnswers={dataAnswers}
      onLoadMoreAnswers={onLoadMoreAnswers}
    />
  );
}
