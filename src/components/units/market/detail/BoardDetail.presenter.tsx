import * as B from "./BoardDetail.styles";
import { Money, Money2, getDate } from "../../../../commons/libraries/utils";
import { IBoardDetailUIProps } from "./BoardDetail.types";
import { Button, Tooltip } from "antd";

export default function BoardDetailUI(props) {
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
                <B.Heart />
                <B.PickedCount>
                  {props.data?.fetchUseditem?.pickedCount}
                </B.PickedCount>
              </B.WrapperPickedCount>
            </B.WidthWrapper>
            <B.WrapperContents>
              <B.imImageResult>
                {props.data?.fetchUseditem.images
                  ?.filter((el) => el)
                  .map((el) => (
                    <B.Image
                      key={el}
                      src={`https://storage.googleapis.com/${el}`}
                    />
                  ))}
              </B.imImageResult>
              <B.Contents>{props.data?.fetchUseditem?.contents}</B.Contents>
              <B.Tags>#{props.data?.fetchUseditem?.tags}</B.Tags>
            </B.WrapperContents>
          </B.Body>
          <B.Footer></B.Footer>
        </B.CardWrapper>
        <B.BottomWrapper>
          <B.Button onClick={props.onClickBoard}>목록으로</B.Button>
          <B.Button onClick={props.onClickUpdate}>구매하기</B.Button>
        </B.BottomWrapper>
      </B.Wrapper>
    </div>
  );
}
