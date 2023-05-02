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

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setContents(event.target.value);
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
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }

    setContents("");
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
      await updateUseditemQuestion({
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
      props.setIsEdit?.(false);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const onClickExport = (): void => {
    props.setIsEdit?.(false);
  };

  ////////////////////////////////////////////////////////////////////////////////////////
  // 댓글 답글
  ///////////////////////////////////////////////////////////////////////////////////////
  // const onClickAnswer = async (): Promise<void> => {
  //   try {
  //     if (typeof router.query.useditemId !== "string") {
  //       alert("시스템에 문제가 있습니다.");
  //       return;
  //     }

  //     await createUseditemQuestionAnswer({
  //       variables: {
  //         createUseditemQuestionAnswerInput: {
  //           contents,
  //         },
  //         useditemQuestionId: props.el?._id,
  //       },
  //       refetchQueries: [
  //         {
  //           query: FETCH_USED_ITEM_QUESTIONS,
  //           variables: { useditemId: router.query.useditemId },
  //         },
  //       ],
  //     });
  //     props.setIsEdit?.(false);
  //   } catch (error) {
  //     if (error instanceof Error) alert(error.message);
  //   }
  // };

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
    props.setIsEdit?.(false);
  };

  return (
    <BoardCommentWriteUI
      onChangeContents={onChangeContents}
      onClickWrite={onClickWrite}
      onClickUpdate={onClickUpdate}
      onClickExport={onClickExport}
      contents={contents}
      isEdit={props.isEdit}
      el={props.el}
      onClickAnswer={onClickAnswer}
    />
  );
}
