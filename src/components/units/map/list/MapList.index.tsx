import { useEffect, useRef, useState } from "react";
import * as B from "./MapList.styles";
import { useQuery } from "@apollo/client";
import { FETCH_USED_ITEMS } from "../../../../commons/hooks/queries/UseQueryFetchUsedItems";

declare const window: typeof globalThis & {
  kakao: any;
};

export default function MapPage() {
  ///////////////////////////////////////////////////////////////
  // 카카오 MAP
  //////////////////////////////////////////////////////////////
  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);
  const [gLat, setGetLat] = useState("");
  const [gLng, setGetLng] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f3e19a9d14ef6f578a2ef9d36fa3f9c7&libraries=services";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(function () {
        var mapContainer = document.getElementById("map"), // 지도를 표시할 div
          mapOption = {
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
          };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다
        var positions = [
          {
            content: "<div>카카오</div>",
            latlng: new kakao.maps.LatLng(33.450705, 126.570677),
          },
          {
            content: "<div>생태연못</div>",
            latlng: new kakao.maps.LatLng(33.450936, 126.569477),
          },
          {
            content: "<div>텃밭</div>",
            latlng: new kakao.maps.LatLng(33.450879, 126.56994),
          },
          {
            content: "<div>근린공원</div>",
            latlng: new kakao.maps.LatLng(33.451393, 126.570738),
          },
        ];
        var mappedPositions = positions.map(function (position) {
          return {
            content: position.content,
            latlng: new kakao.maps.LatLng(
              position.latlng.getLat(),
              position.latlng.getLng()
            ),
          };
        });

        for (var i = 0; i < mappedPositions.length; i++) {
          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: mappedPositions[i].latlng, // 마커의 위치
          });

          // 마커에 표시할 인포윈도우를 생성합니다
          var infowindow = new kakao.maps.InfoWindow({
            content: mappedPositions[i].content, // 인포윈도우에 표시할 내용
          });

          // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
          // 이벤트 리스너로는 클로저를 만들어 등록합니다
          // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
          kakao.maps.event.addListener(
            marker,
            "mouseover",
            makeOverListener(map, marker, infowindow)
          );
          kakao.maps.event.addListener(
            marker,
            "mouseout",
            makeOutListener(infowindow)
          );
        }

        // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
        function makeOverListener(map, marker, infowindow) {
          return function () {
            infowindow.open(map, marker);
          };
        }

        // 인포윈도우를 닫는 클로저를 만드는 함수입니다
        function makeOutListener(infowindow) {
          return function () {
            infowindow.close();
          };
        }

        /* 아래와 같이도 할 수 있습니다 */
        /*
    for (var i = 0; i < positions.length; i ++) {
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng // 마커의 위치
        });
    
        // 마커에 표시할 인포윈도우를 생성합니다 
        var infowindow = new kakao.maps.InfoWindow({
            content: positions[i].content // 인포윈도우에 표시할 내용
        });
    
        // 마커에 이벤트를 등록하는 함수 만들고 즉시 호출하여 클로저를 만듭니다
        // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        (function(marker, infowindow) {
            // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다 
            kakao.maps.event.addListener(marker, 'mouseover', function() {
                infowindow.open(map, marker);
            });
    
            // 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
            kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });
        })(marker, infowindow);
    }
    */
      });
    };
  }, []);

  const { loading, error, data } = useQuery(FETCH_USED_ITEMS, {
    variables: { page: 1 },
  });

  // 모든 페이지의 데이터를 담을 배열
  let allItems: any[] = [];
  // 현재 페이지의 데이터를 allItems 배열에 추가
  const processPageData = (pageData: any) => {
    allItems = [...allItems, ...pageData];
  };

  // 첫 번째 페이지의 데이터 처리
  if (data && data.fetchUseditems) {
    processPageData(data.fetchUseditems);
  }

  // 총 페이지 수를 계산
  const totalPages = Math.ceil((data?.fetchUseditems?.length || 0) / 10);

  // 페이지별로 데이터를 가져와서 allItems 배열에 추가
  for (let page = 2; page <= totalPages; page++) {
    const { data: pageData } = useQuery(FETCH_USED_ITEMS, {
      variables: { isSoldout: false, search: "", page },
    });

    if (pageData && pageData.fetchUseditems) {
      processPageData(pageData.fetchUseditems);
    }
  }
  console.log(allItems);

  return (
    <>
      {allItems.map((item) => (
        <div key={item._id}>
          <div>{item._id}</div>
        </div>
      ))}
      <B.Wrapper>
        <B.MapWrap>
          <B.Map id="map"></B.Map>
        </B.MapWrap>
      </B.Wrapper>
    </>
  );
}
