import { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import _ from "lodash";
import LayoutHeader from "../../../commons/layout/header/LayoutHeader.index";
import * as B from "./List.styles";
import { Money, getDate } from "../../../../commons/libraries/utils";
import { FETCH_BOARDS } from "../../../../commons/hooks/queries/UseQueryFetchBoards";
import { FETCH_USED_ITEMS_I_SOLD } from "../../../../commons/hooks/queries/UseQueryFetchUsedItemsISold";
import { FETCH_USED_ITEMS_I_PICKED } from "../../../../commons/hooks/queries/UseQueryFetchUsedItemsIPicked";
import { DELETE_BOARD } from "../../../../commons/hooks/mutations/useMutationDeleteBoard";
import { FETCH_BOARDS_COUNT } from "../../../../commons/hooks/queries/UseQueryFetchBoardsCount";
import { FETCH_BOARDS_OF_THE_BEST } from "../../../../commons/hooks/queries/UseQueryFetchBoardsOfTheBest";

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
  const { data: dataISold, refetch: refetchISold } = useQuery(
    FETCH_USED_ITEMS_I_SOLD
  );
  const { data: dataIPicked, refetch: refetchIPicked } = useQuery(
    FETCH_USED_ITEMS_I_PICKED
  );
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const { data: dataBoardsCount, refetch: refetchBoardsCount } =
    useQuery(FETCH_BOARDS_COUNT);
  const { data: dataBoardsOfTheBest, refetch: refetchBoardsOfTheBest } =
    useQuery(FETCH_BOARDS_OF_THE_BEST);

  ///////////////////////////////////////////////////////////////
  //  게시물 삭제
  //////////////////////////////////////////////////////////////

  const onClickDelete = (event: React.MouseEvent<HTMLTableDataCellElement>) => {
    deleteBoard({
      variables: { boardId: event.currentTarget.id },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
  };

  ///////////////////////////////////////////////////////////////
  //  게시물 이동
  //////////////////////////////////////////////////////////////

  const onClickSubmit = (event: React.MouseEvent<HTMLTableDataCellElement>) => {
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
    void refetchISold({ search: value, page: 1 });
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
    refetchISold({ page: 1 });
    refetchIPicked({ page: 1 });
  }, []);

  ///////////////////////////////////////////////////////////////
  // 대체 이미지
  //////////////////////////////////////////////////////////////
  const onErrorImg = (e: any) => {
    e.target.src = "/images/none.png";
  };

  ///////////////////////////////////////////////////////////////
  //  게시물 등록 이동
  //////////////////////////////////////////////////////////////
  const [select, setSelect] = useState("MyProduct");
  const onClickSelected = () => {
    setSelect("Selected");
  };
  const onClickProduct = () => {
    setSelect("MyProduct");
    console.log(dataIPicked);
  };

  return (
    <B.Wapper>
      <B.WapperNavi>
        <B.MyProduct onClick={onClickProduct}>나의상품</B.MyProduct>
        {/* <B.Selected onClick={onClickSelected}>마이찜</B.Selected> */}
      </B.WapperNavi>
      {select === "MyProduct" ? (
        <>
          <B.Table>
            <B.Tr>
              <B.Th>번호</B.Th>
              <B.Th>상품명</B.Th>
              <B.Th>판매가격</B.Th>
              <B.Th>날짜</B.Th>
            </B.Tr>
            {dataISold?.fetchUseditemsISold.map((el: any, index: any) => (
              <B.Tr key={el._id}>
                <B.Td>{index + 1}</B.Td>
                <B.Td
                  style={{ margin: "10px" }}
                  id={el._id}
                  onClick={onClickSubmit}
                >
                  {el.name}
                </B.Td>
                <B.Td
                  style={{ margin: "10px" }}
                  id={el._id}
                  onClick={onClickSubmit}
                >
                  {Money(el.price)}
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
            {dataIPicked?.fetchUseditemsIPicked.map((el: any, index: any) => (
              <B.Tr key={el._id}>
                <B.Td>{index + 1}</B.Td>
                <B.Td
                  style={{ margin: "10px" }}
                  id={el._id}
                  onClick={onClickSubmit}
                >
                  {el.name}
                </B.Td>
                <B.Td
                  style={{ margin: "10px" }}
                  id={el._id}
                  onClick={onClickSubmit}
                >
                  {Money(el.price)}
                </B.Td>
                <B.Td
                  style={{ margin: "10px" }}
                  id={el._id}
                  onClick={onClickSubmit}
                >
                  {el.seller.name}
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
        </>
      )}
    </B.Wapper>
  );
}
