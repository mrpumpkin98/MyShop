import { useRouter } from "next/router";
import { FETCH_USED_ITEM_QUESTION_ANSWERS } from "../queries/UseQueryFetchUsedItemQuestionsAnswers";
import { useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCreateUseditemQuestionAnswerArgs,
} from "../../types/generated/types";
import { CREATE_USED_ITEM_QUESTION_ANSWER } from "../mutations/UseMutationCreateUsedItemQuestionAnswer";

export const useOnClickQuestionAnswerWrite = (contents: any, props: any) => {
  const router = useRouter();
  const [createUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "createUseditemQuestionAnswer">,
    IMutationCreateUseditemQuestionAnswerArgs
  >(CREATE_USED_ITEM_QUESTION_ANSWER);
  const onClickAnswer = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const result = await createUseditemQuestionAnswer({
      variables: {
        createUseditemQuestionAnswerInput: {
          contents,
        },
        useditemQuestionId: props.el?._id,
      },
      refetchQueries: [
        {
          query: FETCH_USED_ITEM_QUESTION_ANSWERS,
          variables: { useditemQuestionId: props.el?._id },
        },
      ],
    });
    props.setIsisReply?.("대댓글OFF");
  };

  return {
    onClickAnswer,
  };
};
