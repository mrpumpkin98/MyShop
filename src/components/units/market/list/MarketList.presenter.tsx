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

const SECRET = "@#$%";

export default function MarketListUI(props) {
  return (
    <>
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
                      {i.price}
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
        {/* <B.Shopping /> */}
      </B.WidthWrapper>
      <B.List>
        <Scrollbars thumbSize={105} autoHide>
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
                    <B.ListName id={el._id}>{el.name}</B.ListName>
                    <B.ListContents id={el._id}>{el.remarks}</B.ListContents>
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
                  <B.ListPrice id={el._id}>{el.price}원</B.ListPrice>
                </B.Tr>
              ))}
            </B.Table>
          </InfiniteScroll>
        </Scrollbars>
      </B.List>
      <B.ButtonTie>
        <B.Button onClick={props.onClickWrite}>상품 등록하기</B.Button>
      </B.ButtonTie>
    </>
  );
}
