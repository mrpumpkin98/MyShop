import { useRouter } from "next/router";
import { FETCH_USED_ITEM_QUESTIONS } from "../queries/UseQueryFetchUsedItemQuestions";
import { useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationUpdateUseditemQuestionArgs,
} from "../../types/generated/types";
import { UPDATE_USED_ITEM_QUESTION } from "../mutations/UseMutationUpdateUsedItemQuestion";

export const useOnClickCommentUpdate = (contents: any, props: any) => {
  const router = useRouter();
  const [updateUseditemQuestion] = useMutation<
    Pick<IMutation, "updateUseditemQuestion">,
    IMutationUpdateUseditemQuestionArgs
  >(UPDATE_USED_ITEM_QUESTION);
  const onClickUpdate = async (): Promise<void> => {
    if (contents === "") {
      alert("내용이 수정되지 않았습니다.");
      return;
    }
    try {
      const updateUseditemQuestionInput: any = {};
      if (contents !== "") updateUseditemQuestionInput.contents = contents;

      if (typeof props.el?._id !== "string") {
        alert("시스템에 문제가 있습니다.");
        return;
      }
      const result = await updateUseditemQuestion({
        variables: {
          updateUseditemQuestionInput,
          useditemQuestionId: props.el?._id,
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS,
            variables: { useditemId: router.query.useditemId },
          },
        ],
      });
      props.setIsEditComment?.("댓글수정OFF");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  return {
    onClickUpdate,
  };
};
