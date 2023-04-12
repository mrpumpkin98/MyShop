import { ChangeEvent, useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  CREATE_BOARD,
  UPDATE_BOARD,
  FETCH_BOARD,
  UPLOAD_FILE,
} from "./BoardWrite.queries";
import BoardWriteUI from "./BoardWrite.presenter";
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUpdateBoardArgs,
} from "../../../../commons/types/generated/types";
import { IBoardWriteProps, myVariables } from "./Boardwrite.types";
import { Button, Modal, Space } from "antd";
import type { Address } from "react-daum-postcode";
import { checkValidationFile } from "../../../../commons/libraries/utils";

export default function BoardsNewPage(props: IBoardWriteProps) {
  ///////////////////////////////////////////////////////////////
  // router
  //////////////////////////////////////////////////////////////

  const router = useRouter();

  ///////////////////////////////////////////////////////////////
  // useState
  //////////////////////////////////////////////////////////////

  const [Active, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [fileUrls, setFileUrls] = useState(["", "", ""]);

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

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
    if (event.target.value !== "") {
      setContentsError("");
    }

    if (writer && password && title && event.target.value) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
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
    const defaultFiles = JSON.stringify(props.data?.fetchBoard.images);
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
    const updateBoardInput: IUpdateBoardInput = {};
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
      void router.push(`/Board/${result.data?.updateBoard._id}`);
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
    const images = props.data?.fetchBoard.images;
    if (images !== undefined && images !== null) setFileUrls([...images]);
  }, [props.data]);

  return (
    <div>
      <BoardWriteUI
        onClickSubmit={onClickSubmit}
        onClickUpdate={onClickUpdate}
        onChangeWriter={onChangeWriter}
        onChangePassword={onChangePassword}
        onChangeTitle={onChangeTitle}
        onChangeContents={onChangeContents}
        onClickCancel={onClickCancel}
        onClickAddressSearch={onClickAddressSearch}
        onChangeAddressDetail={onChangeAddressDetail}
        onCompleteAddressSearch={onCompleteAddressSearch}
        writerError={writerError}
        passwordError={passwordError}
        titleError={titleError}
        contentsError={contentsError}
        Active={Active}
        isEdit={props.isEdit}
        data={data}
        inputRef={inputRef}
        isOpen={isOpen}
        zipcode={zipcode}
        address={address}
        Ok={Ok}
        Cancel={Cancel}
        onChangeYoutubeUrl={onChangeYoutubeUrl}
        fileRef={fileRef}
        onChangeFileUrls={onChangeFileUrls}
        fileUrls={fileUrls}
      />
    </div>
  );
}
