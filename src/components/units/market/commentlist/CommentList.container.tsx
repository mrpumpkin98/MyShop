import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import BoardCommentListUI from "./CommentList.presenter";
import { FETCH_USED_ITEM_QUESTION_ANSWERS } from "../../../../commons/hooks/queries/UseQueryFetchUsedItemQuestionsAnswers";
import { FETCH_USED_ITEM_QUESTIONS } from "../../../../commons/hooks/queries/UseQueryFetchUsedItemQuestions";

export default function CommentList(): JSX.Element {
  const router = useRouter();
  const { data, fetchMore } = useQuery(FETCH_USED_ITEM_QUESTIONS, {
    variables: { useditemId: router.query.useditemId },
  });
  const { data: dataAnswers, fetchMore: fetchMoreAnswers } = useQuery(
    FETCH_USED_ITEM_QUESTION_ANSWERS,
    {
      variables: { useditemQuestionId: router.query.useditemQuestionId },
    }
  );

  // < 댓글 무한 스크롤 >

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

  // < 대댓글 무한 스크롤 >

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
