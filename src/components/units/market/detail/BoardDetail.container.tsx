import { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  FETCH_BOARD,
  DELETE_BOARD,
  LIKE_BOARD,
  DIS_LIKE_BOARD,
  FETCH_USED_ITEM,
  TOGGLE_USED_ITEM_PICK,
  CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING,
  FETCH_USER_LOGGED_IN,
} from "./BoardDetail.queries";
import BoardDetailUI from "./BoardDetail.presenter";

export default function BoardDetailPage() {
  ///////////////////////////////////////////////////////////////
  // router
  //////////////////////////////////////////////////////////////

  const router = useRouter();

  ///////////////////////////////////////////////////////////////
  // queries
  //////////////////////////////////////////////////////////////

  const [deleteBoard] = useMutation(DELETE_BOARD);
  const [likeBoard] = useMutation(LIKE_BOARD);
  const [dislikeBoard] = useMutation(DIS_LIKE_BOARD);
  const { data, refetch } = useQuery(FETCH_USED_ITEM, {
    variables: { useditemId: router.query.useditemId },
  });
  const [toggleUseditemPick] = useMutation(TOGGLE_USED_ITEM_PICK);
  const [createPointTransactionOfBuyingAndSelling] = useMutation(
    CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING
  );

  ///////////////////////////////////////////////////////////////
  // 게시물 삭제
  //////////////////////////////////////////////////////////////

  const onClickDelete = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const result = await deleteBoard({
      variables: { boardId: router.query.boardId },
    });
    router.push(`/Board`);
  };

  ///////////////////////////////////////////////////////////////
  // 마켓 좋아요
  //////////////////////////////////////////////////////////////

  const [Like, setLike] = useState(false);

  const onClickLike = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.id);
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
  // 게시판 리스트 이동
  //////////////////////////////////////////////////////////////

  const onClickBoard = () => {
    router.push(`/Market`);
  };

  ///////////////////////////////////////////////////////////////
  // 게시물 수정하기 이동
  //////////////////////////////////////////////////////////////

  const onClickUpdate = () => {
    console.log(router.query.useditemId);
    router.push(`/Market/${router.query.useditemId}/edit`);
  };

  ///////////////////////////////////////////////////////////////
  // 페이지 새로고침
  //////////////////////////////////////////////////////////////

  // useEffect(() => {
  //   refetch({ page: 1 });
  // }, [onClickBuyingAndSelling]); // onClickBuyingAndSelling 이벤트 발생시 refetch 실행

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
        if (data?.fetchUseditem?.useditemAddress?.lat) {
          var mapContainer = document.getElementById("map"), // 지도를 표시할 div
            mapOption = {
              center: new kakao.maps.LatLng(
                data?.fetchUseditem?.useditemAddress?.lat,
                data?.fetchUseditem?.useditemAddress?.lng
              ), // 지도의 중심좌표
              level: 3, // 지도의 확대 레벨
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
    event: React.ChangeEvent<HTMLInputElement>
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
      ],
    });
    alert(`${data?.fetchUseditem?.seller?.name}님의 상품을 구매했습니다.`);
    // window.location.reload(); // 페이지 새로고침
    router.push(`/Market`);
  };

  /////////////////////////////return/////////////////////////////////

  return (
    <div>
      <BoardDetailUI
        data={data}
        onClickUpdate={onClickUpdate}
        onClickDelete={onClickDelete}
        onClickLike={onClickLike}
        onClickBoard={onClickBoard}
        settings={settings}
        Like={Like}
        mapId="map"
        Tag={Tag}
        onClickBuyingAndSelling={onClickBuyingAndSelling}
      />
    </div>
  );
}
