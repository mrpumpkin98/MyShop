import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IMutation,
  IMutationDeleteUseditemQuestionAnswerArgs,
} from "../../types/generated/types";
import { DELETE_USED_ITEM_QUESTION_ANSWER } from "../mutations/UseMutationDeleteUsedItemQuestionAnswer";
import { FETCH_USED_ITEM_QUESTION_ANSWERS } from "../queries/UseQueryFetchUsedItemQuestionsAnswers";

export const useOnClickQuestionAnswerDelete = (
  setIsOpenDeleteModal: any,
  props: any
) => {
  const router = useRouter();
  const [deleteUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "deleteUseditemQuestionAnswer">,
    IMutationDeleteUseditemQuestionAnswerArgs
  >(DELETE_USED_ITEM_QUESTION_ANSWER);
  const onClickDeleteReply = async (i: any): Promise<void> => {
    try {
      await deleteUseditemQuestionAnswer({
        variables: {
          useditemQuestionAnswerId: String(i.currentTarget.id),
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTION_ANSWERS,
            variables: { useditemQuestionId: props.el._id },
          },
        ],
      });
      setIsOpenDeleteModal(false);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  return {
    onClickDeleteReply,
  };
};
