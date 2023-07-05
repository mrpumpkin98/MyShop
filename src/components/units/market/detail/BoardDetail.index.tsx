import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { FETCH_POINT_TRANSACTION } from "../../../../commons/hooks/queries/UseQueryFetchPointTransaction";
import { FETCH_POINT_TRANSACTION_OF_BUYING } from "../../../../commons/hooks/queries/UseQueryFetchPointTransactionOfBuying";
import { Tooltip } from "antd";
import DOMPurify from "dompurify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BoardComment from "../comment/BoardComment.container";
import BoardCommentList from "../commentlist/BoardCommentList.container";
import * as B from "./BoardDetail.styles";
import { Money, getDate } from "../../../../commons/libraries/utils";
import { FETCH_USED_ITEM } from "../../../../commons/hooks/queries/UseQueryFetchUsedItem";
import { TOGGLE_USED_ITEM_PICK } from "../../../../commons/hooks/mutations/UseMutationToggleUsedItemPick";
import { CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING } from "../../../../commons/hooks/mutations/useMutationCreatePointTransactionOfBuyingAndSelling";
import { FETCH_USER_LOGGED_IN } from "../../../../commons/hooks/queries/UseQueryFetchUserLogedIn";
import { FETCH_USED_ITEMS_OF_THE_BEST } from "../../../../commons/hooks/queries/UseQueryFetchUsedItemOfTheBest";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

declare const window: typeof globalThis & {
  kakao: any;
};

