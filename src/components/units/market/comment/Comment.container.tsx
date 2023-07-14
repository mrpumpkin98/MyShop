import { useState } from "react";
import type { ChangeEvent } from "react";
import BoardCommentWriteUI from "./Comment.presenter";
import { useOnClickCommentWrite } from "../../../../commons/hooks/event/useOnClickCommentWrite";
import { useOnClickCommentUpdate } from "../../../../commons/hooks/event/useOnClickCommentUpdate";
import { useOnClickQuestionAnswerWrite } from "../../../../commons/hooks/event/useOnClickQuestionAnswerWrite";
import { useOnClickQuestionAnswerUpdate } from "../../../../commons/hooks/event/useOnClickQuestionAnswerUpdate";

export default function CommentWrite(props: any): JSX.Element {
  const [contents, setContents] = useState("");
  const onChangeContents = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setContents(e.target.value);
  };

  // < 댓글 작성 >
  const { onClickWrite } = useOnClickCommentWrite(contents, setContents);

  // < 댓글 업데이트 >
  const { onClickUpdate } = useOnClickCommentUpdate(contents, props);

  // < 취소 >
  const onClickExport = (): void => {
    props.setIsisReply?.("대댓글OFF"),
      props.setIsEditComment?.("댓글수정OFF"),
      props.setIsEditReply?.("대댓글수정OFF");
  };

  // < 대댓글 작성 >
  const { onClickAnswer } = useOnClickQuestionAnswerWrite(contents, props);

  // < 댓글 업데이트 >
  const { onClickUpdateEditReply } = useOnClickQuestionAnswerUpdate(
    contents,
    props
  );

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
