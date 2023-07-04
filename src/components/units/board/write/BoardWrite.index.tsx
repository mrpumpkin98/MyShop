import { ChangeEvent, useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import type { Address } from "react-daum-postcode";
import * as B from "./BoardWrite.styles";
import Uploads01 from "../../../../commons/uploads/01/Uploads01.container";
import { v4 as uuidv4 } from "uuid";
import { CREATE_BOARD } from "../../../../commons/hooks/mutations/UseMutationCreateBoard";
import { UPDATE_BOARD } from "../../../../commons/hooks/mutations/UseMutationUpdateBoard";
import { UPLOAD_FILE } from "../../../../commons/hooks/mutations/UseMutationUpdateFile";
import { FETCH_BOARD } from "../../../../commons/hooks/queries/UseQueryFetchBoard";
import dynamic from "next/dynamic";

const ToastEditor = dynamic(
  async () => await import("../../../../commons/toastUI/index"),
  {
    ssr: false,
  }
);

interface ProductInput {}

type EditorInstance = {
  getInstance: () => { getHTML: () => string };
};

export default function BoardsNewPage(props: any) {
  ///////////////////////////////////////////////////////////////
  // router
  //////////////////////////////////////////////////////////////

  const router = useRouter();

  ///////////////////////////////////////////////////////////////
  // useState
  //////////////////////////////////////////////////////////////

  const [Active, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [contents, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [fileUrls, setFileUrls] = useState(["", "", ""]);
  const contentsRef = useRef<EditorInstance | null>(null);
  const [writerError, setWriterError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentsError, setContentsError] = useState("");

  ///////////////////////////////////////////////////////////////
  // queries
  //////////////////////////////////////////////////////////////

  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: router.query.boardId },
  });

  ///////////////////////////////////////////////////////////////
  // Ref
  //////////////////////////////////////////////////////////////

  const fileRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  ///////////////////////////////////////////////////////////////
  //  onChange
  //////////////////////////////////////////////////////////////

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
    if (event.target.value !== "") {
      setWriterError("");
    }

    if (event.target.value && password && title && contents) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (event.target.value !== "") {
      setPasswordError("");
    }

    if (writer && event.target.value && title && contents) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (event.target.value !== "") {
      setTitleError("");
    }

    if (writer && password && event.target.value && contents) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  // const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
  //   setContents(event.target.value);
  //   if (event.target.value !== "") {
  //     setContentsError("");
  //   }

  //   if (writer && password && title && event.target.value) {
  //     setIsActive(true);
  //   } else {
  //     setIsActive(false);
  //   }
  // };

  const onChangeContents = (text: any) => {
    const editorInstance: string =
      contentsRef.current?.getInstance()?.getHTML() ?? "";
    setContent(text === "<p><br><p>" ? "" : editorInstance);
  };

  const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>): void => {
    setYoutubeUrl(event.target.value);
  };

  const onChangeAddressDetail = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setAddressDetail(event.target.value);
  };

  ///////////////////////////////////////////////////////////////
  //  주소검색 라이브러리
  //////////////////////////////////////////////////////////////

  const onCompleteAddressSearch = (data: Address): void => {
    setAddress(data.address);
    setZipcode(data.zonecode);
    setIsOpen((prev) => !prev);
  };

  const onClickAddressSearch = (): void => {
    setIsOpen((prev) => !prev);
  };

  //주소 모달 확인 / 취소 입력

  const Ok = (): void => {
    setIsOpen(false);
  };

  const Cancel = (): void => {
    setIsOpen(false);
  };

  ///////////////////////////////////////////////////////////////
  //  등록하기
  //////////////////////////////////////////////////////////////

  const onClickSubmit = async () => {
    if (!writer) {
      setWriterError("작성자를 입력해주세요.");
    }
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
    }
    if (!title) {
      setTitleError("제목을 입력해주세요.");
    }
    if (!contents) {
      setContentsError("내용을 입력해주세요.");
    }
    if (!writer || !password || !title || !contents) {
      Modal.error({
        title: "입력 오류",
        content: "필수 입력을 확인해주세요.",
      });
    }

    if (writer && password && title && contents) {
      try {
        const result = await createBoard({
          variables: {
            createBoardInput: {
              writer,
              password,
              title,
              contents,
              youtubeUrl,
              images: [...fileUrls],
              boardAddress: {
                zipcode,
                address,
                addressDetail,
              },
            },
          },
        });
        router.push(`/Board/${result.data?.createBoard._id}`);
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    }
  };

  ///////////////////////////////////////////////////////////////
  //  수정하기
  //////////////////////////////////////////////////////////////

  const onClickUpdate = async () => {
    const currentFiles = JSON.stringify(fileUrls);
    const defaultFiles = JSON.stringify(data?.fetchBoard.images);
    const isChangedFiles = currentFiles !== defaultFiles;

    if (
      title === "" &&
      contents === "" &&
      youtubeUrl === "" &&
      address === "" &&
      addressDetail === "" &&
      zipcode === "" &&
      !isChangedFiles
    ) {
      alert("수정한 내용이 없습니다.");
      return;
    }

    if (password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    const updateBoardInput: any = {};
    if (title !== "") updateBoardInput.title = title;
    if (contents !== "") updateBoardInput.contents = contents;
    if (youtubeUrl !== "") updateBoardInput.youtubeUrl = youtubeUrl;
    if (zipcode !== "" || address !== "" || addressDetail !== "") {
      updateBoardInput.boardAddress = {};
      if (zipcode !== "") updateBoardInput.boardAddress.zipcode = zipcode;
      if (address !== "") updateBoardInput.boardAddress.address = address;
      if (addressDetail !== "")
        updateBoardInput.boardAddress.addressDetail = addressDetail;
    }
    if (isChangedFiles) updateBoardInput.images = fileUrls;

    try {
      if (typeof router.query.boardId !== "string") {
        alert("시스템에 문제가 있습니다.");
        return;
      }
      const result = await updateBoard({
        variables: {
          boardId: router.query.boardId,
          password,
          updateBoardInput,
        },
      });

      if (result.data?.updateBoard._id === undefined) {
        alert("요청에 문제가 있습니다.");
        return;
      }
      // void router.push(`/Board/${result.data?.updateBoard._id}`);
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

  const onChangeFileUrls = (fileUrl: string, index: number): void => {
    const newFileUrls = [...fileUrls];
    newFileUrls[index] = fileUrl;
    setFileUrls(newFileUrls);
  };

  useEffect(() => {
    const images = data?.fetchBoard.images;
    if (images !== undefined && images !== null) setFileUrls([...images]);
  }, [data]);

  return (
    <div>
      {isOpen && (
        <B.AddressModal visible={true} onOk={Ok} onCancel={Cancel}>
          <B.AddressSearchInput onComplete={onCompleteAddressSearch} />
        </B.AddressModal>
      )}
      <B.Wrapper>
        <B.Title>{props.isEdit ? "수정글" : "게시글"} 등록</B.Title>
        <B.WriterWrapper>
          <B.InputWrapper>
            <B.Label>작성자</B.Label>
            <B.Writer
              type="text"
              placeholder="이름을 적어주세요."
              onChange={onChangeWriter}
              value={data?.fetchBoard.writer}
              readOnly={data?.fetchBoard.writer}
              ref={inputRef}
            />
            <B.Error>{writerError}</B.Error>
          </B.InputWrapper>
          <B.InputWrapper>
            <B.Label>비밀번호</B.Label>
            <B.Password
              type="password"
              placeholder="비밀번호를 작성해주세요."
              onChange={onChangePassword}
            />
            <B.Error>{passwordError}</B.Error>
          </B.InputWrapper>
        </B.WriterWrapper>
        <B.InputWrapper>
          <B.Label>제목</B.Label>
          <B.Subject
            type="text"
            placeholder="제목을 작성해주세요."
            onChange={onChangeTitle}
            defaultValue={data?.fetchBoard.title}
          />
          <B.Error>{titleError}</B.Error>
        </B.InputWrapper>
        <B.InputWrapper>
          <B.Label>내용</B.Label>
          <ToastEditor
            contentsRef={contentsRef}
            onChangeContents={onChangeContents}
            initialValue={data?.fetchBoard?.content}
          />
          <B.Error>{contentsError}</B.Error>
        </B.InputWrapper>
        <B.InputWrapper>
          <B.Label>주소</B.Label>
          <B.ZipcodeWrapper>
            <B.Zipcode
              placeholder="07250"
              readOnly
              value={
                zipcode !== ""
                  ? zipcode
                  : data?.fetchBoard.boardAddress?.zipcode ?? ""
              }
            />
            <B.SearchButton onClick={onClickAddressSearch}>
              우편번호 검색
            </B.SearchButton>
          </B.ZipcodeWrapper>
          <B.Address
            readOnly
            value={
              address !== ""
                ? address
                : data?.fetchBoard.boardAddress?.address ?? ""
            }
          />
          <B.Address
            onChange={onChangeAddressDetail}
            defaultValue={data?.fetchBoard.boardAddress?.addressDetail ?? ""}
          />
        </B.InputWrapper>
        <B.InputWrapper>
          <B.Label>유튜브</B.Label>
          <B.Youtube
            placeholder="링크를 복사해주세요."
            onChange={onChangeYoutubeUrl}
            defaultValue={data?.fetchBoard.youtubeUrl ?? ""}
          />
        </B.InputWrapper>
        <B.ImageWrapper>
          <B.Label>사진첨부</B.Label>
          <B.UploadButton>
            {fileUrls.map((el, index) => (
              <Uploads01
                key={uuidv4()}
                index={index}
                fileUrl={el}
                onChangeFileUrls={onChangeFileUrls}
              />
            ))}
          </B.UploadButton>
        </B.ImageWrapper>
        <B.OptionWrapper>
          <B.Label>메인설정</B.Label>
          <B.RadioButton type="radio" id="youtube" name="radio-button" />
          <B.RadioLabel htmlFor="youtube">유튜브</B.RadioLabel>
          <B.RadioButton type="radio" id="image" name="radio-button" />
          <B.RadioLabel htmlFor="image">사진</B.RadioLabel>
        </B.OptionWrapper>
        <B.ButtonWrapper>
          <B.SubmitButton
            onClick={props.isEdit ? onClickUpdate : onClickSubmit}
            Active={props.isEdit ? true : Active}
          >
            {props.isEdit ? "수정하기" : "등록하기"}
          </B.SubmitButton>
          <B.CancelButton onClick={onClickCancel}>취소하기</B.CancelButton>
        </B.ButtonWrapper>
      </B.Wrapper>
    </div>
  );
}
