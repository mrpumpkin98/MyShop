import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import type { ChangeEvent } from "react";
import BoardCommentWriteUI from "./BoardComment.presenter";
import {
  FETCH_USED_ITEM_QUESTIONS,
  FETCH_USED_ITEM_QUESTION_ANSWERS,
} from "../comment/BoardComment.queries";
import {
  CREATE_USED_ITEM_QUESTION,
  UPDATE_USED_ITEM_QUESTION,
  CREATE_USED_ITEM_QUESTION_ANSWER,
} from "./BoardComment.queries";
import type {
  IMutation,
  IMutationCreateBoardCommentArgs,
  IMutationUpdateBoardCommentArgs,
  IUpdateBoardCommentInput,
} from "../../../../commons/types/generated/types";

export default function BoardCommentWrite(props: any): JSX.Element {
  const router = useRouter();
  const [contents, setContents] = useState("");

  const [createUseditemQuestion] = useMutation(CREATE_USED_ITEM_QUESTION);

  const [updateUseditemQuestion] = useMutation(UPDATE_USED_ITEM_QUESTION);

  const [createUseditemQuestionAnswer] = useMutation(
    CREATE_USED_ITEM_QUESTION_ANSWER
  );

  const onChangeContents = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setContents(e.target.value);
  };

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
      alert("댓글등록");
      setContents("");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////
  // 댓글 업데이트
  ///////////////////////////////////////////////////////////////////////////////////////

  const onClickUpdate = async (): Promise<void> => {
    if (contents === "") {
      alert("내용이 수정되지 않았습니다.");
      return;
    }

    try {
      const updateUseditemQuestionInput: IUpdateBoardCommentInput = {};
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
      console.log(result);
      props.setIsEditComment?.("댓글수정OFF");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const onClickExport = (): void => {
    props.setIsisReply?.("대댓글OFF"), props.setIsEditComment?.("댓글수정OFF");
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

  /////////////////////////////return/////////////////////////////////

  return (
    <BoardCommentWriteUI
      onChangeContents={onChangeContents}
      onClickWrite={onClickWrite}
      onClickUpdate={onClickUpdate}
      onClickExport={onClickExport}
      contents={contents}
      isReply={props.isReply}
      isEditComment={props.isEditComment}
      el={props.el}
      onClickAnswer={onClickAnswer}
    />
  );
}
