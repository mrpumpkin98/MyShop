import * as B from "./MarketList.styles";
import { getDate } from "../../../../commons/libraries/utils";
import {} from "../../../../commons/libraries/utils";
import { IBoardListUIProps } from "./MarketList.types";
import Paginations01 from "../../../../commons/paginations/01/Paginations01.container";
import { v4 as uuidv4 } from "uuid";
import Searchbars01 from "../../../../commons/searchbars/01/Searchbars01.container";
import styled from "@emotion/styled";
import InfiniteScroll from "react-infinite-scroller";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useRecoilCallback } from "recoil";
import { onErrorImg } from "../../../../commons/stores";
import { Money } from "../../../../commons/libraries/utils";
import { Wrapper } from "../../../commons/layout/banner/LayoutBanner.styles";
import { useMoveToPage } from "../../../../commons/hooks/customs/useMoveToPage";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const SECRET = "@#$%";
interface Props {
  basketItems: any[];
  onErrorImg: (e: any) => void;
}

const ITEMS_PER_PAGE = 2;

export default function MarketListUI(props: any) {
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(props.basketItems.length / ITEMS_PER_PAGE);
  const offset = currentPage * ITEMS_PER_PAGE;

  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected);
  };

  return (
    <B.ListMain>
      {props.isOpen && (
        <B.AddressModal visible={true} onOk={props.Ok} onCancel={props.Cancel}>
          <B.ShoppingBasket>
            <B.BasketTitle>장바구니</B.BasketTitle>
            <B.BasketList>
              <B.BasketTable>
                {props.basketItems.map((j: any) => (
                  <B.BasketTr key={j._id}>
                    <B.BasketListImg
                      src={`https://storage.googleapis.com/${j.images[0]}`}
                      onError={props.onErrorImg}
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
        <B.Title>베스트 상품</B.Title>
        <B.BestPostsTie>
          {props.best?.fetchUseditemsOfTheBest.map((i: any) => (
            <B.BestPosts key={i._id} onClick={props.onClickToday(i)}>
              <B.BestPostBody>
                <B.BestPostImg
                  src={`https://storage.googleapis.com/${i.images[0]}`}
                  onError={props.onErrorImg}
                  id={i._id}
                />
                <B.BestPostTitle id={i._id}>{i.name}</B.BestPostTitle>
                <B.BestPostContent>
                  <B.BestPostInfo>
                    <B.CreatedAt id={i._id}>{i.remarks}</B.CreatedAt>
                    <B.AvatarWriterTie id={i._id}>
                      <B.Writer id={i._id}> {Money(i.price)}</B.Writer>
                    </B.AvatarWriterTie>
                  </B.BestPostInfo>
                  <B.LikeTie>
                    <B.Like src="/images/avatar.png" id={i._id}></B.Like>
                    <B.LikeNum id={i._id}>{i.pickedCount}</B.LikeNum>
                  </B.LikeTie>
                </B.BestPostContent>
              </B.BestPostBody>
            </B.BestPosts>
          ))}
        </B.BestPostsTie>
        <B.WidthWrapper>
          {" "}
          <Searchbars01
            refetch={props.refetch}
            refetchBoardsCount={props.refetchBoardsCount}
            onChangeKeyword={props.onChangeKeyword}
          />
          <B.Shopping2
            onClick={props.onClickBasketModal}
            Active={props.basketItems.length > 0}
          />
        </B.WidthWrapper>
        <B.List>
          <Scrollbars thumbSize={80} autoHide>
            <InfiniteScroll
              pageStart={0}
              loadMore={props.onLoadMore}
              hasMore={true}
              useWindow={false}
            >
              <B.Table>
                {props.data?.fetchUseditems.map((el: any) => (
                  <B.Tr key={el._id} onClick={props.onClickToday(el)}>
                    <B.ListImg
                      src={`https://storage.googleapis.com/${el.images[0]}`}
                      onError={props.onErrorImg}
                    />
                    <B.TieTable>
                      <B.ListName id={el._id}>{el.name} </B.ListName>
                      <B.ListContents id={el._id} onClick={props.onClickSubmit}>
                        {el.remarks}
                      </B.ListContents>
                      <B.ListTags id={el._id}>{el.tags}</B.ListTags>
                      <B.TitleListSellerListPickedCount>
                        <B.Smile />
                        <B.ListSeller id={el._id}>
                          {el.seller.name}
                        </B.ListSeller>
                        <B.Heart />
                        <B.ListPickedCount id={el._id}>
                          {el.pickedCount ? el.pickedCount : 0}
                        </B.ListPickedCount>
                        <B.Shopping onClick={props.onClickBasket(el)} />
                      </B.TitleListSellerListPickedCount>
                    </B.TieTable>
                    <B.ListPrice id={el._id}>{Money(el.price)}</B.ListPrice>
                  </B.Tr>
                ))}
              </B.Table>
            </InfiniteScroll>
          </Scrollbars>
        </B.List>
        <B.ButtonTie>
          <B.Button onClick={props.onClickWrite}>상품 등록하기</B.Button>
        </B.ButtonTie>
      </B.Wrapper>
      <B.TodayList>
        <B.TodayTitle>오늘 본 상품</B.TodayTitle>
        <B.TodayTable>
          {props.todayItems
            .slice(offset, offset + ITEMS_PER_PAGE)
            .map((j: any) => (
              <B.BasketTr key={j._id}>
                <B.BasketListImg
                  src={`https://storage.googleapis.com/${j.images[0]}`}
                  onError={props.onErrorImg}
                />
                <B.BasketTieTable>
                  <B.BasketListName id={j._id} onClick={props.onClickSubmit}>
                    {j.name}{" "}
                  </B.BasketListName>
                  <B.BasketListContents
                    id={j._id}
                    onClick={props.onClickSubmit}
                  >
                    {j.remarks}
                  </B.BasketListContents>
                  <B.BasketListPrice id={j._id} onClick={props.onClickSubmit}>
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
