import { ChangeEvent, useState, useRef, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  UPDATE_USED_ITEM,
  CREATE_USED_ITEM,
  UPLOAD_FILE,
  FETCH_USED_ITEM,
} from "./MarketWrite.queries";
import LoginUI from "./MarketWrite.presenter";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("상품명을 입력하세요!"),
  remarks: yup.string().required("한줄요약을 입력하세요!"),
  price: yup.string().required("판매 가격을 입력하세요!"),
  contents: yup.string().required("상품설명을 입력하세요!"),
});

export default function LoginNewPage(props: any): JSX.Element {
  ///////////////////////////////////////////////////////////////
  // router
  //////////////////////////////////////////////////////////////
  const router = useRouter();

  ///////////////////////////////////////////////////////////////
  // queries
  //////////////////////////////////////////////////////////////
  const [createUseditem] = useMutation(CREATE_USED_ITEM);
  const [updateUseditem] = useMutation(UPDATE_USED_ITEM);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const { data } = useQuery(FETCH_USED_ITEM, {
    variables: { useditemId: router.query.useditemId },
  });

  ///////////////////////////////////////////////////////////////
  // useForm
  //////////////////////////////////////////////////////////////

  const { register, setValue, trigger, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  /////////////////////////////////////////////////////////////////////////////////
  // onChangeContents  컨텐츠는 라이브러리를 사용중이라 register가 적용이 안됨
  ////////////////////////////////////////////////////////////////////////////////

  const onChangeContents = (value: string): void => {
    setValue("contents", value === "<p><br></p>" ? "" : value);

    void trigger("contents");
  };

  /////////////////////////////////////////////////////////////////////////////////
  // 상품 등록
  ////////////////////////////////////////////////////////////////////////////////

  const onClickSubmit = async (data: any): Promise<void> => {
    const result = await createUseditem({
      variables: {
        createUseditemInput: {
          name: data.name,
          remarks: data.remarks,
          price: Number(data.price),
          tags: data.tags, //여기서도 split(" ")가능
          images: [...fileUrls],
          contents: data.contents,
          useditemAddress: {
            address: address,
            addressDetail: data.addressDetail,
            lat: gLat,
            lng: gLng,
          },
        },
      },
    });

    const { Modal } = await import("antd"); // code-splitting(코드스플릿팅)
    Modal.success({ content: "게시글 등록에 성공하였습니다!" });
    const useditemId: string = result.data.createUseditem._id;
    void router.push(`/Market/${useditemId}`);
  };

  /////////////////////////////////////////////////////////////////////////////////
  // 상품 업데이트
  ////////////////////////////////////////////////////////////////////////////////
  const onClickUpdate = async (data: any) => {
    const currentFiles = JSON.stringify(fileUrls);
    const defaultFiles = JSON.stringify(props.data?.fetchBoard.images);
    const isChangedFiles = currentFiles !== defaultFiles;

    if (address === "" && !isChangedFiles) {
      alert("수정한 내용이 없습니다.");
      return;
    }

    // const updateUseditemInput = {};
    // if (address !== "") {
    //   updateUseditemInput.useditemAddress = {};
    //   if (address !== "") updateUseditemInput.useditemAddress.address = address;
    //   updateUseditemInput.useditemAddress.addressDetail = addressDetail;
    // }
    // if (isChangedFiles) updateUseditemInput.images = fileUrls;

    try {
      if (typeof router.query.useditemId !== "string") {
        alert("시스템에 문제가 있습니다.");
        return;
      }
      const result = await updateUseditem({
        variables: {
          updateUseditemInput: {
            name: data.name,
            remarks: data.remarks,
            price: Number(data.price),
            tags: data.tags, //여기서도 split(" ")가능
            images: [...fileUrls],
            contents: data.contents,
            useditemAddress: {
              address: address,
              addressDetail: data.addressDetail,
              lat: gLat,
              lng: gLng,
            },
          },
          useditemId: router.query.useditemId,
        },
      });

      if (result.data?.updateUseditem._id === undefined) {
        alert("요청에 문제가 있습니다.");
        return;
      }
      void router.push(`/Market/${result.data?.updateUseditem._id}`);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  ///////////////////////////////////////////////////////////////
  //  취소하기
  //////////////////////////////////////////////////////////////

  const onClickCancel = async () => {
    router.push(`/Board`);
  };

  ///////////////////////////////////////////////////////////////
  //  이미지 등록
  //////////////////////////////////////////////////////////////
  const [fileUrls, setFileUrls] = useState(["", "", ""]);

  const onChangeFileUrls = (fileUrl: string, index: number): void => {
    const newFileUrls = [...fileUrls];
    newFileUrls[index] = fileUrl;
    setFileUrls(newFileUrls);
  };

  ///////////////////////////////////////////////////////////////
  // 카카오 MAP
  //////////////////////////////////////////////////////////////
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
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
        const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
        const options = {
          // 지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(37.579251, 126.993174), // 지도의 중심좌표.
          level: 3, // 지도의 레벨(확대, 축소 정도)
        };

        const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

        // 주소-좌표 변환 객체를 생성합니다
        const geocoder = new kakao.maps.services.Geocoder();

        const marker = new window.kakao.maps.Marker({
            // 지도 중심좌표에 마커를 생성합니다
            position: map.getCenter(),
          }),
          infowindow = new kakao.maps.InfoWindow({ zIndex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

        // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);

        // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
        kakao.maps.event.addListener(map, "click", function (mouseEvent: any) {
          searchDetailAddrFromCoords(
            mouseEvent.latLng,
            function (result: any, status: any) {
              if (status === kakao.maps.services.Status.OK) {
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
                console.log(result[0].address.address_name);
                setAddress(result[0].address.address_name);
              }
            }
          );
        });

        // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
        kakao.maps.event.addListener(map, "idle", function () {
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
          if (status === kakao.maps.services.Status.OK) {
            var infoDiv = document.getElementById("centerAddr");

            for (var i = 0; i < result.length; i++) {
              // 행정동의 region_type 값은 'H' 이므로
              if (result[i].region_type === "H") {
                infoDiv.innerHTML = result[i].address_name;
                break;
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
          }
        );
      });
    };
  }, []);

  /////////////////////////////return/////////////////////////////////

  return (
    <div>
      <LoginUI
        onClickSubmit={onClickSubmit}
        register={register}
        handleSubmit={handleSubmit}
        formState={formState}
        fileUrls={fileUrls}
        onChangeFileUrls={onChangeFileUrls}
        onChangeContents={onChangeContents}
        mapId="map"
        centerAddr="centerAddr"
        input1Ref={input1Ref}
        input2Ref={input2Ref}
        address={address}
        onClickUpdate={onClickUpdate}
        isEdit={props.isEdit}
        data={data}
      />
    </div>
  );
}
