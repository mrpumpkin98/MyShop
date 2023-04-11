import * as B from "./BoardDetail.styles";
import { getDate } from "../../../../commons/libraries/utils";
import { IBoardDetailUIProps } from "./BoardDetail.types";
import { Button, Tooltip } from "antd";

export default function BoardDetailUI(props: IBoardDetailUIProps) {
  return (
    <div>
      <B.Wrapper>
        <B.CardWrapper>
          <B.Header>
            <B.AvatarWrapper>
              <B.Avatar src="/images/avatar.png" />
              <B.Info>
                <B.Writer>{props.data?.fetchBoard?.writer}</B.Writer>
                <B.CreatedAt>
                  {getDate(props.data?.fetchBoard?.createdAt)}
                </B.CreatedAt>
              </B.Info>
              <Tooltip
                placement="top"
                title={`${props.data?.fetchBoard.boardAddress?.address ?? ""}
                ${props.data?.fetchBoard.boardAddress?.addressDetail ?? ""}`}
              >
                <B.Environment />
              </Tooltip>
              <B.PaperClip />
            </B.AvatarWrapper>
          </B.Header>
          <B.Body>
            <B.Title>{props.data?.fetchBoard?.title}</B.Title>
            <B.Contents>
              {props.data?.fetchBoard.youtubeUrl !== "" && (
                <B.Youtube
                  url={props.data?.fetchBoard.youtubeUrl ?? ""}
                  width="486px"
                  height="240px"
                />
              )}
              <B.imImageResult>
                {props.data?.fetchBoard.images
                  ?.filter((el) => el)
                  .map((el) => (
                    <B.Image
                      key={el}
                      src={`https://storage.googleapis.com/${el}`}
                    />
                  ))}
              </B.imImageResult>
              {props.data?.fetchBoard?.contents}
            </B.Contents>
          </B.Body>
          <B.Footer>
            <B.LikeTie>
              <B.Like onClick={props.onClickLike} />
              <B.LikeNumber>{props.data?.fetchBoard?.likeCount}</B.LikeNumber>
            </B.LikeTie>
            <B.DisLikeTie>
              <B.DisLike onClick={props.onClickDisLike} />
              <B.DisLikeNumber>
                {props.data?.fetchBoard?.dislikeCount}
              </B.DisLikeNumber>
            </B.DisLikeTie>
          </B.Footer>
        </B.CardWrapper>
        <B.BottomWrapper>
          <B.Button onClick={props.onClickBoard}>목록으로</B.Button>
          <B.Button onClick={props.onClickUpdate}>수정하기</B.Button>
          <B.Button onClick={props.onClickDelete}>삭제하기</B.Button>
        </B.BottomWrapper>
      </B.Wrapper>
    </div>
  );
}
