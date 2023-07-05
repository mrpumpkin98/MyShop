import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import _ from "lodash";
import { Money } from "../../../../commons/libraries/utils";
import InfiniteScroll from "react-infinite-scroller";
import { Scrollbars } from "react-custom-scrollbars-2";
import Searchbars01 from "../../../../commons/searchbars/01/Searchbars01.container";
import * as B from "./MarketList.styles";
import { FETCH_USED_ITEMS_OF_THE_BEST } from "../../../../commons/hooks/queries/UseQueryFetchUsedItemOfTheBest";
import { FETCH_USED_ITEMS } from "../../../../commons/hooks/queries/UseQueryFetchUsedItems";
import { FETCH_USER_LOGGED_IN } from "../../../../commons/hooks/queries/UseQueryFetchUserLogedIn";
import { FETCH_BOARDS_COUNT } from "../../../../commons/hooks/queries/UseQueryFetchBoardsCount";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

const SECRET = "@#$%";
interface Props {
  basketItems: any[];
  onErrorImg: (e: any) => void;
}

const ITEMS_PER_PAGE = 2;

export default function StaticRoutingPage() {
  ///////////////////////////////////////////////////////////////
  // router
  //////////////////////////////////////////////////////////////

  const router = useRouter();

  ///////////////////////////////////////////////////////////////
  // useState
  //////////////////////////////////////////////////////////////

  const [keyword, setKeyword] = useState("");
  const [basketItems, setBasketItems] = useState([]);
  const [todayItems, setTodayItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(basketItems.length / ITEMS_PER_PAGE);
  const offset = currentPage * ITEMS_PER_PAGE;

  ///////////////////////////////////////////////////////////////
  // queries
  //////////////////////////////////////////////////////////////

  const { data: dataBoardsCount, refetch: refetchBoardsCount } =
    useQuery(FETCH_BOARDS_COUNT);
  const { data: dataUseditemsOfTheBest, refetch: refetchUseditemsOfTheBest } =
    useQuery(FETCH_USED_ITEMS_OF_THE_BEST);
  const { data, refetch, fetchMore } = useQuery(FETCH_USED_ITEMS);
  const { data: loginData } = useQuery(FETCH_USER_LOGGED_IN);
  const userName = loginData?.fetchUserLoggedIn.name;

  ///////////////////////////////////////////////////////////////
  //  게시물 이동
  //////////////////////////////////////////////////////////////

  const onClickSubmit = (event: React.MouseEvent<HTMLTableDataCellElement>) => {
    router.push(`/Market/${event.currentTarget.id}`);
  };

  ///////////////////////////////////////////////////////////////
  //  게시물 등록 이동
  //////////////////////////////////////////////////////////////

  const onClickWrite = () => {
    router.push(`/Market/Write`);
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
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인 후 이용 가능합니다.");
      void router.push("/Login");
    }
    refetchUseditemsOfTheBest({ page: 1 });
    refetch({ page: 1 });
  }, []);

  ///////////////////////////////////////////////////////////////
  // 무한 스크롤
  //////////////////////////////////////////////////////////////

  const onLoadMore = (): void => {
    if (data === undefined) return;
    void fetchMore({
      variables: {
        page: Math.ceil((data?.fetchUseditems.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchUseditems === undefined) {
          return {
            fetchUseditems: [...prev.fetchUseditems],
          };
        }
        return {
          fetchUseditems: [
            ...prev.fetchUseditems,
            ...fetchMoreResult.fetchUseditems,
          ],
        };
      },
    });
  };

  ///////////////////////////////////////////////////////////////
  // 대체 이미지
  //////////////////////////////////////////////////////////////
  const onErrorImg = (e: any) => {
    e.target.src = "/images/icons/all-icon.png";
  };

  ///////////////////////////////////////////////////////////////
  // 장바구니
  //////////////////////////////////////////////////////////////
  const onClickBasket = (basket: any) => () => {
    // 1. 기존 장바구니 가져오기
    const baskets = JSON.parse(localStorage.getItem("baskets") ?? "[]");

    const temp = baskets.filter((el: any) => el._id === basket._id);
    if (temp.length >= 1) {
      alert("이미 담으신 상품입니다!!!");
      return;
    } else {
      alert("장바구니에 상품이 담겼습니다.");
    }

    // 2. 내가 클릭한거 장바구니에 추가하기
    baskets.push(basket);
    localStorage.setItem("baskets", JSON.stringify(baskets));
  };

  const onClickBasketModal = (): void => {
    setIsOpen((prev) => !prev);
  };

  //주소 모달 확인 / 취소 입력

  const Ok = (): void => {
    setIsOpen(false);
  };

  const Cancel = (): void => {
    setIsOpen(false);
  };

  useEffect(() => {
    const baskets = JSON.parse(localStorage.getItem("baskets") || "[]");
    setBasketItems(baskets);
  }, [isOpen]);

  ///////////////////////////////////////////////////////////////
  // 오늘 본 상품
  //////////////////////////////////////////////////////////////
  const onClickToday =
    (today: any) => (event: React.MouseEvent<HTMLTableDataCellElement>) => {
      // 1. 기존 장바구니 가져오기
      const todays = JSON.parse(localStorage.getItem("todays") ?? "[]");

      const temp = todays.filter((el: any) => el._id === today._id);
      if (todays.length > 3) {
        todays.pop();
      }

      // 2. 내가 클릭한거 장바구니에 추가하기
      const existingIndex = todays.findIndex((el: any) => el._id === today._id);
      if (existingIndex !== -1) {
        todays.splice(existingIndex, 1);
      }
      todays.unshift(today);

      localStorage.setItem("todays", JSON.stringify(todays));

      router.push(`/Market/${today._id}`);
    };

  useEffect(() => {
    const todays = JSON.parse(localStorage.getItem("todays") || "[]");
    setTodayItems(todays);
  }, []);

  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected);
  };

  /////////////////////////////return/////////////////////////////////

  return (
    <B.ListMain>
      {isOpen && (
        <B.AddressModal visible={true} onOk={Ok} onCancel={Cancel}>
          <B.ShoppingBasket>
            <B.BasketTitle>장바구니</B.BasketTitle>
            <B.BasketList>
              <B.BasketTable>
                {basketItems.map((j: any) => (
                  <B.BasketTr key={j._id}>
                    <B.BasketListImg
                      src={`https://storage.googleapis.com/${j.images[0]}`}
                      onError={onErrorImg}
                    />
                    <B.BasketTieTable>
                      <B.BasketListName id={j._id}>{j.name}</B.BasketListName>
                      <B.BasketListContents id={j._id}>
                        {j.remarks}
                      </B.BasketListContents>
                      <B.BasketListPrice id={j._id}>
                        {Money(j.price)}
                      </B.BasketListPrice>
                      <B.BasketListTags id={j._id}>{j.tags}</B.BasketListTags>
                    </B.BasketTieTable>
                  </B.BasketTr>
                ))}
              </B.BasketTable>
            </B.BasketList>
          </B.ShoppingBasket>
        </B.AddressModal>
      )}
      <B.Wrapper>
        <B.BestWrapper>
          <B.BestContent>
            <B.BestTitle>
              {dataUseditemsOfTheBest?.fetchUseditemsOfTheBest[1]?.name}
            </B.BestTitle>
            <B.BestLabel>
              {dataUseditemsOfTheBest?.fetchUseditemsOfTheBest[1]?.remarks}
            </B.BestLabel>
            <B.BestLabel>
              단돈{" "}
              {Money(dataUseditemsOfTheBest?.fetchUseditemsOfTheBest[1]?.price)}
            </B.BestLabel>
          </B.BestContent>
          <B.BestImg
            src={`https://storage.googleapis.com/${dataUseditemsOfTheBest?.fetchUseditemsOfTheBest[1]?.images[0]}`}
          ></B.BestImg>
        </B.BestWrapper>
        {/* <B.Title>베스트 상품</B.Title> */}
        <B.WidthWrapper>
          {" "}
          {/* <B.Shopping2
            onClick={onClickBasketModal}
            Active={basketItems.length > 0}
          /> */}
          <B.ButtonTie>
            <Searchbars01
              refetch={refetch}
              refetchBoardsCount={refetchBoardsCount}
              onChangeKeyword={onChangeKeyword}
            />
            <B.Button onClick={onClickWrite}>상품 등록하기</B.Button>
            <B.Button onClick={onClickBasketModal}>장바구니</B.Button>
          </B.ButtonTie>
        </B.WidthWrapper>
        <B.List>
          <Scrollbars thumbSize={80} autoHide>
            <InfiniteScroll
              pageStart={0}
              loadMore={onLoadMore}
              hasMore={true}
              useWindow={false}
            >
              <B.Table>
                {data?.fetchUseditems.map((el: any) => (
                  <B.Tr key={el._id} onClick={onClickToday(el)}>
                    <B.ListImg
                      src={`https://storage.googleapis.com/${el.images[0]}`}
                      onError={onErrorImg}
                    />
                    <B.TieTable>
                      <B.ListName id={el._id}>{el.name} </B.ListName>
                      <B.ListContents id={el._id} onClick={onClickSubmit}>
                        {el.remarks}
                      </B.ListContents>
                      <B.ListTags id={el._id}>{el.tags}</B.ListTags>
                      <B.TitleListSellerListPickedCount>
                        <Space>
                          <Avatar
                            size={27}
                            style={{
                              cursor: "pointer",
                              margin: "0px 10px 0px 5px",
                            }}
                            icon={<UserOutlined />}
                            src={`https://storage.googleapis.com/${el?.seller?.picture}`}
                          />
                        </Space>
                        <B.ListSeller id={el._id}>
                          {el.seller.name}
                        </B.ListSeller>
                        <B.Heart />
                        <B.ListPickedCount id={el._id}>
                          {el.pickedCount ? el.pickedCount : 0}
                        </B.ListPickedCount>
                        <B.Shopping onClick={onClickBasket(el)} />
                      </B.TitleListSellerListPickedCount>
                    </B.TieTable>
                    <B.ListPrice id={el._id}>{Money(el.price)}</B.ListPrice>
                  </B.Tr>
                ))}
              </B.Table>
            </InfiniteScroll>
          </Scrollbars>
        </B.List>
      </B.Wrapper>
      <B.TodayList>
        <B.TodayTitle>오늘 본 상품</B.TodayTitle>
        <B.TodayTable>
          {todayItems.slice(offset, offset + ITEMS_PER_PAGE).map((j: any) => (
            <B.BasketTr key={j._id}>
              <B.BasketListImg
                src={`https://storage.googleapis.com/${j.images[0]}`}
                onError={onErrorImg}
              />
              <B.BasketTieTable>
                <B.BasketListName id={j._id} onClick={onClickSubmit}>
                  {j.name}{" "}
                </B.BasketListName>
                <B.BasketListContents id={j._id} onClick={onClickSubmit}>
                  {j.remarks.length > 10
                    ? `${j.remarks.slice(0, 10)}...`
                    : j.remarks}
                </B.BasketListContents>
                <B.BasketListPrice id={j._id} onClick={onClickSubmit}>
                  {Money(j.price)}
                </B.BasketListPrice>
                <B.BasketListTags id={j._id}>{j.tags}</B.BasketListTags>
              </B.BasketTieTable>
            </B.BasketTr>
          ))}
        </B.TodayTable>
        <B.PaginationContainer>
          <B.Pagination
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
            pageRangeDisplayed={0}
            marginPagesDisplayed={0}
          />
        </B.PaginationContainer>
      </B.TodayList>
    </B.ListMain>
  );
}
