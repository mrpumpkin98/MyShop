import { ChangeEvent, useState, useRef, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import * as B from "./MarketWrite.styles";
import Input04 from "../../../../commons/inputs/04-Market";
import Input05 from "../../../../commons/inputs/05-Market-value";
import Button03 from "../../../../commons/buttons/03-Smple";
import { wrapFormAsync } from "../../../../commons/libraries/asyncFunc";
import { CREATE_USED_ITEM } from "../../../../commons/hooks/mutations/UseMutationCreateUsedItem";
import { UPDATE_USED_ITEM } from "../../../../commons/hooks/mutations/UseMutationUpdateUsedItem";
import { UPLOAD_FILE } from "../../../../commons/hooks/mutations/UseMutationUpdateFile";
import { FETCH_USED_ITEM } from "../../../../commons/hooks/queries/UseQueryFetchUsedItem";

export const schema = yup.object({
  name: yup.string().required("상품명을 입력하세요!"),
  remarks: yup.string().required("한줄요약을 입력하세요!"),
  price: yup.string().required("판매 가격을 입력하세요!"),
  contents: yup.string().required("상품설명을 입력하세요!"),
});

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

const Uploads01 = dynamic(
  async () =>
    await import("../../../../commons/uploads/01/Uploads01.container"),
  {
    ssr: false,
  }
);

declare const window: typeof globalThis & {
  kakao: any;
};

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
        refetchQueries: [
          {
            query: FETCH_USED_ITEM,
            variables: { useditemId: router.query.useditemId },
          },
        ],
      });

      if (result.data?.updateUseditem._id === undefined) {
        alert("요청에 문제가 있습니다.");
        return;
      }
      void router.push(`/Market/${result.data?.updateUseditem._id}`);
      alert("상품이 수정되었습니다!!");
      // console.log(result.data?.updateUseditem._id);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  ///////////////////////////////////////////////////////////////
  //  취소하기
  //////////////////////////////////////////////////////////////

  const onClickCancel = async () => {
    router.push(`/Market`);
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

  useEffect(() => {
    const images = data?.fetchUseditem.images;
    if (images !== undefined && images !== null) setFileUrls([...images]);
    // console.log(data.fetchUseditem.useditemAddress.address);
  }, [data]);

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

            // 마커 위치를 클릭한 위치로 옮깁니다
            marker.setPosition(latlng);
            // 마커를 클릭한 위치에 표시합니다
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);

            const resultDiv1 = document.getElementById("clickLatlng1");

            if (resultDiv1 !== null) {
              resultDiv1.innerHTML = latlng.getLat();
              setGetLat(latlng.getLat());
            }
            const resultDiv2 = document.getElementById("clickLatlng2");
            if (resultDiv2 !== null) {
              resultDiv2.innerHTML = latlng.getLng();
              setGetLng(latlng.getLng());
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

  /////////////////////////////return/////////////////////////////////

  return (
    <>
      <B.Wrapper>
        <B.Title>{props.isEdit ? "상품 수정" : "상품 등록"} 하기</B.Title>
        <form onSubmit={wrapFormAsync(handleSubmit(onClickSubmit))}>
          <B.LoginWrapper>
            <B.LoginTie>
              <B.Label>상품명</B.Label>
              <Input04
                title="상품명을 작성해주세요."
                register={register("name")}
                defaultValue={data?.fetchUseditem.name}
              ></Input04>
              <B.Error style={{ color: "red" }}>
                {formState.errors.name?.message}
              </B.Error>
              <B.Label>한줄요약 </B.Label>
              <Input04
                title="상품명을 작성해주세요."
                register={register("remarks")}
                defaultValue={data?.fetchUseditem.remarks}
              ></Input04>
              <B.Error style={{ color: "red" }}>
                {formState.errors.remarks?.message}
              </B.Error>
              <B.WrapperReactQuill>
                <B.Label>상품설명 </B.Label>
                <ReactQuill
                  onChange={onChangeContents}
                  defaultValue={data?.fetchUseditem.contents}
                  style={{ height: "400px" }}
                />
              </B.WrapperReactQuill>
              <B.Error style={{ color: "red" }}>
                {formState.errors.contents?.message}
              </B.Error>
              <B.Label>판매 가격</B.Label>
              <Input04
                title="판매 가격을 입력해주세요."
                register={register("price")}
                defaultValue={data?.fetchUseditem.price}
              ></Input04>
              <B.Error style={{ color: "red" }}>
                {formState.errors.price?.message}
              </B.Error>
              <B.Label>태그입력</B.Label>
              <Input04
                title="#태그  #태그  #태그  "
                register={register("tags")}
                defaultValue={data?.fetchUseditem.tags}
              ></Input04>
              <B.WrapperMapLatLng>
                <B.WrapperMap>
                  <B.Label>거래위치</B.Label>
                  <B.MapWrap>
                    <div
                      id="map"
                      style={{
                        width: "384px",
                        height: "252px",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    ></div>
                    <B.HAddr>
                      {/* <B.AddrTitle>지도중심기준 행정동 주소정보</B.AddrTitle> */}
                      <B.CenterAddr
                        id="centerAddr"
                        style={{ display: "none" }}
                      ></B.CenterAddr>
                    </B.HAddr>
                  </B.MapWrap>
                </B.WrapperMap>
                <B.WrapperGPSAddress>
                  <B.WrapperAddressAddressDetail>
                    <B.Label>주소</B.Label>
                    <Input05
                      title=""
                      answer={address}
                      register={register("address")}
                      defaultValue={data?.fetchUseditem.useditemAddress.address}
                    ></Input05>
                    <Input04
                      title=""
                      register={register("addressDetail")}
                      defaultValue={
                        data?.fetchUseditem.useditemAddress.addressDetail
                      }
                    ></Input04>
                  </B.WrapperAddressAddressDetail>
                </B.WrapperGPSAddress>
              </B.WrapperMapLatLng>
            </B.LoginTie>
          </B.LoginWrapper>
        </form>
        <B.Label>사진첨부</B.Label>
        <B.UploadButton>
          {fileUrls.map((el: any, index: any) => (
            <Uploads01
              key={uuidv4()}
              index={index}
              fileUrl={el}
              onChangeFileUrls={onChangeFileUrls}
            />
          ))}
        </B.UploadButton>
        <B.ButtonWrapper>
          <B.ButtonForm
            onSubmit={
              props.isEdit
                ? wrapFormAsync(handleSubmit(onClickUpdate))
                : wrapFormAsync(handleSubmit(onClickSubmit))
            }
          >
            <Button03
              title={props.isEdit ? "수정하기" : "등록하기"}
              isActive={formState.isValid}
            />
          </B.ButtonForm>
          <B.Button onClick={onClickCancel}>취소하기</B.Button>
        </B.ButtonWrapper>
      </B.Wrapper>
    </>
  );
}
