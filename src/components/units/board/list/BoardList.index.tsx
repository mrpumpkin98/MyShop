import { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import _ from "lodash";
import LayoutHeader from "../../../commons/layout/header/LayoutHeader.index";
import Paginations01 from "../../../../commons/paginations/01/Paginations01.container";
import { v4 as uuidv4 } from "uuid";
import Searchbars01 from "../../../../commons/searchbars/01/Searchbars01.container";
import * as B from "./BoardList.styles";
import { getDate } from "../../../../commons/libraries/utils";
import { FETCH_BOARDS } from "../../../../commons/hooks/queries/UseQueryFetchBoards";
import { DELETE_BOARD } from "../../../../commons/hooks/mutations/useMutationDeleteBoard";
import { FETCH_BOARDS_COUNT } from "../../../../commons/hooks/queries/UseQueryFetchBoardsCount";
import { FETCH_BOARDS_OF_THE_BEST } from "../../../../commons/hooks/queries/UseQueryFetchBoardsOfTheBest";

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

  ///////////////////////////////////////////////////////////////
  // queries
  //////////////////////////////////////////////////////////////

  const { data, refetch } = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const { data: dataBoardsCount, refetch: refetchBoardsCount } =
    useQuery(FETCH_BOARDS_COUNT);
  const { data: dataBoardsOfTheBest, refetch: refetchBoardsOfTheBest } =
    useQuery(FETCH_BOARDS_OF_THE_BEST);

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
    router.push(`/Board/${event.currentTarget.id}`);
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

  ///////////////////////////////////////////////////////////////
  // 대체 이미지
  //////////////////////////////////////////////////////////////
  const onErrorImg = (e: any) => {
    e.target.src = "/images/none.png";
  };

  return (
    <>
      <B.Title>베스트 게시글</B.Title>
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
      <Searchbars01
        refetch={refetch}
        refetchBoardsCount={refetchBoardsCount}
        onChangeKeyword={onChangeKeyword}
      />
      <B.Table>
        <B.Tr>
          <B.Th>아이디</B.Th>
          <B.Th>작성자</B.Th>
          <B.Th>제목</B.Th>
          <B.Th>날짜</B.Th>
        </B.Tr>
        {data?.fetchBoards.map((el: any) => (
          <B.Tr key={el._id}>
            <B.Td>{String(el._id).slice(-4).toUpperCase()}</B.Td>
            <B.Td
              style={{ margin: "10px" }}
              id={el._id}
              onClick={onClickSubmit}
            >
              {el.writer}
            </B.Td>
            <B.Td
              style={{ margin: "10px" }}
              id={el._id}
              onClick={onClickSubmit}
            >
              {el.title
                .replaceAll(keyword, `${SECRET}${keyword}${SECRET}`)
                .split(SECRET)
                .map((el: any) => (
                  <B.TextToken key={uuidv4()} isMatched={keyword === el}>
                    {el}
                  </B.TextToken>
                ))}
            </B.Td>
            <B.Td
              style={{ margin: "10px" }}
              id={el._id}
              onClick={onClickSubmit}
            >
              {getDate(el.createdAt)}
            </B.Td>
          </B.Tr>
        ))}
      </B.Table>
      <B.Pagination>
        <Paginations01
          refetch={refetch}
          count={dataBoardsCount?.fetchBoardsCount}
        />
      </B.Pagination>
      <B.ButtonTie>
        <B.Button onClick={onClickWrite}>게시물 등록하기</B.Button>
      </B.ButtonTie>
    </>
  );
}