export default function BoardDetailPage() {
  ///////////////////////////////////////////////////////////////
  // router
  //////////////////////////////////////////////////////////////

  const router = useRouter();

  ///////////////////////////////////////////////////////////////
  // queries
  //////////////////////////////////////////////////////////////
  const { data, refetch } = useQuery(FETCH_USED_ITEM, {
    variables: { useditemId: router.query.useditemId },
  });
  const { data: fetchUserLoggedInData } = useQuery(FETCH_USER_LOGGED_IN);
  const [toggleUseditemPick] = useMutation(TOGGLE_USED_ITEM_PICK);
  const [createPointTransactionOfBuyingAndSelling] = useMutation(
    CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING
  );
  const { data: dataUseditemsOfTheBest, refetch: refetchUseditemsOfTheBest } =
    useQuery(FETCH_USED_ITEMS_OF_THE_BEST);

  ///////////////////////////////////////////////////////////////
  // 마켓 좋아요
  //////////////////////////////////////////////////////////////

  const [Like, setLike] = useState(false);

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
    setLike((prevLike) => !prevLike); // 하트v누르면 true 아니면 false
    console.log(data?.fetchUseditem?.useditemAddress?.lng);
  };

  ///////////////////////////////////////////////////////////////
  // 마켓 리스트 이동
  //////////////////////////////////////////////////////////////

  const onClickBoard = () => {
    router.push(`/Market`);
  };

  ///////////////////////////////////////////////////////////////
  // 마켓 수정하기 이동
  //////////////////////////////////////////////////////////////

  const onClickUpdate = () => {
    console.log(router.query.useditemId);
    router.push(`/Market/${router.query.useditemId}/edit`);
  };

  ///////////////////////////////////////////////////////////////
  // 이미지 캐러셀
  //////////////////////////////////////////////////////////////

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // 화살표 비활성화
    autoplay: true, // 자동 재생 활성화
    autoplaySpeed: 3000, // 자동 재생 속도 (5초마다 슬라이드 변경)
    customPaging: (i: number) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: i === 0 ? "#fff" : "#888",
          marginLeft: "8px",
          transition: "background-color 0.3s ease",
        }}
      />
    ), // 커스텀 도트 스타일
  };

  ///////////////////////////////////////////////////////////////
  // 카카오 MAP
  //////////////////////////////////////////////////////////////

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f3e19a9d14ef6f578a2ef9d36fa3f9c7&libraries=services";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(function () {
        const mapContainer = document.getElementById("map");
        if (mapContainer) {
          // null 체크
          const mapOption = {
            center: new kakao.maps.LatLng(
              data?.fetchUseditem?.useditemAddress?.lat,
              data?.fetchUseditem?.useditemAddress?.lng
            ),
            level: 3,
          };

          var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

          // 마커가 표시될 위치입니다
          var markerPosition = new kakao.maps.LatLng(
            data?.fetchUseditem?.useditemAddress?.lat,
            data?.fetchUseditem?.useditemAddress?.lng
          );

          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({
            position: markerPosition,
          });

          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(map);

          // 버튼 클릭에 따라 지도 이동 기능을 막거나 풀고 싶은 경우에는 map.setDraggable 함수를 사용합니다

          // 마우스 드래그로 지도 이동 가능여부를 설정합니다
          map.setDraggable(false);
          map.setZoomable(false);

          // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
          // marker.setMap(null);
        }
      });
    };
  });

  ///////////////////////////////////////////////////////////////
  // 태그 생성
  //////////////////////////////////////////////////////////////

  const Tag = data?.fetchUseditem?.tags.join().split(" ");

  ///////////////////////////////////////////////////////////////
  // 상품 구매
  //////////////////////////////////////////////////////////////

  const onClickBuyingAndSelling = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    console.log(router.query);
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
    // window.location.reload(); // 페이지 새로고침
    router.push(`/Market`);
  };

  ///////////////////////////////////////////////////////////////
  // 대체 이미지
  //////////////////////////////////////////////////////////////
  const onErrorImg = (e: any) => {
    e.target.src = "/images/icons/all-icon.png";
  };

  /////////////////////////////return/////////////////////////////////

  return (
    <div>
      <B.Wrapper>
        <B.CardWrapper>
          <B.Header>
            <B.imImageResult>
              <Slider {...settings}>
                {data?.fetchUseditem.images
                  ?.filter((el: any) => el)
                  .map((el: any) => (
                    <B.Image
                      key={el}
                      src={`https://storage.googleapis.com/${el}`}
                      onError={onErrorImg}
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
                    <B.AreaInformation>거래지역</B.AreaInformation>
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
                  <B.Button onClick={onClickBuyingAndSelling}>
                    구매하기
                  </B.Button>
                  <B.Button onClick={onClickLike} className="List">
                    ♥ 찜하기 {data?.fetchUseditem?.pickedCount}
                  </B.Button>
                  {data?.fetchUseditem?.seller?.email ===
                    fetchUserLoggedInData?.fetchUserLoggedIn?.email && (
                    <B.Button onClick={onClickUpdate}>수정하기</B.Button>
                  )}
                </B.BottomWrapper>
              </B.RemarksNamePriceTie>
            </B.WrapperRemarksNamePrice>
          </B.Header>
          <B.BestNav>
            <B.Title>추천 상품</B.Title>
            <B.BestPostsTie>
              {dataUseditemsOfTheBest?.fetchUseditemsOfTheBest.map((i: any) => (
                <B.BestPosts key={i._id}>
                  <B.BestPostBody>
                    <B.BestPostImgBox>
                      <B.BestPostImg
                        src={`https://storage.googleapis.com/${i.images[0]}`}
                        onError={onErrorImg}
                        id={i._id}
                      />
                    </B.BestPostImgBox>
                    <B.BestPostTitle id={i._id}>{i.name}</B.BestPostTitle>
                    <B.Prices id={i._id}> {Money(i.price)}</B.Prices>
                  </B.BestPostBody>
                </B.BestPosts>
              ))}
            </B.BestPostsTie>
          </B.BestNav>
          <B.Body>
            <B.WidthWrapper>
              <B.WrapperContents>
                <B.BodyTitle>상품정보</B.BodyTitle>
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
              </B.WrapperContents>
              <B.CommentWrapper>
                <B.BodyTitle>상점정보</B.BodyTitle>
                <B.AvatarWrapper>
                  <B.AvatarInfoWrapper>
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
                    <B.Info>
                      <B.Seller>
                        <B.SellerText>판매자</B.SellerText>{" "}
                        {data?.fetchUseditem?.seller?.name}
                      </B.Seller>
                      <B.Seller>
                        <B.SellerText>이메일 </B.SellerText>{" "}
                        {data?.fetchUseditem?.seller?.email}
                      </B.Seller>
                    </B.Info>
                  </B.AvatarInfoWrapper>
                </B.AvatarWrapper>
                <B.BodyTitle>상점후기</B.BodyTitle>
                <BoardComment />
                <BoardCommentList />
              </B.CommentWrapper>
            </B.WidthWrapper>
          </B.Body>
        </B.CardWrapper>
      </B.Wrapper>
    </div>
  );
}
