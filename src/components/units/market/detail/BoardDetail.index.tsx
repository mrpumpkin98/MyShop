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

  ///////////////////////////////////////////////////////////////
  // 마켓 좋아요
  //////////////////////////////////////////////////////////////

  const [Like, setLike] = useState(false);

  const onClickLike = async (
    event: React.MouseEvent<HTMLTableDataCellElement>
  ) => {
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
    arrows: true,
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
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
    e.target.src = "/images/icons/all-icon-after-hover.png";
  };

  /////////////////////////////return/////////////////////////////////

  return (
    <div>
      <B.Wrapper>
        <B.CardWrapper>
          <B.Header>
            <B.AvatarWrapper>
              <B.AvatarInfoWrapper>
                <B.Avatar src="/images/avatar.png" />
                <B.Info>
                  <B.Writer>{data?.fetchUseditem?.seller?.name}</B.Writer>
                  {/* <B.Writer>{props.data?.fetchUseditem?.seller}</B.Writer> */}
                  <B.CreatedAt>
                    {getDate(data?.fetchUseditem?.createdAt)}
                  </B.CreatedAt>
                </B.Info>
              </B.AvatarInfoWrapper>
              <B.TooltipWrapper>
                <Tooltip
                  placement="top"
                  title={`${data?.fetchUseditem.useditemAddress?.address ?? ""}
              ${data?.fetchUseditem.useditemAddress?.addressDetail ?? ""}`}
                ></Tooltip>
                <B.PaperClip />
                <B.Environment />
              </B.TooltipWrapper>
            </B.AvatarWrapper>
          </B.Header>
          <B.Body>
            <B.WidthWrapper>
              <B.WrapperRemarksNamePrice>
                <B.Remarks>{data?.fetchUseditem?.remarks}</B.Remarks>
                <B.Name>{data?.fetchUseditem?.name}</B.Name>
                <B.Price>{Money(data?.fetchUseditem?.price)}</B.Price>
              </B.WrapperRemarksNamePrice>
              <B.WrapperPickedCount>
                <B.Heart onClick={onClickLike} Active={Like} />
                <B.PickedCount>
                  {data?.fetchUseditem?.pickedCount}
                </B.PickedCount>
              </B.WrapperPickedCount>
            </B.WidthWrapper>
            <B.WrapperContents>
              <B.WrapperImage>
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
              </B.WrapperImage>
              <B.Contents
                dangerouslySetInnerHTML={
                  data?.fetchUseditem?.contents
                    ? {
                        __html: DOMPurify.sanitize(data.fetchUseditem.contents),
                      }
                    : undefined
                }
              />
              <B.Tags>
                {Tag?.map((el: any, index: any) => (
                  <B.Tag>#{Tag[index]}</B.Tag>
                ))}
              </B.Tags>
              <B.Map>
                <div id="map" style={{ width: "100%", height: "360px" }}></div>
              </B.Map>
            </B.WrapperContents>
          </B.Body>
          <B.Footer></B.Footer>
        </B.CardWrapper>
        <B.BottomWrapper>
          <B.Button onClick={onClickBoard}>목록으로</B.Button>
          <B.Button onClick={onClickBuyingAndSelling}>구매하기</B.Button>
          {data?.fetchUseditem?.seller?.email ===
            fetchUserLoggedInData?.fetchUserLoggedIn?.email && (
            <B.Button onClick={onClickUpdate}>수정하기</B.Button>
          )}
        </B.BottomWrapper>
        <BoardComment />
        <BoardCommentList />
      </B.Wrapper>
    </div>
  );
}
