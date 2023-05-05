import * as B from "./BoardList.styles";
import { Money, getDate } from "../../../../commons/libraries/utils";
import {} from "../../../../commons/libraries/utils";
import { IBoardListUIProps } from "./BoardList.types";
import Paginations01 from "../../../../commons/paginations/01/Paginations01.container";
import { v4 as uuidv4 } from "uuid";
import Searchbars01 from "../../../../commons/searchbars/01/Searchbars01.container";

const SECRET = "@#$%";

export default function BoardListUI(props: any) {
  return (
    <B.Wapper>
      {/* <Searchbars01
        refetch={props.refetch}
        refetchBoardsCount={props.refetchBoardsCount}
        onChangeKeyword={props.onChangeKeyword}
      /> */}
      {/* <B.SearchTime
        onChange={props.onChangeSearch2}
        placeholder="제목을 검색해주세요."
      /> */}
      <B.WapperNavi>
        <B.MyProduct onClick={props.onClickProduct}>나의상품</B.MyProduct>
        <B.Selected onClick={props.onClickSelected}>마이찜</B.Selected>
      </B.WapperNavi>
      {props.select === "MyProduct" ? (
        <>
          <B.Table>
            <B.Tr>
              <B.Th>번호</B.Th>
              <B.Th>상품명</B.Th>
              <B.Th>판매가격</B.Th>
              <B.Th>날짜</B.Th>
            </B.Tr>
            {props.dataISold?.fetchUseditemsISold.map((el: any, index: any) => (
              <B.Tr key={el._id}>
                <B.Td>{index + 1}</B.Td>
                <B.Td
                  style={{ margin: "10px" }}
                  id={el._id}
                  onClick={props.onClickSubmit}
                >
                  {el.name}
                </B.Td>
                <B.Td
                  style={{ margin: "10px" }}
                  id={el._id}
                  onClick={props.onClickSubmit}
                >
                  {Money(el.price)}
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
        </>
      ) : (
        <>
          <B.Table>
            <B.Tr>
              <B.Th>번호</B.Th>
              <B.Th>제목</B.Th>
              <B.Th>판매가격</B.Th>
              <B.Th>판매자</B.Th>
              <B.Th>날짜</B.Th>
            </B.Tr>
            {props.dataIPicked?.fetchUseditemsIPicked.map(
              (el: any, index: any) => (
                <B.Tr key={el._id}>
                  <B.Td>{index + 1}</B.Td>
                  <B.Td
                    style={{ margin: "10px" }}
                    id={el._id}
                    onClick={props.onClickSubmit}
                  >
                    {el.name}
                  </B.Td>
                  <B.Td
                    style={{ margin: "10px" }}
                    id={el._id}
                    onClick={props.onClickSubmit}
                  >
                    {Money(el.price)}
                  </B.Td>
                  <B.Td
                    style={{ margin: "10px" }}
                    id={el._id}
                    onClick={props.onClickSubmit}
                  >
                    {el.seller.name}
                  </B.Td>
                  <B.Td
                    style={{ margin: "10px" }}
                    id={el._id}
                    onClick={props.onClickSubmit}
                  >
                    {getDate(el.createdAt)}
                  </B.Td>
                </B.Tr>
              )
            )}
          </B.Table>
        </>
      )}
      {/* <B.Pagination>
        <Paginations01 refetch={props.refetch} count={props.count} />
      </B.Pagination> */}
    </B.Wapper>
  );
}
