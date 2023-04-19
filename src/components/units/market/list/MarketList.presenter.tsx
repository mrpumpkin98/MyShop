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

const SECRET = "@#$%";

export default function MarketListUI(props) {
  return (
    <B.ListMain>
      {props.isOpen && (
        <B.AddressModal visible={true} onOk={props.Ok} onCancel={props.Cancel}>
          <B.ShoppingBasket>
            <B.BasketTitle>장바구니</B.BasketTitle>
            <B.BasketList>
              <B.BasketTable>
                {props.basketItems.map((j) => (
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
          {props.best?.fetchUseditemsOfTheBest.map((i) => (
            <B.BestPosts key={i._id}>
              <B.BestPostBody>
                <B.BestPostImg
                  src={`https://storage.googleapis.com/${i.images[0]}`}
                  onError={props.onErrorImg}
                  id={i._id}
                  onClick={props.onClickSubmit}
                />
                <B.BestPostTitle id={i._id} onClick={props.onClickSubmit}>
                  {i.name}
                </B.BestPostTitle>
                <B.BestPostContent onClick={props.onClickSubmit}>
                  <B.BestPostInfo>
                    <B.CreatedAt id={i._id} onClick={props.onClickSubmit}>
                      {i.remarks}
                    </B.CreatedAt>
                    <B.AvatarWriterTie id={i._id} onClick={props.onClickSubmit}>
                      <B.Writer id={i._id} onClick={props.onClickSubmit}>
                        {" "}
                        {Money(i.price)}
                      </B.Writer>
                    </B.AvatarWriterTie>
                  </B.BestPostInfo>
                  <B.LikeTie>
                    <B.Like
                      src="/images/avatar.png"
                      id={i._id}
                      onClick={props.onClickSubmit}
                    ></B.Like>
                    <B.LikeNum id={i._id} onClick={props.onClickSubmit}>
                      {i.pickedCount}
                    </B.LikeNum>
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
                {props.data?.fetchUseditems.map((el) => (
                  <B.Tr key={el._id}>
                    <B.ListImg
                      src={`https://storage.googleapis.com/${el.images[0]}`}
                      onError={props.onErrorImg}
                    />
                    <B.TieTable>
                      <B.ListName id={el._id} onClick={props.onClickSubmit}>
                        {el.name}{" "}
                      </B.ListName>
                      <B.ListContents id={el._id} onClick={props.onClickSubmit}>
                        {el.remarks}
                      </B.ListContents>
                      <B.ListTags id={el._id}>{el.tags}</B.ListTags>
                      <B.TitleListSellerListPickedCount>
                        <B.ListSeller id={el._id}>{el.seller}</B.ListSeller>
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
      {/* <B.ShoppingBasket>
        <B.BasketTitle>오늘 본 상품</B.BasketTitle>
        <B.BasketList>
          <B.BasketTable>
            {props.basketItems.map((j) => (
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
      </B.ShoppingBasket> */}
    </B.ListMain>
  );
}
