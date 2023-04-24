import * as B from "./MarketWrite.styles";
import Input04 from "../../../../commons/inputs/04-Market";
import Button03 from "../../../../commons/buttons/03-Smple";
import { wrapFormAsync } from "../../../../commons/libraries/asyncFunc";
import Uploads01 from "../../../../commons/uploads/01/Uploads01.container";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Wrapper } from "../../../commons/layout/banner/LayoutBanner.styles";
import { useEffect, useRef, useState } from "react";
const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

// const Uploads01 = dynamic(async () => await import("../../../../commons/uploads/01/Uploads01.container"), {
//   ssr: false,
// });

declare const window: typeof globalThis & {
  kakao: any;
};

export default function LoginUI(props) {
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const [gLat, setGetLat] = useState("");
  const [gLng, setGetLng] = useState("");

  ///////////////////////////////////////////////////////////////
  //  카카오 지도
  //////////////////////////////////////////////////////////////
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f3e19a9d14ef6f578a2ef9d36fa3f9c7";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(function () {
        const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
        const options = {
          // 지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(37.241547, 131.864797), // 지도의 중심좌표.
          level: 3, // 지도의 레벨(확대, 축소 정도)
        };

        const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
        console.log(map);

        const marker = new window.kakao.maps.Marker({
          // 지도 중심좌표에 마커를 생성합니다
          position: map.getCenter(),
        });

        marker.setMap(map);

        // 지도에 클릭 이벤트를 등록합니다
        // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
        window.kakao.maps.event.addListener(
          map,
          "click",
          function (mouseEvent: any) {
            // 클릭한 위도, 경도 정보를 가져옵니다
            const latlng = mouseEvent.latLng;

            // 마커 위치를 클릭한 위치로 옮깁니다
            marker.setPosition(latlng);
            // 마커를 클릭한 위치에 표시합니다
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);

            const resultDiv1 = document.getElementById("clickLatlng1");
            resultDiv1.innerHTML = latlng.getLat();
            setGetLat(latlng.getLat());
            const resultDiv2 = document.getElementById("clickLatlng2");
            resultDiv2.innerHTML = latlng.getLng();
            setGetLng(latlng.getLng());
            input1Ref.current.value = clickLatlng1.innerHTML;
            input2Ref.current.value = clickLatlng2.innerHTML;

            // getAddr(gLat, gLng);
            // function getAddr(gLat: any, gLng: any) {
            //   let geocoder = new window.kakao.maps.services.Geocoder();

            //   let coord = new window.kakao.maps.LatLng(gLat, gLng);
            //   let callback = function (result: any, status: any) {
            //     if (status === window.kakao.maps.services.Status.OK) {
            //       console.log(result);
            //     }
            //   };
            //   geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
            // }
          }
        );
      });
    };
  }, []);

  return (
    <>
      <B.Wrapper>
        <B.Title>{props.isEdit ? "상품 수정" : "상품 등록"} 하기</B.Title>
        <form onSubmit={wrapFormAsync(props.handleSubmit(props.onClickSubmit))}>
          <B.LoginWrapper>
            <B.LoginTie>
              <B.Label>상품명</B.Label>
              <Input04
                title="상품명을 작성해주세요."
                register={props.register("name")}
              ></Input04>
              <B.Error style={{ color: "red" }}>
                {props.formState.errors.name?.message}
              </B.Error>
              <B.Label>한줄요약 </B.Label>
              <Input04
                title="상품명을 작성해주세요."
                register={props.register("remarks")}
              ></Input04>
              <B.Error style={{ color: "red" }}>
                {props.formState.errors.remarks?.message}
              </B.Error>
              <B.WrapperReactQuill>
                <B.Label>상품설명 </B.Label>
                <ReactQuill
                  onChange={props.onChangeContents}
                  style={{ height: "400px" }}
                />
              </B.WrapperReactQuill>
              <B.Error style={{ color: "red" }}>
                {props.formState.errors.contents?.message}
              </B.Error>
              <B.Label>판매 가격</B.Label>
              <Input04
                title="판매 가격을 입력해주세요."
                register={props.register("price")}
              ></Input04>
              <B.Error style={{ color: "red" }}>
                {props.formState.errors.price?.message}
              </B.Error>
              <B.Label>태그입력</B.Label>
              <Input04
                title="#태그  #태그  #태그  "
                register={props.register("tags")}
              ></Input04>
              <B.WrapperMapLatLng>
                <B.WrapperMap>
                  <B.Label>거래위치</B.Label>
                  <div
                    id="map"
                    style={{ width: "384px", height: "252px" }}
                  ></div>
                </B.WrapperMap>
                <B.WrapperGPSAddress>
                  <B.WrapperLatLng>
                    <B.Label>GPS</B.Label>
                    <B.TieLatLng>
                      <B.Lat ref={input1Ref} />
                      <B.AimOut />
                      <B.Lng ref={input2Ref} />
                      <div style={{ display: "none" }} id="clickLatlng1"></div>
                      <div style={{ display: "none" }} id="clickLatlng2"></div>
                    </B.TieLatLng>
                  </B.WrapperLatLng>
                  <B.WrapperAddressAddressDetail>
                    <B.Label>주소</B.Label>
                    <Input04
                      title=""
                      register={props.register("address")}
                    ></Input04>
                    <Input04
                      title=""
                      register={props.register("addressDetail")}
                    ></Input04>
                  </B.WrapperAddressAddressDetail>
                </B.WrapperGPSAddress>
              </B.WrapperMapLatLng>
            </B.LoginTie>
          </B.LoginWrapper>
        </form>
        <B.Label>사진첨부</B.Label>
        <B.UploadButton>
          {props.fileUrls.map((el, index) => (
            <Uploads01
              key={uuidv4()}
              index={index}
              fileUrl={el}
              onChangeFileUrls={props.onChangeFileUrls}
            />
          ))}
        </B.UploadButton>
        <B.ButtonForm
          onSubmit={wrapFormAsync(props.handleSubmit(props.onClickSubmit))}
        >
          <Button03 title="등록하기" isActive={props.formState.isValid} />
        </B.ButtonForm>
      </B.Wrapper>
    </>
  );
}
