import * as B from "./BoardList.styles";
import { getDate } from "../../../../commons/libraries/utils";
import {} from "../../../../commons/libraries/utils";
import { IBoardListUIProps } from "./BoardList.types";
import Paginations01 from "../../../../commons/paginations/01/Paginations01.container";
import { v4 as uuidv4 } from "uuid";
import Searchbars01 from "../../../../commons/searchbars/01/Searchbars01.container";

const SECRET = "@#$%";

export default function BoardListUI(props) {
  return (
    <>
      <B.Title>베스트 게시글</B.Title>
      <B.BestPostsTie>
        {props.best?.fetchBoardsOfTheBest.map((i) => (
          <B.BestPosts key={i._id}>
            <B.BestPostBody>
              <B.BestPostImg
                src={`https://storage.googleapis.com/${i.images[0]}`}
                onError={props.onErrorImg}
                id={i._id}
                onClick={props.onClickSubmit}
              />
              <B.BestPostTitle id={i._id} onClick={props.onClickSubmit}>
                {i.title}
              </B.BestPostTitle>
              <B.BestPostContent onClick={props.onClickSubmit}>
                <B.BestPostInfo>
                  <B.AvatarWriterTie id={i._id} onClick={props.onClickSubmit}>
                    <B.Avatar src="/images/avatar.png" />
                    <B.Writer id={i._id} onClick={props.onClickSubmit}>
                      {" "}
                      {i.writer}
                    </B.Writer>
                  </B.AvatarWriterTie>
                  <B.CreatedAt id={i._id} onClick={props.onClickSubmit}>
                    {getDate(i.createdAt)}
                  </B.CreatedAt>
                </B.BestPostInfo>
                <B.LikeTie>
                  <B.Like
                    src="/images/avatar.png"
                    id={i._id}
                    onClick={props.onClickSubmit}
                  ></B.Like>
                  <B.LikeNum id={i._id} onClick={props.onClickSubmit}>
                    {i.likeCount}
                  </B.LikeNum>
                </B.LikeTie>
              </B.BestPostContent>
            </B.BestPostBody>
          </B.BestPosts>
        ))}
      </B.BestPostsTie>
      <Searchbars01
        refetch={props.refetch}
        refetchBoardsCount={props.refetchBoardsCount}
        onChangeKeyword={props.onChangeKeyword}
      />
      {/* <B.SearchTime
        onChange={props.onChangeSearch2}
        placeholder="제목을 검색해주세요."
      /> */}
      <B.Table>
        <B.Tr>
          <B.Th>아이디</B.Th>
          <B.Th>작성자</B.Th>
          <B.Th>제목</B.Th>
          <B.Th>날짜</B.Th>
        </B.Tr>
        {props.data?.fetchBoards.map((el) => (
          <B.Tr key={el._id}>
            <B.Td>{String(el._id).slice(-4).toUpperCase()}</B.Td>
            <B.Td
              style={{ margin: "10px" }}
              id={el._id}
              onClick={props.onClickSubmit}
            >
              {el.writer}
            </B.Td>
            <B.Td
              style={{ margin: "10px" }}
              id={el._id}
              onClick={props.onClickSubmit}
            >
              {el.title
                .replaceAll(props.keyword, `${SECRET}${props.keyword}${SECRET}`)
                .split(SECRET)
                .map((el) => (
                  <B.TextToken key={uuidv4()} isMatched={props.keyword === el}>
                    {el}
                  </B.TextToken>
                ))}
            </B.Td>
            <B.Td
              style={{ margin: "10px" }}
              id={el._id}
              onClick={props.onClickSubmit}
            >
              {getDate(el.createdAt)}
            </B.Td>
          </B.Tr>
        ))}
      </B.Table>
      <B.Pagination>
        <Paginations01 refetch={props.refetch} count={props.count} />
      </B.Pagination>
      <B.ButtonTie>
        <B.Button onClick={props.onClickWrite}>게시물 등록하기</B.Button>
      </B.ButtonTie>
    </>
  );
}
