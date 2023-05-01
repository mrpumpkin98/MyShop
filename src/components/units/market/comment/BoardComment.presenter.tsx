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
          <B.InFor>
            {props.isEdit === true && (
              <B.Export onClick={props.onClickExport} />
            )}
          </B.InFor>
          <B.Body>
            <B.BodyInput
              type="text"
              placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
              onChange={props.onChangeContents}
              value={
                props.contents !== ""
                  ? props.contents
                  : props.el?.contents ?? ""
              }
              maxLength={100}
              Active={props.isEdit === true}
            />
            <B.BodyNumberTie>
              <B.BodyNumber>
                {" "}
                {props.contents !== ""
                  ? props.contents.length
                  : props.el?.contents.length ?? 0}
                /100
              </B.BodyNumber>
              <B.BodyButton
                onClick={
                  props.isEdit === true
                    ? props.onClickUpdate
                    : props.onClickWrite
                }
                Active={props.isEdit === true}
              >
                {props.isEdit ? "수정하기" : "등록하기"}
              </B.BodyButton>
            </B.BodyNumberTie>
          </B.Body>
        </B.CardWrapper>
      </B.Wrapper>
    </div>
  );
}
