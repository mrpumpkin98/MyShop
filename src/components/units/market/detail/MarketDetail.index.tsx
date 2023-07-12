import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { FETCH_POINT_TRANSACTION } from "../../../../commons/hooks/queries/UseQueryFetchPointTransaction";
import { FETCH_POINT_TRANSACTION_OF_BUYING } from "../../../../commons/hooks/queries/UseQueryFetchPointTransactionOfBuying";
import DOMPurify from "dompurify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Comment from "../comment/Comment.container";
import CommentList from "../commentlist/CommentList.container";
import * as B from "./MarketDetail.styles";
import { Money } from "../../../../commons/libraries/utils";
import {
  FETCH_USED_ITEM,
  useQueryFetchUsedItem,
} from "../../../../commons/hooks/queries/UseQueryFetchUsedItem";
import { TOGGLE_USED_ITEM_PICK } from "../../../../commons/hooks/mutations/UseMutationToggleUsedItemPick";
import { CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING } from "../../../../commons/hooks/mutations/useMutationCreatePointTransactionOfBuyingAndSelling";
import { FETCH_USER_LOGGED_IN } from "../../../../commons/hooks/queries/UseQueryFetchUserLogedIn";
import { FETCH_USED_ITEMS_OF_THE_BEST } from "../../../../commons/hooks/queries/UseQueryFetchUsedItemOfTheBest";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { settings } from "../../../../commons/hooks/customs/useCarousel";
import { useErrorImg } from "../../../../commons/hooks/customs/useErroImg";
import { useEffectKakaoMapFetch } from "../../../../commons/hooks/customs/useEffectKakaoMapFetch";
import { useOnClickBasket } from "../../../../commons/hooks/event/useOnClickBasket";

declare const window: typeof globalThis & {
  kakao: any;
};

