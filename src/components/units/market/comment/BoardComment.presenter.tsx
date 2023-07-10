import * as B from "./BoardComment.styles";
import { getDate } from "../../../../commons/libraries/utils";
import { Rate, Modal } from "antd";
import BoardComment from "../../market/comment/BoardComment.container";
import BoardCommentList from "../../market/commentlist/BoardCommentList.container";

export default function BoardCommentUI(props: any) {
  return (
    <div>
      <B.Wrapper>
        <B.CardWrapper>
          <B.Body>
            <B.BodyInput
              onChange={props.onChangeContents}
              maxLength={15}
              value={props.contents}
              IsReply={props.isReply === "대댓글ON"}
            />
            <B.BodyButton
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
            </B.BodyButton>
            {props.isReply && (
              <B.BodyButton onClick={props.onClickExport} className="No">
                취소
              </B.BodyButton>
            )}
            {props.isEditComment && (
              <B.BodyButton onClick={props.onClickExport} className="No">
                취소
              </B.BodyButton>
            )}
            {props.isEditReply && (
              <B.BodyButton onClick={props.onClickExport} className="No">
                취소
              </B.BodyButton>
            )}
          </B.Body>
        </B.CardWrapper>
      </B.Wrapper>
    </div>
  );
}
