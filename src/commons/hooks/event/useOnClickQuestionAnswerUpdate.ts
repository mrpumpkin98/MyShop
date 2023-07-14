import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IMutation,
  IMutationUpdateUseditemQuestionAnswerArgs,
} from "../../types/generated/types";
import { UPDATE_USED_ITEM_QUESTION_ANSWERS } from "../mutations/UseMutationUpdateUsedItemQuestionAnswers";
import { FETCH_USED_ITEM_QUESTION_ANSWERS } from "../queries/UseQueryFetchUsedItemQuestionsAnswers";

export const useOnClickQuestionAnswerUpdate = (contents: any, props: any) => {
  const router = useRouter();
  const [updateUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "updateUseditemQuestionAnswer">,
    IMutationUpdateUseditemQuestionAnswerArgs
  >(UPDATE_USED_ITEM_QUESTION_ANSWERS);
  const onClickUpdateEditReply = async (): Promise<void> => {
    if (contents === "") {
      alert("내용이 수정되지 않았습니다.");
      return;
    }
    try {
      const updateUseditemQuestionAnswerInput: any = {};
      if (contents !== "")
        updateUseditemQuestionAnswerInput.contents = contents;

      if (typeof props.el?._id !== "string") {
        alert("시스템에 문제가 있습니다.");
        return;
      }
      const result = await updateUseditemQuestionAnswer({
        variables: {
          updateUseditemQuestionAnswerInput,
          useditemQuestionAnswerId: props.i.currentTarget.id,
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTION_ANSWERS,
            variables: { useditemQuestionId: props.el._id },
          },
        ],
      });
      console.log(result);
      props.setIsEditReply?.("대댓글수정OFF");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  return {
    onClickUpdateEditReply,
  };
};
