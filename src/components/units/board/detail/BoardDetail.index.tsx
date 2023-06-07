import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import * as B from "./BoardDetail.styles";
import { getDate } from "../../../../commons/libraries/utils";
import { Tooltip } from "antd";
import { DELETE_BOARD } from "../../../../commons/hooks/mutations/useMutationDeleteBoard";
import { LIKE_BOARD } from "../../../../commons/hooks/mutations/useMutationLikeBoard";
import { DIS_LIKE_BOARD } from "../../../../commons/hooks/mutations/useMutationDisLikeBoard";
import { FETCH_BOARD } from "../../../../commons/hooks/queries/UseQueryFetchBoard";

export default function BoardDetailPage() {
  ///////////////////////////////////////////////////////////////
  // router
  //////////////////////////////////////////////////////////////

  const router = useRouter();

  ///////////////////////////////////////////////////////////////
  // queries
  //////////////////////////////////////////////////////////////

  const [deleteBoard] = useMutation(DELETE_BOARD);
  const [likeBoard] = useMutation(LIKE_BOARD);
  const [dislikeBoard] = useMutation(DIS_LIKE_BOARD);
  const { data, refetch } = useQuery(FETCH_BOARD, {
    variables: { boardId: router.query.boardId },
  });

  ///////////////////////////////////////////////////////////////
  // 게시물 삭제
  //////////////////////////////////////////////////////////////

  const onClickDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const result = await deleteBoard({
      variables: { boardId: router.query.boardId },
    });
    router.push(`/Board`);
  };

  ///////////////////////////////////////////////////////////////
  // 좋아요
  //////////////////////////////////////////////////////////////

  const onClickLike = async (
    event: React.MouseEvent<HTMLTableDataCellElement>
  ) => {
    console.log(data);
    const result = await likeBoard({
      variables: { boardId: router.query.boardId },
      refetchQueries: [
        {
          query: FETCH_BOARD,
          variables: { boardId: router.query.boardId },
        },
      ],
    });
  };

  ///////////////////////////////////////////////////////////////
  // 싫어요
  //////////////////////////////////////////////////////////////

  const onClickDisLike = async (
    event: React.MouseEvent<HTMLTableDataCellElement>
  ) => {
    console.log(event.currentTarget.id);
    const result = await dislikeBoard({
      variables: { boardId: router.query.boardId },
      refetchQueries: [
        {
          query: FETCH_BOARD,
          variables: { boardId: router.query.boardId },
        },
      ],
    });
  };

  ///////////////////////////////////////////////////////////////
  // 게시판 리스트 이동
  //////////////////////////////////////////////////////////////

  const onClickBoard = () => {
    router.push(`/Board`);
  };

  ///////////////////////////////////////////////////////////////
  // 게시물 수정하기 이동
  //////////////////////////////////////////////////////////////

  const onClickUpdate = () => {
    router.push(`/Board/${router.query.boardId}/edit`);
  };

  ///////////////////////////////////////////////////////////////
  // 페이지 새로고침
  //////////////////////////////////////////////////////////////

  // useEffect(() => {
  //   refetch({ page: 1 });
  // }, []);

  useEffect(() => {
    refetch({ boardId: router.query.boardId });
  }, [router.query.boardId]);

  return (
    <div>
      <B.Wrapper>
        <B.CardWrapper>
          <B.Header>
            <B.AvatarWrapper>
              <B.Avatar src="/images/avatar.png" />
              <B.Info>
                <B.Writer>{data?.fetchBoard?.writer}</B.Writer>
                <B.CreatedAt>
                  {getDate(data?.fetchBoard?.createdAt)}
                </B.CreatedAt>
              </B.Info>
              <Tooltip
                placement="top"
                title={`${data?.fetchBoard.boardAddress?.address ?? ""}
                ${data?.fetchBoard.boardAddress?.addressDetail ?? ""}`}
              >
                <B.Environment />
              </Tooltip>
              <B.PaperClip />
            </B.AvatarWrapper>
          </B.Header>
          <B.Body>
            <B.Title>{data?.fetchBoard?.title}</B.Title>
            <B.Contents>
              {data?.fetchBoard?.contents}
              {data?.fetchBoard.youtubeUrl !== "" && (
                <B.Youtube
                  url={data?.fetchBoard.youtubeUrl ?? ""}
                  width="911px"
                  height="480px"
                />
              )}
              <B.imImageResult>
                {data?.fetchBoard.images
                  ?.filter((el: any) => el)
                  .map((el: any) => (
                    <B.Image
                      key={el}
                      src={`https://storage.googleapis.com/${el}`}
                    />
                  ))}
              </B.imImageResult>
            </B.Contents>
          </B.Body>
          <B.Footer>
            <B.LikeTie>
              <B.Like onClick={onClickLike} />
              <B.LikeNumber>{data?.fetchBoard?.likeCount}</B.LikeNumber>
            </B.LikeTie>
            <B.DisLikeTie>
              <B.DisLike onClick={onClickDisLike} />
              <B.DisLikeNumber>
                {data?.fetchBoard?.dislikeCount}
              </B.DisLikeNumber>
            </B.DisLikeTie>
          </B.Footer>
        </B.CardWrapper>
        <B.BottomWrapper>
          <B.Button onClick={onClickBoard}>목록으로</B.Button>
          <B.Button onClick={onClickUpdate}>수정하기</B.Button>
          <B.Button onClick={onClickDelete}>삭제하기</B.Button>
        </B.BottomWrapper>
      </B.Wrapper>
    </div>
  );
}
