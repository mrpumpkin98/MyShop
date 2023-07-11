import * as B from "./Comment.styles";

export default function CommentUI(props: any) {
  return (
    <>
      <B.Wrapper>
        <B.CommentWrapper>
          <B.CommentBox>
            <B.Input
              onChange={props.onChangeContents}
              maxLength={15}
              value={props.contents}
              IsReply={props.isReply === "대댓글ON"}
            />
            <B.Button1
              onClick={
                props.isReply === "대댓글ON"
                  ? props.onClickAnswer
                  : props.isEditComment === "댓글수정ON"
                  ? props.onClickUpdate
                  : props.isEditReply === "댓글수정ON"
                  ? props.onClickUpdateEditReply
                  : props.onClickWrite
              }
              IsReply={props.isReply === "대댓글ON"}
            >
              {props.isReply === "대댓글ON"
                ? "댓글"
                : props.isEditComment === "댓글수정ON"
                ? "수정"
                : "댓글"}
            </B.Button1>
            {props.isReply && (
              <B.Button2 onClick={props.onClickExport} className="No">
                취소
              </B.Button2>
            )}
            {props.isEditComment && (
              <B.Button2 onClick={props.onClickExport} className="No">
                취소
              </B.Button2>
            )}
            {props.isEditReply && (
              <B.Button2 onClick={props.onClickExport} className="No">
                취소
              </B.Button2>
            )}
          </B.CommentBox>
        </B.CommentWrapper>
      </B.Wrapper>
    </>
  );
}