export default function DetailPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [basketItems, setBasketItems] = useState([]);
  const [Like, setLike] = useState(false);
  const { data } = useQueryFetchUsedItem();
  const { data: fetchUserLoggedInData } = useQuery(FETCH_USER_LOGGED_IN);
  const [toggleUseditemPick] = useMutation(TOGGLE_USED_ITEM_PICK);
  const [createPointTransactionOfBuyingAndSelling] = useMutation(
    CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING
  );
  const { data: dataUseditemsOfTheBest, refetch: refetchUseditemsOfTheBest } =
    useQuery(FETCH_USED_ITEMS_OF_THE_BEST);
  const tags = data?.fetchUseditem?.tags;
  const Tag = tags ? tags.join().split(" ") : [];

  // < 찜하기 기능 >

  const onClickLike = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const result = await toggleUseditemPick({
      variables: { useditemId: router.query.useditemId },
      refetchQueries: [
        {
          query: FETCH_USED_ITEM,
          variables: { useditemId: router.query.useditemId },
        },
      ],
    });
  };

  // < 마켓 수정하기 >

  const onClickUpdate = () => {
    router.push(`/Market/${router.query.useditemId}/edit`);
  };

  // < 카카오 맵 >
  useEffectKakaoMapFetch(data);

  // < 상품 구매 >

  const onClickBuyingAndSelling = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const result = await createPointTransactionOfBuyingAndSelling({
      variables: {
        useritemId: router.query.useditemId,
      },
      refetchQueries: [
        {
          query: FETCH_USER_LOGGED_IN,
          variables: { useritemId: router.query.useditemId },
        },
        {
          query: FETCH_POINT_TRANSACTION,
          variables: { useritemId: router.query.useditemId },
        },
        {
          query: FETCH_POINT_TRANSACTION_OF_BUYING,
          variables: { useritemId: router.query.useditemId },
        },
      ],
    });
    alert(`${data?.fetchUseditem?.seller?.name}님의 상품을 구매했습니다.`);
    router.push(`/Market`);
  };

  // < 장바구니 >
  const { onClickBasket } = useOnClickBasket();

  return (
    <>
      <B.Wrapper>
        <B.Main>
          <B.Header>
            <B.imImageResult>
              <Slider {...settings}>
                {data?.fetchUseditem.images
                  ?.filter((el: any) => el)
                  .map((el: any) => (
                    <B.Image
                      key={el}
                      src={`https://storage.googleapis.com/${el}`}
                      onError={useErrorImg}
                    />
                  ))}
              </Slider>
            </B.imImageResult>
            <B.WrapperRemarksNamePrice>
              <B.RemarksNamePriceTie>
                <B.Name>{data?.fetchUseditem?.name}</B.Name>
                <B.Remarks>{data?.fetchUseditem?.remarks}</B.Remarks>
                <B.Tags>
                  {Tag?.map((el: any, index: any) => (
                    <B.Tag>#{Tag[index]}</B.Tag>
                  ))}
                </B.Tags>
                <B.Price>{Money(data?.fetchUseditem?.price)}</B.Price>
                <B.AreaWrapper>
                  <B.AreaTie>
                    <B.AreaInformation>거래지역 |</B.AreaInformation>
                    <B.Area>
                      {data?.fetchUseditem?.useditemAddress?.address}
                    </B.Area>
                  </B.AreaTie>
                  <B.Map>
                    <div
                      id="map"
                      style={{ width: "100%", height: "180px" }}
                    ></div>
                  </B.Map>
                </B.AreaWrapper>
                <B.BottomWrapper>
                  <B.Button onClick={onClickBuyingAndSelling} className="Buy">
                    구매하기
                  </B.Button>
                  <B.Button onClick={onClickLike} className="List">
                    ♥ 찜하기 {data?.fetchUseditem?.pickedCount}
                  </B.Button>
                  {data?.fetchUseditem?.seller?.email ===
                  fetchUserLoggedInData?.fetchUserLoggedIn?.email ? (
                    <B.Button onClick={onClickUpdate}>수정하기</B.Button>
                  ) : (
                    <B.Button onClick={onClickBasket(data?.fetchUseditem)}>
                      장바구니
                    </B.Button>
                  )}
                </B.BottomWrapper>
              </B.RemarksNamePriceTie>
            </B.WrapperRemarksNamePrice>
          </B.Header>
          <B.BestArticle>
            <B.Title>추천 상품</B.Title>
            <B.BestPostsTie>
              {dataUseditemsOfTheBest?.fetchUseditemsOfTheBest.map((i: any) => (
                <B.BestPosts key={i._id}>
                  <B.BestPostBody>
                    <B.BestPostImgBox>
                      <B.BestPostImg
                        src={`https://storage.googleapis.com/${i.images[0]}`}
                        onError={useErrorImg}
                        id={i._id}
                      />
                    </B.BestPostImgBox>
                    <B.BestPostTitle id={i._id}>{i.name}</B.BestPostTitle>
                    <B.Prices id={i._id}> {Money(i.price)}</B.Prices>
                  </B.BestPostBody>
                </B.BestPosts>
              ))}
            </B.BestPostsTie>
          </B.BestArticle>
          <B.DetailArticle>
            <B.DetailWrapper>
              <B.ContentsBox>
                <B.Titles>상품정보</B.Titles>
                <B.Contents
                  dangerouslySetInnerHTML={
                    data?.fetchUseditem?.contents
                      ? {
                          __html: DOMPurify.sanitize(
                            data.fetchUseditem.contents
                          ),
                        }
                      : undefined
                  }
                />
              </B.ContentsBox>
              <B.EvaluationWrapper>
                <B.Titles>상점정보</B.Titles>
                <B.UserWrapper>
                  <B.UserBox>
                    <Space>
                      <Avatar
                        size={50}
                        style={{
                          cursor: "pointer",
                        }}
                        icon={<UserOutlined />}
                        src={`https://storage.googleapis.com/${data?.fetchUseditem?.seller?.picture}`}
                      />
                    </Space>
                    <B.SellerBox>
                      <B.Seller>
                        <B.SellerText>판매자</B.SellerText>{" "}
                        {data?.fetchUseditem?.seller?.name}
                      </B.Seller>
                      <B.Seller>
                        <B.SellerText>이메일 </B.SellerText>{" "}
                        {data?.fetchUseditem?.seller?.email}
                      </B.Seller>
                    </B.SellerBox>
                  </B.UserBox>
                </B.UserWrapper>
                <B.Titles>상점후기</B.Titles>
                <Comment />
                <CommentList />
              </B.EvaluationWrapper>
            </B.DetailWrapper>
          </B.DetailArticle>
        </B.Main>
      </B.Wrapper>
    </>
  );
}
