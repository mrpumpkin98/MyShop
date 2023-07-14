import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IMutation,
  IMutationDeleteUseditemQuestionArgs,
} from "../../types/generated/types";
import { DELETE_USED_ITEM_QUESTION } from "../mutations/UseMutationDeleteUsedItemQuestion";
import { FETCH_USED_ITEM_QUESTIONS } from "../queries/UseQueryFetchUsedItemQuestions";

export const useOnClickQuestionDelete = (
  setIsOpenDeleteModal: any,
  props: any
) => {
  const router = useRouter();
  const [deleteUseditemQuestion] = useMutation<
    Pick<IMutation, "deleteUseditemQuestion">,
    IMutationDeleteUseditemQuestionArgs
  >(DELETE_USED_ITEM_QUESTION);
  const onClickDeleteComment = async (): Promise<void> => {
    try {
      await deleteUseditemQuestion({
        variables: {
          useditemQuestionId: props.el._id,
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS,
            variables: { useditemId: router.query.useditemId },
          },
        ],
      });
      setIsOpenDeleteModal(false);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  return {
    onClickDeleteComment,
  };
};
