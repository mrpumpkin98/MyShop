import * as B from "./MarketWrite.styles";
import Input04 from "../../../../commons/inputs/04-Market";
import Button02 from "../../../../commons/buttons/02-SignUp";
import { wrapFormAsync } from "../../../../commons/libraries/asyncFunc";
import Uploads01 from "../../../../commons/uploads/01/Uploads01.container";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

// const Uploads01 = dynamic(async () => await import("../../../../commons/uploads/01/Uploads01.container"), {
//   ssr: false,
// });

export default function LoginUI(props) {
  return (
    <>
      <B.Title onClick={props.onClickLogo}>
        <B.FireFilledIcon />
        Header
      </B.Title>
      <B.Wrapper>
        <form onSubmit={wrapFormAsync(props.handleSubmit(props.onClickSubmit))}>
          <B.LoginWrapper>
            <B.LoginTie>
              <B.Label>상품명</B.Label>
              <Input04
                title="상품명을 작성해주세요."
                register={props.register("name")}
              ></Input04>
              <B.Label>한줄요약 </B.Label>
              <Input04
                title="상품명을 작성해주세요."
                register={props.register("remarks")}
              ></Input04>
              <B.Label>상품설명 </B.Label>
              <ReactQuill onChange={props.onChangeContents} />
              <B.Label>판매 가격</B.Label>
              <Input04
                title="판매 가격을 입력해주세요."
                register={props.register("price")}
              ></Input04>
              <B.Label>태그입력</B.Label>
              <Input04
                title="#태그  #태그  #태그  "
                register={props.register("tags")}
              ></Input04>
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
            </B.LoginTie>
            <Button02 title="회원가입하기" isActive={props.formState.isValid} />
          </B.LoginWrapper>
        </form>
      </B.Wrapper>
    </>
  );
}
