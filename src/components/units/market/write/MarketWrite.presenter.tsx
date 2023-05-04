import * as B from "./MarketWrite.styles";
import Input04 from "../../../../commons/inputs/04-Market";
import Input05 from "../../../../commons/inputs/05-Market-value";
import Button03 from "../../../../commons/buttons/03-Smple";
import { wrapFormAsync } from "../../../../commons/libraries/asyncFunc";
// import Uploads01 from "../../../../commons/uploads/01/Uploads01.container";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Wrapper } from "../../../commons/layout/banner/LayoutBanner.styles";
import { useEffect, useRef, useState } from "react";
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

export default function LoginUI(props: any) {
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
                defaultValue={props.data?.fetchUseditem.name}
              ></Input04>
              <B.Error style={{ color: "red" }}>
                {props.formState.errors.name?.message}
              </B.Error>
              <B.Label>한줄요약 </B.Label>
              <Input04
                title="상품명을 작성해주세요."
                register={props.register("remarks")}
                defaultValue={props.data?.fetchUseditem.remarks}
              ></Input04>
              <B.Error style={{ color: "red" }}>
                {props.formState.errors.remarks?.message}
              </B.Error>
              <B.WrapperReactQuill>
                <B.Label>상품설명 </B.Label>
                <ReactQuill
                  onChange={props.onChangeContents}
                  defaultValue={props.data?.fetchUseditem.contents}
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
                defaultValue={props.data?.fetchUseditem.price}
              ></Input04>
              <B.Error style={{ color: "red" }}>
                {props.formState.errors.price?.message}
              </B.Error>
              <B.Label>태그입력</B.Label>
              <Input04
                title="#태그  #태그  #태그  "
                register={props.register("tags")}
                defaultValue={props.data?.fetchUseditem.tags}
              ></Input04>
              <B.WrapperMapLatLng>
                <B.WrapperMap>
                  <B.Label>거래위치</B.Label>
                  <B.MapWrap>
                    <div
                      id={props.mapId}
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
                        id={props.centerAddr}
                        style={{ display: "none" }}
                      ></B.CenterAddr>
                    </B.HAddr>
                  </B.MapWrap>
                </B.WrapperMap>
                <B.WrapperGPSAddress>
                  <B.WrapperLatLng>
                    <B.Label>GPS</B.Label>
                    <B.TieLatLng>
                      <B.Lat
                        ref={props.input1Ref}
                        readOnly
                        defaultValue={
                          props.data?.fetchUseditem.useditemAddress.lat
                        }
                      />
                      {/* <B.AimOut /> */}
                      <B.Lng
                        ref={props.input2Ref}
                        readOnly
                        defaultValue={
                          props.data?.fetchUseditem.useditemAddress.lng
                        }
                      />
                      <div style={{ display: "none" }} id="clickLatlng1"></div>
                      <div style={{ display: "none" }} id="clickLatlng2"></div>
                    </B.TieLatLng>
                  </B.WrapperLatLng>
                  <B.WrapperAddressAddressDetail>
                    <B.Label>주소</B.Label>
                    <Input05
                      title=""
                      answer={props.address}
                      register={props.register("address")}
                      defaultValue={
                        props.data?.fetchUseditem.useditemAddress.address
                      }
                    ></Input05>
                    <Input04
                      title=""
                      register={props.register("addressDetail")}
                      defaultValue={
                        props.data?.fetchUseditem.useditemAddress.addressDetail
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
          {props.fileUrls.map((el: any, index: any) => (
            <Uploads01
              key={uuidv4()}
              index={index}
              fileUrl={el}
              onChangeFileUrls={props.onChangeFileUrls}
            />
          ))}
        </B.UploadButton>
        <B.ButtonForm
          onSubmit={
            props.isEdit
              ? wrapFormAsync(props.handleSubmit(props.onClickUpdate))
              : wrapFormAsync(props.handleSubmit(props.onClickSubmit))
          }
        >
          <Button03
            title={props.isEdit ? "수정하기" : "등록하기"}
            isActive={props.formState.isValid}
          />
        </B.ButtonForm>
      </B.Wrapper>
    </>
  );
}
