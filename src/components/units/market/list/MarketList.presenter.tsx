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
                src={
                  i.images.length !== 0
                    ? `https://storage.googleapis.com/${i.images[0]}`
                    : "/images/noimg.gif"
                }
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
      <Searchbars01
        refetch={props.refetch}
        refetchBoardsCount={props.refetchBoardsCount}
        onChangeKeyword={props.onChangeKeyword}
      />
      <B.List>
        <Scrollbars thumbSize={85}>
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
                    src={
                      el.images.length !== 0
                        ? `https://storage.googleapis.com/${el.images[0]}`
                        : "/images/noimg.gif"
                    }
                  />
                  <B.TieTable>
                    <B.ListName style={{ margin: "10px" }} id={el._id}>
                      {el.name}
                    </B.ListName>
                    <B.ListContents style={{ margin: "10px" }} id={el._id}>
                      {el.remarks}
                    </B.ListContents>
                    <B.ListTags style={{ margin: "10px" }} id={el._id}>
                      {el.tags}
                    </B.ListTags>
                    <B.TitleListSellerListPickedCount>
                      <B.ListSeller style={{ margin: "10px" }} id={el._id}>
                        {el.seller}
                      </B.ListSeller>
                      <B.ListPickedCount style={{ margin: "10px" }} id={el._id}>
                        {el.pickedCount ? el.pickedCount : 0}
                      </B.ListPickedCount>
                    </B.TitleListSellerListPickedCount>
                  </B.TieTable>
                  <B.ListPrice style={{ margin: "10px" }} id={el._id}>
                    {el.price}
                  </B.ListPrice>
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
