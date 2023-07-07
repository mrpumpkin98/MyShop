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
import InfiniteScroll from "react-infinite-scroller";

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
  const {
    data: dataISold,
    refetch: refetchISold,
    fetchMore,
  } = useQuery(FETCH_USED_ITEMS_I_SOLD);
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
    e.target.src = "/images/icons/best-icon.png";
  };

  ///////////////////////////////////////////////////////////////
  //  게시물 등록 이동
  //////////////////////////////////////////////////////////////
  const [select, setSelect] = useState("MyProduct");
  const onClickSelected = () => {
    setSelect("Selected");
  };
  const onClickProduct = () => {
    // setSelect("MyProduct");
    console.log(dataISold);
  };

  ///////////////////////////////////////////////////////////////
  // 무한 스크롤
  //////////////////////////////////////////////////////////////

  const onLoadMore = (): void => {
    if (dataISold === undefined) return;
    void fetchMore({
      variables: {
        page: Math.ceil((dataISold?.fetchUseditemsISold.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchUseditemsISold === undefined) {
          return {
            fetchUseditemsISold: [...prev.fetchUseditemsISold],
          };
        }
        return {
          fetchUseditemsISold: [
            ...prev.fetchUseditemsISold,
            ...fetchMoreResult.fetchUseditemsISold,
          ],
        };
      },
    });
  };

  return (
    <B.Wapper>
      <B.Title>상품내역</B.Title>
      <B.WapperNavi>
        <B.MyProduct onClick={onClickProduct}>나의상품</B.MyProduct>
      </B.WapperNavi>
      <>
        <InfiniteScroll
          pageStart={0}
          loadMore={onLoadMore}
          hasMore={true}
          useWindow={true}
        >
          <B.Table>
            {dataISold?.fetchUseditemsISold.map((el: any) => (
              <B.Tr key={el._id}>
                <B.Imges
                  src={`https://storage.googleapis.com/${el.images[0]}`}
                  onError={onErrorImg}
                  id={el._id}
                />
                <B.Td id={el._id} onClick={onClickSubmit} className="Name">
                  {el.name.length > 17 ? `${el.name.slice(0, 17)}...` : el.name}
                </B.Td>
                <B.Td id={el._id} onClick={onClickSubmit} className="Price">
                  {Money(el.price)}
                </B.Td>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <B.Environment />
                  <B.Td id={el._id} onClick={onClickSubmit} className="Addr">
                    {el.useditemAddress?.address?.length > 10
                      ? `${el.useditemAddress?.address?.slice(0, 10)}...`
                      : el.useditemAddress?.address}
                  </B.Td>
                </div>
              </B.Tr>
            ))}
          </B.Table>
        </InfiniteScroll>
      </>
    </B.Wapper>
  );
}
