import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import type { ChangeEvent } from "react";
import BoardCommentWriteUI from "./Comment.presenter";
import { CREATE_USED_ITEM_QUESTION } from "../../../../commons/hooks/mutations/UseMutationCreateUsedItemQuestion";
import { UPDATE_USED_ITEM_QUESTION } from "../../../../commons/hooks/mutations/UseMutationUpdateUsedItemQuestion";
import { CREATE_USED_ITEM_QUESTION_ANSWER } from "../../../../commons/hooks/mutations/UseMutationCreateUsedItemQuestionAnswer";
import { UPDATE_USED_ITEM_QUESTION_ANSWERS } from "../../../../commons/hooks/mutations/UseMutationUpdateUsedItemQuestionAnswers";
import { FETCH_USED_ITEM_QUESTIONS } from "../../../../commons/hooks/queries/UseQueryFetchUsedItemQuestions";
import { FETCH_USED_ITEM_QUESTION_ANSWERS } from "../../../../commons/hooks/queries/UseQueryFetchUsedItemQuestionsAnswers";

export default function CommentWrite(props: any): JSX.Element {
  const router = useRouter();
  const [contents, setContents] = useState("");
  const [createUseditemQuestion] = useMutation(CREATE_USED_ITEM_QUESTION);
  const [updateUseditemQuestion] = useMutation(UPDATE_USED_ITEM_QUESTION);
  const [createUseditemQuestionAnswer] = useMutation(
    CREATE_USED_ITEM_QUESTION_ANSWER
  );
  const [updateUseditemQuestionAnswer] = useMutation(
    UPDATE_USED_ITEM_QUESTION_ANSWERS
  );
  const onChangeContents = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setContents(e.target.value);
  };

  // < 댓글 작성 >

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

  // < 댓글 업데이트 >

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

  // < 취소 >

  const onClickExport = (): void => {
    props.setIsisReply?.("대댓글OFF"),
      props.setIsEditComment?.("댓글수정OFF"),
      props.setIsEditReply?.("대댓글수정OFF");
  };

  ////////////////////////////////////////////////////////////////////////////////////////
  // 대댓글
  ///////////////////////////////////////////////////////////////////////////////////////

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
    console.log(result);
    props.setIsisReply?.("대댓글OFF");
  };

  ////////////////////////////////////////////////////////////////////////////////////////
  // 댓글 업데이트
  ///////////////////////////////////////////////////////////////////////////////////////

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

  /////////////////////////////return/////////////////////////////////

  return (
    <BoardCommentWriteUI
      onChangeContents={onChangeContents}
      onClickWrite={onClickWrite}
      onClickUpdate={onClickUpdate}
      onClickExport={onClickExport}
      onClickUpdateEditReply={onClickUpdateEditReply}
      contents={contents}
      isReply={props.isReply}
      isEditReply={props.isEditReply}
      isEditComment={props.isEditComment}
      el={props.el}
      onClickAnswer={onClickAnswer}
    />
  );
}
