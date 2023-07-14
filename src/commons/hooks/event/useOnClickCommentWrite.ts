import { useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCreateUseditemQuestionArgs,
} from "../../types/generated/types";
import { CREATE_USED_ITEM_QUESTION } from "../mutations/UseMutationCreateUsedItemQuestion";
import { useRouter } from "next/router";
import { FETCH_USED_ITEM_QUESTIONS } from "../queries/UseQueryFetchUsedItemQuestions";

export const useOnClickCommentWrite = (contents: any, setContents: any) => {
  const router = useRouter();
  const [createUseditemQuestion] = useMutation<
    Pick<IMutation, "createUseditemQuestion">,
    IMutationCreateUseditemQuestionArgs
  >(CREATE_USED_ITEM_QUESTION);
  const onClickWrite = async (): Promise<void> => {
    try {
      if (typeof router.query.useditemId !== "string") {
        alert("시스템에 문제가 있습니다.");
        return;
      }

      await createUseditemQuestion({
        variables: {
          createUseditemQuestionInput: {
            contents,
          },
          useditemId: router.query.useditemId,
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS,
            variables: { useditemId: router.query.useditemId },
          },
        ],
      });
      setContents("");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  return {
    onClickWrite,
  };
};
