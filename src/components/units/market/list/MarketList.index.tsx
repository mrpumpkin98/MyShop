import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import _ from "lodash";
import { Money } from "../../../../commons/libraries/utils";
import InfiniteScroll from "react-infinite-scroller";
import { Scrollbars } from "react-custom-scrollbars-2";
import Searchbars01 from "../../../../commons/searchbars/01/Searchbars01.container";
import * as B from "./MarketList.styles";
import { useQueryFetchUseditemsOfTheBest } from "../../../../commons/hooks/queries/UseQueryFetchUsedItemOfTheBest";
import { useQueryFetchUsedItems } from "../../../../commons/hooks/queries/UseQueryFetchUsedItems";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useErrorImg } from "../../../../commons/hooks/customs/useErroImg";
import { useOnClickToday } from "../../../../commons/hooks/event/useOnClickToday";

export default function StaticRoutingPage() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const { data, onLoadMore, refetch } = useQueryFetchUsedItems();
  const { data: dataBoardsCount, refetch: refetchBoardsCount } =
    useQueryFetchUsedItems();
  const { data: dataUseditemsOfTheBest, refetch: refetchUseditemsOfTheBest } =
    useQueryFetchUseditemsOfTheBest();
  const { onClickToday } = useOnClickToday();

  const onChangeKeyword = (value: string): void => {
    setKeyword(value);
  };

  return (
    <B.Wrapper>
      <B.Box>
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
        <B.Nav>
          <B.SearchBarBox>
            <Searchbars01
              refetch={refetch}
              refetchBoardsCount={refetchBoardsCount}
              onChangeKeyword={onChangeKeyword}
            />
          </B.SearchBarBox>
        </B.Nav>
        <B.Main>
          <Scrollbars thumbSize={300} autoHide>
            <InfiniteScroll
              pageStart={0}
              loadMore={onLoadMore}
              hasMore={true}
              useWindow={false}
            >
              <B.ListWrapper>
                {data?.fetchUseditems.map((el: any) => (
                  <B.ListBox key={el._id} onClick={onClickToday(el)}>
                    <B.ListImgBox>
                      <B.ListImg
                        src={`https://storage.googleapis.com/${el.images[0]}`}
                        onError={useErrorImg}
                      />
                    </B.ListImgBox>
                    <B.ListContentsBox>
                      <B.ListName id={el._id}>{el.name} </B.ListName>
                      <B.ListRemarks id={el._id}>{el.remarks}</B.ListRemarks>
                      <B.ListTags id={el._id}>{el.tags}</B.ListTags>
                      <B.ListSellerBox>
                        <Space>
                          <Avatar
                            size={30}
                            style={{
                              cursor: "pointer",
                              margin: "0px 10px 0px 2px",
                            }}
                            icon={<UserOutlined />}
                            src={`https://storage.googleapis.com/${el?.seller?.picture}`}
                          />
                        </Space>
                        <B.ListSeller id={el._id}>
                          {el.seller.name}
                        </B.ListSeller>
                        <B.Like />
                        <B.LikePickedCount id={el._id}>
                          {el.pickedCount ? el.pickedCount : 0}
                        </B.LikePickedCount>
                      </B.ListSellerBox>
                    </B.ListContentsBox>
                    <B.ListPrice id={el._id}>{Money(el.price)}</B.ListPrice>
                  </B.ListBox>
                ))}
              </B.ListWrapper>
            </InfiniteScroll>
          </Scrollbars>
        </B.Main>
      </B.Box>
    </B.Wrapper>
  );
}
