import {
  Table,
  Tr,
  Th,
  Td,
  ButtonTie,
  DeleteButton,
  Button,
  Pagination,
} from "./BoardList.styles";
import {} from "../../../../commons/libraries/utils";
import { IBoardListUIProps } from "./BoardList.types";
import Paginations01 from "../../../../commons/paginations/01/Paginations01.container";

export default function BoardListUI(props) {
  return (
    <div>
      <Table>
        <Tr>
          <Th>체크박스</Th>
          <Th>아이디</Th>
          <Th>제목</Th>
          <Th>작성자</Th>
          <Th>삭제</Th>
        </Tr>
        {props.data?.fetchBoards.map((el) => (
          <Tr key={el._id}>
            <Td>
              <input type="checkbox" />
            </Td>
            <Td
              style={{ margin: "10px" }}
              id={el._id}
              onClick={props.onClickSubmit}
            >
              {String(el._id).slice(-4).toUpperCase()}
            </Td>
            <Td
              style={{ margin: "10px" }}
              id={el._id}
              onClick={props.onClickSubmit}
            >
              {el.title}
            </Td>
            <Td
              style={{ margin: "10px" }}
              id={el._id}
              onClick={props.onClickSubmit}
            >
              {el.writer}
            </Td>
            <Td>
              <DeleteButton id={el._id} onClick={props.onClickDelete}>
                삭제
              </DeleteButton>
            </Td>
          </Tr>
        ))}
      </Table>
      <Pagination>
        <Paginations01 refetch={props.refetch} count={props.count} />
      </Pagination>
      <ButtonTie>
        <Button onClick={props.onClickWrite}>게시물 등록하기</Button>
      </ButtonTie>
    </div>
  );
}
