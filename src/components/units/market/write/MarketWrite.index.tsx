import { useState, useRef, useEffect } from "react";
import { useMutation } from "@apollo/client";
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
import { UPLOAD_FILE } from "../../../../commons/hooks/mutations/UseMutationUpdateFile";
import { useQueryFetchUsedItem } from "../../../../commons/hooks/queries/UseQueryFetchUsedItem";
import { useOnClickMarketWrite } from "../../../../commons/hooks/event/useOnClickMarketWrite";
import { useOnClickMarketUpdate } from "../../../../commons/hooks/event/useOnClickMarketUpdate";
import { useEffectKakaoMap } from "../../../../commons/hooks/customs/useEffectKakaoMap";
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
export const schema = yup.object({
  name: yup.string().required("상품명을 입력하세요!"),
  remarks: yup.string().required("한줄요약을 입력하세요!"),
  price: yup.string().required("판매 가격을 입력하세요!"),
  contents: yup.string().required("상품설명을 입력하세요!"),
});

export default function MarketWritePage(props: any): JSX.Element {
  const router = useRouter();
  const [fileUrls, setFileUrls] = useState(["", "", ""]);
  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);
  const [gLat, setGetLat] = useState("");
  const [gLng, setGetLng] = useState("");
  const [address, setAddress] = useState("");
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const { data } = useQueryFetchUsedItem();

  const { register, setValue, trigger, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onChangeContents = (value: string): void => {
    setValue("contents", value === "<p><br></p>" ? "" : value);

    void trigger("contents");
  };

  useEffect(() => {
    const images = data?.fetchUseditem.images;
    if (images !== undefined && images !== null) setFileUrls([...images]);
  }, [data]);

  // < 상품등록 >
  const { onClickMarketWrite } = useOnClickMarketWrite(
    fileUrls,
    address,
    gLat,
    gLng
  );
  // < 상품수정 >
  const { onClickMarketUpdate } = useOnClickMarketUpdate(
    fileUrls,
    props,
    address,
    gLat,
    gLng
  );
  // < 카카오 맵 >
  useEffectKakaoMap(
    setAddress,
    setGetLat,
    setGetLng,
    input1Ref,
    input2Ref,
    gLat,
    gLng
  );
  //  < 취소하기 >
  const onClickCancel = async () => {
    router.push(`/Market`);
  };
  //  < 이미지 등록 >
  const onChangeFileUrls = (fileUrl: string, index: number): void => {
    const newFileUrls = [...fileUrls];
    newFileUrls[index] = fileUrl;
    setFileUrls(newFileUrls);
  };

  return (
    <>
      <B.Wrapper>
        <B.Title>{props.isEdit ? "상품 수정" : "상품 등록"} 하기</B.Title>
        <B.Label>상품이미지</B.Label>
        <B.UploadBox>
          {fileUrls.map((el: any, index: any) => (
            <Uploads01
              key={uuidv4()}
              index={index}
              fileUrl={el}
              onChangeFileUrls={onChangeFileUrls}
            />
          ))}
        </B.UploadBox>
        <p style={{ fontSize: "12px", color: "black" }}>
          * 상품 이미지는 640x640에 최적화 되어 있습니다.
          <br />
          - 상품 이미지는 PC에서는 1:1, 모바일에서는 1:1.23 비율로 보여집니다.
          <br />
          - 이미지는 상품 등록 시 정사각형으로 잘려서 등록됩니다.
          <br />
          - 이미지를 클릭할 경우 원본 이미지를 확인할 수 있습니다.
          <br />
          - 이미지를 클릭 후 이동하여 등록순서를 변경할 수 있습니다.
          <br />
          - 큰 이미지일 경우 이미지가 깨지는 경우가 발생할 수 있습니다.
          <br />- 최대 지원 사이즈인 640 X 640으로 리사이즈 해서
          올려주세요.(개당 이미지 최대 10M)
        </p>
        <B.Line />
        <B.Form onSubmit={wrapFormAsync(handleSubmit(onClickMarketWrite))}>
          <B.Main>
            <B.InputBox>
              <B.Label>제목</B.Label>
              <Input04
                title="상품 제목을 입력해주세요."
                register={register("name")}
                defaultValue={data?.fetchUseditem.name}
              ></Input04>
              <B.Error style={{ color: "red" }}>
                {formState.errors.name?.message}
              </B.Error>
              <B.Line />
              <B.Label>한줄요약 </B.Label>
              <Input04
                title="상품명을 작성해주세요."
                register={register("remarks")}
                defaultValue={data?.fetchUseditem.remarks}
              ></Input04>
              <B.Error style={{ color: "red" }}>
                {formState.errors.remarks?.message}
              </B.Error>
              <B.Line />
              <B.Label>상품설명 </B.Label>
              <ReactQuill
                onChange={onChangeContents}
                defaultValue={data?.fetchUseditem.contents}
                style={{ border: "2px solid black" }}
              />
              <B.Error style={{ color: "red" }}>
                {formState.errors.contents?.message}
              </B.Error>
              <B.Line />
              <B.Label>판매 가격</B.Label>
              <B.InputPrice>
                <Input04
                  title="숫자만 입력해주세요."
                  register={register("price")}
                  defaultValue={data?.fetchUseditem.price}
                ></Input04>
                <p style={{ marginLeft: "15px", marginBottom: "15px" }}>원</p>
              </B.InputPrice>
              <B.Error style={{ color: "red" }}>
                {formState.errors.price?.message}
              </B.Error>
              <B.Line />
              <B.Label>태그입력</B.Label>
              <Input04
                title="연관태그를 입력해주세요."
                register={register("tags")}
                defaultValue={data?.fetchUseditem.tags}
              ></Input04>
              <B.TagsText>
                - 태그는 띄어쓰기로 구분되며 최대 9자까지 입력할 수 있습니다.
                <br />
                - 태그는 검색의 부가정보로 사용 되지만, 검색 결과 노출을
                <br />- 보장하지는 않습니다. 검색 광고는 태그정보를 기준으로
                노출됩니다.
              </B.TagsText>
              <B.Line />
              <B.AddressArticle>
                <B.MapWrapper>
                  <B.Label>거래위치</B.Label>
                  <B.MapBox>
                    <div
                      id="map"
                      style={{
                        width: "100%",
                        height: "300px",
                        position: "relative",
                        overflow: "hidden",
                        border: "2px solid black",
                      }}
                    ></div>
                    <B.HAddr>
                      <B.CenterAddr
                        id="centerAddr"
                        style={{ display: "none" }}
                      ></B.CenterAddr>
                    </B.HAddr>
                  </B.MapBox>
                </B.MapWrapper>
                <B.AddressWrapper>
                  <B.AddressBox>
                    <B.Label>주소</B.Label>
                    <Input05
                      title=""
                      answer={address}
                      register={register("address")}
                      defaultValue={
                        data?.fetchUseditem?.useditemAddress?.address
                      }
                    ></Input05>
                    <Input04
                      title="상세주소를 입력해주세요."
                      register={register("addressDetail")}
                      defaultValue={
                        data?.fetchUseditem?.useditemAddress?.addressDetail
                      }
                    ></Input04>
                  </B.AddressBox>
                </B.AddressWrapper>
              </B.AddressArticle>
            </B.InputBox>
          </B.Main>
        </B.Form>
        <B.Footer>
          <B.ButtonForm
            onSubmit={
              props.isEdit
                ? wrapFormAsync(handleSubmit(onClickMarketUpdate))
                : wrapFormAsync(handleSubmit(onClickMarketWrite))
            }
          >
            <Button03
              title={props.isEdit ? "수정하기" : "등록하기"}
              isActive={formState.isValid}
            />
          </B.ButtonForm>
          <B.Button onClick={onClickCancel}>취소하기</B.Button>
        </B.Footer>
      </B.Wrapper>
    </>
  );
}
