import { ChangeEvent, useState, useRef, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import {} from "./MarketWrite.queries";
import LoginUI from "./MarketWrite.presenter";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CREATE_USED_ITEM } from "./MarketWrite.queries";

export const schema = yup.object({
  name: yup.string().required("상품명을 입력하세요!"),
  remarks: yup.string().required("한줄요약을 입력하세요!"),
  price: yup.string().required("판매 가격을 입력하세요!"),
  contents: yup.string().required("상품설명을 입력하세요!"),
});

export default function LoginNewPage(props): JSX.Element {
  const router = useRouter();

  ///////////////////////////////////////////////////////////////
  // queries
  //////////////////////////////////////////////////////////////
  const [createUseditem] = useMutation(CREATE_USED_ITEM);

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
    console.log(value);

    setValue("contents", value === "<p><br></p>" ? "" : value);

    void trigger("contents");
  };

  /////////////////////////////////////////////////////////////////////////////////
  // onClickSubmit
  ////////////////////////////////////////////////////////////////////////////////
  console.log(formState);

  const onClickSubmit = async (data: any): Promise<void> => {
    const result = await createUseditem({
      variables: {
        createUseditemInput: {
          name: data.name,
          remarks: data.remarks,
          price: Number(data.price),
          tags: data.tags,
          images: [...fileUrls],
          contents: data.contents,
        },
      },
    });

    const { Modal } = await import("antd"); // code-splitting(코드스플릿팅)
    Modal.success({ content: "게시글 등록에 성공하였습니다!" });
    const useditemId: string = result.data.createUseditem._id;
    void router.push(`/Market/${useditemId}`);
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

  // useEffect(() => {
  //   const images = props.data?.fetchBoard.images;
  //   if (images !== undefined && images !== null) setFileUrls([...images]);
  // }, [props.data]);

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
      />
    </div>
  );
}
