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
        <B.MyProduct onClick={props.onClickEntireHistory}>전체내역</B.MyProduct>
        <B.MyProduct onClick={props.onClickRechargeHistory}>
          충전내역
        </B.MyProduct>
        <B.MyProduct onClick={props.onClickPurchaseHistory}>
          구매내역
        </B.MyProduct>
        <B.MyProduct onClick={props.onClickSalesDetails}>판매내역</B.MyProduct>
      </B.WapperNavi>
      {props.select === "EntireHistory" && (
        <>
          <B.Table>
            <B.Tr>
              <B.Th>날짜</B.Th>
              <B.Th>내용</B.Th>
              <B.Th>거래 및 충전 내역</B.Th>
              <B.Th>잔액</B.Th>
            </B.Tr>
            {props.pointDataTransactions?.fetchPointTransactions.map(
              (el: any, index: any) => (
                <B.Tr key={el._id}>
                  <B.Td>{getDate(el.createdAt)}</B.Td>
                  <B.Td
                    id={el._id}
                    onClick={props.onClickSubmit}
                    style={{
                      color: el.status === "구매" ? "#0031E0" : "#FFD600",
                    }}
                  >
                    {el.status}
                  </B.Td>
                  <B.Td
                    id={el._id}
                    onClick={props.onClickSubmit}
                    style={{ color: el.amount < 0 ? "#0031E0" : "#FFD600" }}
                  >
                    {Money(el.amount)}
                  </B.Td>
                  <B.Td id={el._id} onClick={props.onClickSubmit}>
                    {Money(el.balance)}
                  </B.Td>
                </B.Tr>
              )
            )}
          </B.Table>
        </>
      )}
      {props.select === "RechargeHistory" && (
        <>
          <B.Table>
            <B.Tr>
              <B.Th>충전일</B.Th>
              <B.Th>결제 ID</B.Th>
              <B.Th>충전내역</B.Th>
              <B.Th>충전 후 잔액</B.Th>
            </B.Tr>
            {props.pointData?.fetchPointTransactionsOfLoading.map(
              (el: any, index: any) => (
                <B.Tr key={el._id}>
                  <B.Td>{getDate(el.createdAt)}</B.Td>
                  <B.Td id={el._id} onClick={props.onClickSubmit}>
                    {el.impUid}
                  </B.Td>
                  <B.Td
                    id={el._id}
                    onClick={props.onClickSubmit}
                    style={{ color: "#FFD600" }}
                  >
                    {Money(el.amount)}
                  </B.Td>
                  <B.Td id={el._id} onClick={props.onClickSubmit}>
                    {Money(el.balance)}
                  </B.Td>
                </B.Tr>
              )
            )}
          </B.Table>
        </>
      )}
      {props.select === "PurchaseHistory" && (
        <>
          <B.Table>
            <B.Tr>
              <B.Th>거래일</B.Th>
              <B.Th>상품명</B.Th>
              <B.Th>거래내역</B.Th>
              <B.Th>거래 후 잔액</B.Th>
              {/* <B.Th>판매자</B.Th> */}
            </B.Tr>
            {props.pointDataBuying?.fetchPointTransactionsOfBuying.map(
              (el: any, index: any) => (
                <B.Tr key={el._id}>
                  <B.Td>{getDate(el.createdAt)}</B.Td>
                  <B.Td id={el._id} onClick={props.onClickSubmit}>
                    {el.useditem.name}
                  </B.Td>
                  <B.Td
                    id={el._id}
                    onClick={props.onClickSubmit}
                    style={{ color: "#0031E0" }}
                  >
                    {Money(el.amount)}
                  </B.Td>
                  <B.Td id={el._id} onClick={props.onClickSubmit}>
                    {Money(el.balance)}
                  </B.Td>
                  {/* <B.Td
                    id={el._id}
                    onClick={props.onClickSubmit}
                  >
                    {el.useditem?.seller.name}
                  </B.Td> */}
                </B.Tr>
              )
            )}
          </B.Table>
        </>
      )}
      {props.select === "SalesDetails" && (
        <>
          <B.Table>
            <B.Tr>
              <B.Th>거래일</B.Th>
              <B.Th>상품명</B.Th>
              <B.Th>거래내역</B.Th>
              <B.Th>거래 후 잔액</B.Th>
            </B.Tr>
            {props.pointDataSelling?.fetchPointTransactionsOfSelling.map(
              (el: any, index: any) => (
                <B.Tr key={el._id}>
                  <B.Td>{getDate(el.createdAt)}</B.Td>
                  <B.Td id={el._id} onClick={props.onClickSubmit}>
                    {el.useditem?.name}
                  </B.Td>
                  <B.Td
                    id={el._id}
                    onClick={props.onClickSubmit}
                    style={{ color: "#FFD600" }}
                  >
                    {Money(el.amount)}
                  </B.Td>
                  <B.Td id={el._id} onClick={props.onClickSubmit}>
                    {Money(el.balance)}
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
