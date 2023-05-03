import * as B from "./BoardDetail.styles";
import { Money, Money2, getDate } from "../../../../commons/libraries/utils";
import { IBoardDetailUIProps } from "./BoardDetail.types";
import { Button, Tooltip } from "antd";
import DOMPurify from "dompurify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BoardComment from "../../market/comment/BoardComment.container";
import BoardCommentList from "../../market/commentlist/BoardCommentList.container";

declare const window: typeof globalThis & {
  kakao: any;
};

export default function BoardDetailUI(props: any) {
  return (
    <div>
      <B.Wrapper>
        <B.CardWrapper>
          <B.Header>
            <B.AvatarWrapper>
              <B.Avatar src="/images/avatar.png" />
              <B.Info>
                <B.Writer>임시 판매자</B.Writer>
                {/* <B.Writer>{props.data?.fetchUseditem?.seller}</B.Writer> */}
                <B.CreatedAt>
                  {getDate(props.data?.fetchUseditem?.createdAt)}
                </B.CreatedAt>
              </B.Info>
              <Tooltip
                placement="top"
                title={`${
                  props.data?.fetchUseditem.useditemAddress?.address ?? ""
                }
              ${
                props.data?.fetchUseditem.useditemAddress?.addressDetail ?? ""
              }`}
              >
                <B.Environment />
              </Tooltip>
              <B.PaperClip />
            </B.AvatarWrapper>
          </B.Header>
          <B.Body>
            <B.WidthWrapper>
              <B.WrapperRemarksNamePrice>
                <B.Remarks>{props.data?.fetchUseditem?.remarks}</B.Remarks>
                <B.Name>{props.data?.fetchUseditem?.name}</B.Name>
                <B.Price>{Money(props.data?.fetchUseditem?.price)}</B.Price>
              </B.WrapperRemarksNamePrice>
              <B.WrapperPickedCount>
                <B.Heart onClick={props.onClickLike} Active={props.Like} />
                <B.PickedCount>
                  {props.data?.fetchUseditem?.pickedCount}
                </B.PickedCount>
              </B.WrapperPickedCount>
            </B.WidthWrapper>
            <B.WrapperContents>
              <B.WrapperImage>
                <B.imImageResult>
                  <Slider {...props.settings}>
                    {props.data?.fetchUseditem.images
                      ?.filter((el: any) => el)
                      .map((el: any) => (
                        <B.Image
                          key={el}
                          src={`https://storage.googleapis.com/${el}`}
                        />
                      ))}
                  </Slider>
                </B.imImageResult>
              </B.WrapperImage>
              <B.Contents
                dangerouslySetInnerHTML={
                  props.data?.fetchUseditem?.contents
                    ? {
                        __html: DOMPurify.sanitize(
                          props.data.fetchUseditem.contents
                        ),
                      }
                    : undefined
                }
              />
              <B.Tags>
                {props.Tag?.map((el: any, index: any) => (
                  <B.Tag>#{props.Tag[index]}</B.Tag>
                ))}
              </B.Tags>
              <B.Map>
                <div
                  id={props.mapId}
                  style={{ width: "100%", height: "360px" }}
                ></div>
              </B.Map>
            </B.WrapperContents>
          </B.Body>
          <B.Footer></B.Footer>
        </B.CardWrapper>
        <B.BottomWrapper>
          <B.Button onClick={props.onClickBoard}>목록으로</B.Button>
          <B.Button onClick={props.onClickUpdate}>구매하기</B.Button>
          <B.Button onClick={props.onClickUpdate}>수정하기</B.Button>
        </B.BottomWrapper>
        <BoardComment />
        <BoardCommentList />
      </B.Wrapper>
    </div>
  );
}
