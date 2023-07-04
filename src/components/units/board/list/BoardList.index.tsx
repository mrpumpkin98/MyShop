import { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import _ from "lodash";
import LayoutHeader from "../../../commons/layout/header/LayoutHeader.index";
import Paginations01 from "../../../../commons/paginations/01/Paginations01.container";
import { v4 as uuidv4 } from "uuid";
import Searchbars01 from "../../../../commons/searchbars/01/Searchbars01.container";
import * as B from "./BoardList.styles";
import { Money, getDate } from "../../../../commons/libraries/utils";
import { FETCH_BOARDS } from "../../../../commons/hooks/queries/UseQueryFetchBoards";
import { DELETE_BOARD } from "../../../../commons/hooks/mutations/useMutationDeleteBoard";
import { FETCH_BOARDS_COUNT } from "../../../../commons/hooks/queries/UseQueryFetchBoardsCount";
import { FETCH_BOARDS_OF_THE_BEST } from "../../../../commons/hooks/queries/UseQueryFetchBoardsOfTheBest";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FETCH_USED_ITEMS_OF_THE_BEST } from "../../../../commons/hooks/queries/UseQueryFetchUsedItemOfTheBest";
import InfiniteScroll from "react-infinite-scroller";

const SECRET = "@#$%";

export default function StaticRoutingPage() {
  ///////////////////////////////////////////////////////////////
  // router
  //////////////////////////////////////////////////////////////

  const router = useRouter();

  ///////////////////////////////////////////////////////////////
  // useState
  //////////////////////////////////////////////////////////////

  const [keyword, setKeyword] = useState("");
  const [shouldReload, setShouldReload] = useState(false);
  ///////////////////////////////////////////////////////////////
  // queries
  //////////////////////////////////////////////////////////////

  const { data, refetch, fetchMore } = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const { data: dataBoardsCount, refetch: refetchBoardsCount } =
    useQuery(FETCH_BOARDS_COUNT);
  const { data: dataBoardsOfTheBest, refetch: refetchBoardsOfTheBest } =
    useQuery(FETCH_BOARDS_OF_THE_BEST);
  const { data: dataUseditemsOfTheBest, refetch: refetchUseditemsOfTheBest } =
    useQuery(FETCH_USED_ITEMS_OF_THE_BEST);

  ///////////////////////////////////////////////////////////////
  //  게시물 삭제
  //////////////////////////////////////////////////////////////

  const onClickDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    deleteBoard({
      variables: { boardId: event.currentTarget.id },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
  };

  ///////////////////////////////////////////////////////////////
  //  게시물 이동
  //////////////////////////////////////////////////////////////

  const onClickSubmit = (event: any) => {
    const target = event.currentTarget;
    const postId = target.id;
    router.push(`/Board/${postId}`);
    // setShouldReload(true);
  };

  ///////////////////////////////////////////////////////////////
  //  게시물 등록 이동
  //////////////////////////////////////////////////////////////

  const onClickWrite = () => {
    router.push(`/Board/Write`);
  };

  ///////////////////////////////////////////////////////////////
  //  검색 컴포넌트 관련
  //////////////////////////////////////////////////////////////

  const getDebounce = _.debounce((value) => {
    void refetch({ search: value, page: 1 });
    setKeyword(value);
  }, 500);

  const onChangeKeyword = (value: string): void => {
    setKeyword(value);
  };

  ///////////////////////////////////////////////////////////////
  // 페이지 새로고침
  //////////////////////////////////////////////////////////////

  useEffect(() => {
    refetchBoardsOfTheBest({ page: 1 });
    refetch({ page: 1 });
  }, []);

  useEffect(() => {
    if (shouldReload) {
      setShouldReload(false);
      window.location.reload();
    }
  }, [shouldReload]);

  ///////////////////////////////////////////////////////////////
  // 대체 이미지
  //////////////////////////////////////////////////////////////
  const onErrorImg = (e: any) => {
    e.target.src = "/images/icons/all-icon-after-hover.png";
  };

  ///////////////////////////////////////////////////////////////
  // 무한 스크롤
  //////////////////////////////////////////////////////////////

  const onLoadMore = (): void => {
    if (data === undefined) return;
    void fetchMore({
      variables: {
        page: Math.ceil((data?.fetchBoards.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchBoards === undefined) {
          return {
            fetchBoards: [...prev.fetchBoards],
          };
        }
        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards],
        };
      },
    });
  };

  return (
    <>
      <B.Title>🏅 이주의 인기! Weekly Best 🏅</B.Title>
      <B.BestPostsTie>
        {dataBoardsOfTheBest?.fetchBoardsOfTheBest.map((i: any) => (
          <B.BestPosts key={i._id}>
            <B.BestPostBody>
              <B.BestPostImg
                src={`https://storage.googleapis.com/${i.images[0]}`}
                onError={onErrorImg}
                id={i._id}
                onClick={onClickSubmit}
              />
              <B.BestPostTitle id={i._id} onClick={onClickSubmit}>
                {i.title}
              </B.BestPostTitle>
              <B.BestPostContent onClick={onClickSubmit}>
                <B.BestPostInfo>
                  <B.AvatarWriterTie id={i._id} onClick={onClickSubmit}>
                    <B.Avatar src="/images/avatar.png" />
                    <B.Writer id={i._id} onClick={onClickSubmit}>
                      {" "}
                      {i.writer}
                    </B.Writer>
                  </B.AvatarWriterTie>
                  <B.CreatedAt id={i._id} onClick={onClickSubmit}>
                    {getDate(i.createdAt)}
                  </B.CreatedAt>
                </B.BestPostInfo>
                <B.LikeTie>
                  <B.Like
                    src="/images/avatar.png"
                    id={i._id}
                    onClick={onClickSubmit}
                  ></B.Like>
                  <B.LikeNum id={i._id} onClick={onClickSubmit}>
                    {i.likeCount}
                  </B.LikeNum>
                </B.LikeTie>
              </B.BestPostContent>
            </B.BestPostBody>
          </B.BestPosts>
        ))}
      </B.BestPostsTie>
      <B.Title>🏡 주간 인기 best 상품 🏡</B.Title>
      <B.BestPostsTie>
        {dataUseditemsOfTheBest?.fetchUseditemsOfTheBest.map((i: any) => (
          <B.BestPosts key={i._id}>
            <B.BestPostBody>
              <B.BestPostImg
                src={`https://storage.googleapis.com/${i.images[0]}`}
                onError={onErrorImg}
                id={i._id}
              />
              <B.BestPostTitle id={i._id}>{i.name}</B.BestPostTitle>
              <B.BestPostContent>
                <B.BestPostInfo>
                  <B.CreatedAt id={i._id}>{i.remarks}</B.CreatedAt>
                  <B.AvatarWriterTie id={i._id}>
                    <B.Writer id={i._id}> {Money(i.price)}</B.Writer>
                  </B.AvatarWriterTie>
                </B.BestPostInfo>
                <B.LikeTie>
                  <B.Like src="/images/avatar.png" id={i._id}></B.Like>
                  <B.LikeNum id={i._id}>{i.pickedCount}</B.LikeNum>
                </B.LikeTie>
              </B.BestPostContent>
            </B.BestPostBody>
          </B.BestPosts>
        ))}
      </B.BestPostsTie>
      <B.ButtonTie>
        <Searchbars01
          refetch={refetch}
          refetchBoardsCount={refetchBoardsCount}
          onChangeKeyword={onChangeKeyword}
        />
        <B.Button onClick={onClickWrite}>게시물 등록하기</B.Button>
      </B.ButtonTie>
      <InfiniteScroll
        pageStart={0}
        loadMore={onLoadMore}
        hasMore={true}
        useWindow={true}
      >
        <B.Body>
          {data?.fetchBoards.map((el: any) => (
            <B.BodyWrapper key={el._id}>
              <B.BasketListImg
                id={el._id}
                src={`https://storage.googleapis.com/${el.images[0]}`}
                onError={onErrorImg}
                onClick={onClickSubmit}
              />
              <B.LabelWrapper>
                <B.LabelTie>
                  <B.TitleTie>
                    <B.Label
                      id={el._id}
                      onClick={onClickSubmit}
                      className="Title"
                    >
                      {el.title
                        .replaceAll(keyword, `${SECRET}${keyword}${SECRET}`)
                        .split(SECRET)
                        .map((el: any) => (
                          <B.TextToken
                            key={uuidv4()}
                            isMatched={keyword === el}
                          >
                            {el}
                          </B.TextToken>
                        ))}
                    </B.Label>
                  </B.TitleTie>
                  <B.InfTie>
                    <Avatar
                      size={20}
                      style={{
                        cursor: "pointer",
                      }}
                      icon={<UserOutlined />}
                      src={`https://storage.googleapis.com/${el?.user?.picture}`}
                    />
                    <B.Label
                      id={el._id}
                      onClick={onClickSubmit}
                      className="Writer"
                    >
                      {el.writer}
                    </B.Label>
                  </B.InfTie>
                  <B.Label id={el._id} onClick={onClickSubmit} className="Time">
                    {getDate(el.createdAt)}
                  </B.Label>
                </B.LabelTie>
                <B.LikesTie>
                  <B.Likes />
                  <B.LikesNum>{el.likeCount}</B.LikesNum>
                </B.LikesTie>
              </B.LabelWrapper>
            </B.BodyWrapper>
          ))}
        </B.Body>
      </InfiniteScroll>
    </>
  );
}
