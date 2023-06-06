import { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import _ from "lodash";
import * as B from "./BoardList.styles";
import { Money, getDate } from "../../../../commons/libraries/utils";
import { FETCH_BOARDS } from "../../../../commons/hooks/queries/UseQueryFetchBoards";
import { FETCH_USED_ITEMS_I_SOLD } from "../../../../commons/hooks/queries/UseQueryFetchUsedItemsISold";
import { FETCH_USED_ITEMS_I_PICKED } from "../../../../commons/hooks/queries/UseQueryFetchUsedItemsIPicked";
import { DELETE_BOARD } from "../../../../commons/hooks/mutations/useMutationDeleteBoard";
import { FETCH_BOARDS_COUNT } from "../../../../commons/hooks/queries/UseQueryFetchBoardsCount";
import { FETCH_BOARDS_OF_THE_BEST } from "../../../../commons/hooks/queries/UseQueryFetchBoardsOfTheBest";
import { FETCH_POINT_TRANSACTION_OF_LOADING } from "../../../../commons/hooks/queries/UseQueryFetchPointTransactionOfLoading";
import { FETCH_POINT_TRANSACTION_OF_SELLING } from "../../../../commons/hooks/queries/UseQueryFetchPointTransactionOfSelling";
import { FETCH_POINT_TRANSACTION_OF_BUYING } from "../../../../commons/hooks/queries/UseQueryFetchPointTransactionOfBuying";
import { FETCH_POINT_TRANSACTION } from "../../../../commons/hooks/queries/UseQueryFetchPointTransaction";

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
  const { data: pointData } = useQuery(FETCH_POINT_TRANSACTION_OF_LOADING);
  const { data: pointDataSelling } = useQuery(
    FETCH_POINT_TRANSACTION_OF_SELLING
  );
  const { data: pointDataBuying } = useQuery(FETCH_POINT_TRANSACTION_OF_BUYING);
  const { data: pointDataTransactions } = useQuery(FETCH_POINT_TRANSACTION);

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
  const [select, setSelect] = useState("EntireHistory");
  const onClickEntireHistory = () => {
    setSelect("EntireHistory");
    console.log(pointDataTransactions);
  };
  const onClickRechargeHistory = () => {
    setSelect("RechargeHistory");
    console.log(pointData);
  };
  const onClickPurchaseHistory = () => {
    setSelect("PurchaseHistory");
    console.log(pointDataBuying);
  };

  const onClickSalesDetails = () => {
    setSelect("SalesDetails");
    console.log(pointDataTransactions);
  };

  return (
    <B.Wapper>
      <B.WapperNavi>
        <B.MyProduct onClick={onClickEntireHistory}>전체내역</B.MyProduct>
        <B.MyProduct onClick={onClickRechargeHistory}>충전내역</B.MyProduct>
        <B.MyProduct onClick={onClickPurchaseHistory}>구매내역</B.MyProduct>
        <B.MyProduct onClick={onClickSalesDetails}>판매내역</B.MyProduct>
      </B.WapperNavi>
      {select === "EntireHistory" && (
        <>
          <B.Table>
            <B.Tr>
              <B.Th>날짜</B.Th>
              <B.Th>내용</B.Th>
              <B.Th>거래 및 충전 내역</B.Th>
              <B.Th>잔액</B.Th>
            </B.Tr>
            {pointDataTransactions?.fetchPointTransactions.map(
              (el: any, index: any) => (
                <B.Tr key={el._id}>
                  <B.Td>{getDate(el.createdAt)}</B.Td>
                  <B.Td
                    id={el._id}
                    onClick={onClickSubmit}
                    style={{
                      color: el.status === "구매" ? "#0031E0" : "#FFD600",
                    }}
                  >
                    {el.status}
                  </B.Td>
                  <B.Td
                    id={el._id}
                    onClick={onClickSubmit}
                    style={{ color: el.amount < 0 ? "#0031E0" : "#FFD600" }}
                  >
                    {Money(el.amount)}
                  </B.Td>
                  <B.Td id={el._id} onClick={onClickSubmit}>
                    {Money(el.balance)}
                  </B.Td>
                </B.Tr>
              )
            )}
          </B.Table>
        </>
      )}
      {select === "RechargeHistory" && (
        <>
          <B.Table>
            <B.Tr>
              <B.Th>충전일</B.Th>
              <B.Th>결제 ID</B.Th>
              <B.Th>충전내역</B.Th>
              <B.Th>충전 후 잔액</B.Th>
            </B.Tr>
            {pointData?.fetchPointTransactionsOfLoading.map(
              (el: any, index: any) => (
                <B.Tr key={el._id}>
                  <B.Td>{getDate(el.createdAt)}</B.Td>
                  <B.Td id={el._id} onClick={onClickSubmit}>
                    {el.impUid}
                  </B.Td>
                  <B.Td
                    id={el._id}
                    onClick={onClickSubmit}
                    style={{ color: "#FFD600" }}
                  >
                    {Money(el.amount)}
                  </B.Td>
                  <B.Td id={el._id} onClick={onClickSubmit}>
                    {Money(el.balance)}
                  </B.Td>
                </B.Tr>
              )
            )}
          </B.Table>
        </>
      )}
      {select === "PurchaseHistory" && (
        <>
          <B.Table>
            <B.Tr>
              <B.Th>거래일</B.Th>
              <B.Th>상품명</B.Th>
              <B.Th>거래내역</B.Th>
              <B.Th>거래 후 잔액</B.Th>
              {/* <B.Th>판매자</B.Th> */}
            </B.Tr>
            {pointDataBuying?.fetchPointTransactionsOfBuying.map(
              (el: any, index: any) => (
                <B.Tr key={el._id}>
                  <B.Td>{getDate(el.createdAt)}</B.Td>
                  <B.Td id={el._id} onClick={onClickSubmit}>
                    {el.useditem?.name}
                  </B.Td>
                  <B.Td
                    id={el._id}
                    onClick={onClickSubmit}
                    style={{ color: "#0031E0" }}
                  >
                    {Money(el.amount)}
                  </B.Td>
                  <B.Td id={el._id} onClick={onClickSubmit}>
                    {Money(el.balance)}
                  </B.Td>
                </B.Tr>
              )
            )}
          </B.Table>
        </>
      )}
      {select === "SalesDetails" && (
        <>
          <B.Table>
            <B.Tr>
              <B.Th>거래일</B.Th>
              <B.Th>상품명</B.Th>
              <B.Th>거래내역</B.Th>
              <B.Th>거래 후 잔액</B.Th>
            </B.Tr>
            {pointDataSelling?.fetchPointTransactionsOfSelling.map(
              (el: any, index: any) => (
                <B.Tr key={el._id}>
                  <B.Td>{getDate(el.createdAt)}</B.Td>
                  <B.Td id={el._id} onClick={onClickSubmit}>
                    {el.useditem?.name}
                  </B.Td>
                  <B.Td
                    id={el._id}
                    onClick={onClickSubmit}
                    style={{ color: "#FFD600" }}
                  >
                    {Money(el.amount)}
                  </B.Td>
                  <B.Td id={el._id} onClick={onClickSubmit}>
                    {Money(el.balance)}
                  </B.Td>
                </B.Tr>
              )
            )}
          </B.Table>
        </>
      )}
    </B.Wapper>
  );
}
