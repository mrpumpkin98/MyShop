import { useEffect } from "react";
declare const window: typeof globalThis & {
  kakao: any;
};
export const useEffectKakaoMapFetch = (data: any): void => {
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
            center: new window.kakao.maps.LatLng(
              data?.fetchUseditem?.useditemAddress?.lat,
              data?.fetchUseditem?.useditemAddress?.lng
            ),
            level: 3,
          };

          var map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

          // 마커가 표시될 위치입니다
          var markerPosition = new window.kakao.maps.LatLng(
            data?.fetchUseditem?.useditemAddress?.lat,
            data?.fetchUseditem?.useditemAddress?.lng
          );

          // 마커를 생성합니다
          var marker = new window.kakao.maps.Marker({
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
};
