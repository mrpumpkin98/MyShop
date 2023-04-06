import * as B from "./BoardList.styles";
import { getDate } from "../../../../commons/libraries/utils";
import {} from "../../../../commons/libraries/utils";
import { IBoardListUIProps } from "./BoardList.types";
import Paginations01 from "../../../../commons/paginations/01/Paginations01.container";

export default function BoardListUI(props) {
  return (
    <div>
      <B.BestPostsTie>
        {props.best?.fetchBoardsOfTheBest.map((i) => (
          <B.BestPosts key={i._id}>
            <B.BestPostBody>
              <B.BestPostImg
                src="/images/1.jpeg"
                id={i._id}
                onClick={props.onClickSubmit}
              />
              <B.BestPostTitle id={i._id} onClick={props.onClickSubmit}>
                {i.title}
              </B.BestPostTitle>
              <B.BestPostContent>
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
      <B.Table>
        <B.Tr>
          <B.Th>체크박스</B.Th>
          <B.Th>아이디</B.Th>
          <B.Th>제목</B.Th>
          <B.Th>작성자</B.Th>
        </B.Tr>
        {props.data?.fetchBoards.map((el) => (
          <B.Tr key={el._id}>
            <B.Td>
              <input type="checkbox" />
            </B.Td>
            <B.Td
              style={{ margin: "10px" }}
              id={el._id}
              onClick={props.onClickSubmit}
            >
              {String(el._id).slice(-4).toUpperCase()}
            </B.Td>
            <B.Td
              style={{ margin: "10px" }}
              id={el._id}
              onClick={props.onClickSubmit}
            >
              {el.title}
            </B.Td>
            <B.Td
              style={{ margin: "10px" }}
              id={el._id}
              onClick={props.onClickSubmit}
            >
              {el.writer}
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
    </div>
  );
}
