import { useEffect } from "react";
declare const window: typeof globalThis & {
  kakao: any;
};
export const useEffectKakaoMap = (
  setAddress: any,
  setGetLat: any,
  setGetLng: any,
  input1Ref: any,
  input2Ref: any,
  gLat: any,
  gLng: any
): void => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f3e19a9d14ef6f578a2ef9d36fa3f9c7&libraries=services";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(function () {
        const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
        const options = {
          // 지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(37.579251, 126.993174), // 지도의 중심좌표.
          level: 3, // 지도의 레벨(확대, 축소 정도)
        };

        const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

        // 주소-좌표 변환 객체를 생성합니다
        const geocoder = new window.kakao.maps.services.Geocoder();

        const marker = new window.kakao.maps.Marker({
            // 지도 중심좌표에 마커를 생성합니다
            position: map.getCenter(),
          }),
          infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

        // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);

        // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
        window.kakao.maps.event.addListener(
          map,
          "click",
          function (mouseEvent: any) {
            searchDetailAddrFromCoords(
              mouseEvent.latLng,
              function (result: any, status: any) {
                if (status === window.kakao.maps.services.Status.OK) {
                  var detailAddr = !!result[0].road_address
                    ? '<div style="font-size: 12px;">도로명주소 : ' +
                      result[0].road_address.address_name +
                      "</div>"
                    : "";
                  detailAddr +=
                    '<div style="font-size: 12px;">지번 주소 : ' +
                    result[0].address.address_name +
                    "</div>";

                  var content =
                    '<div class="bAddr" style="padding:8px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">' +
                    '<span class="title" style="font-size: 12px; font-weight: bold;">법정동 주소정보</span>' +
                    detailAddr +
                    "</div>";

                  // 마커를 클릭한 위치에 표시합니다
                  marker.setPosition(mouseEvent.latLng);
                  marker.setMap(map);

                  // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                  infowindow.setContent(content);
                  infowindow.open(map, marker);
                  setAddress(result[0].address.address_name);
                }
              }
            );
          }
        );

        // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
        window.kakao.maps.event.addListener(map, "idle", function () {
          searchAddrFromCoords(map.getCenter(), displayCenterInfo);
        });

        function searchAddrFromCoords(coords: any, callback: any) {
          // 좌표로 행정동 주소 정보를 요청합니다
          geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
        }

        function searchDetailAddrFromCoords(coords: any, callback: any) {
          // 좌표로 법정동 상세 주소 정보를 요청합니다
          geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }

        // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
        function displayCenterInfo(result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            var infoDiv = document.getElementById("centerAddr");

            if (infoDiv !== null) {
              for (var i = 0; i < result.length; i++) {
                // 행정동의 region_type 값은 'H' 이므로
                if (result[i].region_type === "H") {
                  infoDiv.innerHTML = result[i].address_name;
                  break;
                }
              }
            }
          }
        }

        marker.setMap(map);

        // 지도에 클릭 이벤트를 등록합니다
        // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
        window.kakao.maps.event.addListener(
          map,
          "click",
          function (mouseEvent: any) {
            // 클릭한 위도, 경도 정보를 가져옵니다
            const latlng = mouseEvent.latLng;
            setGetLat(latlng.Ma);
            setGetLng(latlng.La);

            // 마커 위치를 클릭한 위치로 옮깁니다
            marker.setPosition(latlng);
            // 마커를 클릭한 위치에 표시합니다
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);

            const resultDiv1 = document.getElementById("clickLatlng1");

            if (resultDiv1 !== null) {
              resultDiv1.innerHTML = latlng.getLat();
              // setGetLat(latlng.La);
            }
            const resultDiv2 = document.getElementById("clickLatlng2");
            if (resultDiv2 !== null) {
              resultDiv2.innerHTML = latlng.getLng();
              // setGetLng(latlng.Ma);
            }
            if (input1Ref.current) {
              input1Ref.current.value = gLat;
            }

            if (input2Ref.current) {
              input2Ref.current.value = gLng;
            }
          }
        );
      });
    };
  }, []);
};
