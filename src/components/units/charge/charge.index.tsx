import Head from "next/head";
import * as B from "./charge.style";
import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { CREATE_POINT_TRANSACTION_OF_LOADING } from "../../../commons/hooks/mutations/useMutationCreatePointTransactionOfLoading";

declare const window: typeof globalThis & {
  IMP: any;
};

export default function ChargeIndex(): JSX.Element {
  const [price, setPrice] = useState(0);
  const [point, setPoint] = useState(0);
  const [imp, setImp] = useState("");
  const router = useRouter();
  const [createPoint] = useMutation(CREATE_POINT_TRANSACTION_OF_LOADING);

  const onChangePrice = (e: any) => {
    setPrice(e.currentTarget.value);
  };

  const onClickPayment = (): void => {
    const IMP = window.IMP; // 생략 가능
    IMP.init("imp49910675"); // 예: imp00000000a

    IMP.request_pay(
      {
        pg: "kakaopay",
        pay_method: "card",
        name: "secondHandMarketPoint",

        amount: price, // 숫자 타입
        buyer_email: "gildong@gmail.com",
        buyer_name: "홍길동",
        buyer_tel: "010-1234-5678",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
        m_redirect_url: "http://localhost:3000/charge",
      },
      (rsp: any) => {
        // callback
        if (rsp.success === true) {
          createPoint({
            variables: {
              impUid: rsp.imp_uid,
            },
          });
          router.push("/Market");
          setTimeout(() => window.location.reload(), 500);
          //   setImp(rsp.imp_uid);
          //   setPoint(rsp.paid_amount);
        } else {
          alert("결제가 실패했습니다.");
        }
      }
    );
  };

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        {/* <!-- iamport.payment.js --> */}
        <script src="https://cdn.iamport.kr/v1/iamport.js"></script>
      </Head>
      <B.Wrapper>
        <B.MainBox>
          <B.Logo src="/images/icons/로고.png" />
          <B.InputBox>
            <B.Select onChange={onChangePrice}>
              <option value={0}>충전 포인트 선택</option>
              <option value={10000}>10,000원 </option>
              <option value={20000}>20,000원 </option>
              <option value={50000}>50,000원 </option>
              <option value={1000000}>1,000,000원 </option>
            </B.Select>
            <B.ChargeButton onClick={onClickPayment}>충전하기</B.ChargeButton>
          </B.InputBox>
        </B.MainBox>
      </B.Wrapper>
    </>
  );
}
