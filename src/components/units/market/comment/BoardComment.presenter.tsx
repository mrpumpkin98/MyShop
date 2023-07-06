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
          {props.isEdit === false && (
            <B.Header>
              <B.HeaderImage src="/images/B.HeaderImage.png"></B.HeaderImage>
              <B.HeaderTitle>댓글</B.HeaderTitle>
            </B.Header>
          )}
          <B.Body>
            <B.BodyInput
              onChange={props.onChangeContents}
              maxLength={15}
              value={props.contents}
              Active={props.isEdit === true}
            />
            <B.BodyButton
              onClick={
                props.isEdit === true ? props.onClickAnswer : props.onClickWrite
              }
              Active={props.isEdit === true}
            >
              {props.isEdit ? "답글" : "등록"}
            </B.BodyButton>
            {props.isEdit && (
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
