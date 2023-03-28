import { ChangeEvent, useState, useRef } from "react";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { CREATE_BOARD, UPDATE_BOARD, FETCH_BOARD } from "./BoardWrite.queries";
import BoardWriteUI from "./BoardWrite.presenter";
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUpdateBoardArgs,
} from "../../../../commons/types/generated/types";
import { IBoardWriteProps, myVariables } from "./Boardwrite.types";
import { Button, Modal, Space } from "antd";

export default function BoardsNewPage(props: IBoardWriteProps) {
  const router = useRouter();
  const [Active, setIsActive] = useState(false);

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [writerError, setWriterError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentsError, setContentsError] = useState("");

  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);
  const [updateBoard] = useMutation<
    Pick<IMutation, "updateBoard">,
    IMutationUpdateBoardArgs
  >(UPDATE_BOARD);

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

  const inputRef = useRef<HTMLInputElement>(null);

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
            },
          },
        });
        router.push(`/Board/${result.data?.createBoard._id}`);
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    }
  };

  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: router.query.boardId },
  });

  const onClickUpdate = async () => {
    try {
      const myVariables: myVariables = {};
      myVariables.updateBoardInput = {};
      if (contents !== "") myVariables.contents = contents;
      if (title !== "") {
        myVariables.updateBoardInput.title = title;
      }
      if (contents !== "") {
        myVariables.updateBoardInput.contents = contents;
      }
      myVariables.password = myVariables.password = password;
      myVariables.boardId = router.query.boardId;
      const result = await updateBoard({
        variables: myVariables,
      });
      router.push(`/Board/${result.data?.updateBoard._id}`);
    } catch (error) {
      if (error instanceof Error)
        Modal.error({
          title: "비밀번호 오류",
          content: "비밀번호를 확인해주세요.",
        });
    }
  };

  // const onClickUpdate = async () => {
  //     try {
  //         console.log(router.query.boardId)
  //         const result = await updateBoard({
  //             variables: {
  //                 updateBoardInput: {
  //                     title,
  //                     contents,
  //                 }, password,
  //                 boardId: router.query.boardId
  //             }
  //         })
  //         router.push(`/Board/${result.data.updateBoard._id}`)
  //     } catch (error) {
  //         alert(error.message)
  //     }
  // }

  const onClickCancel = async () => {
    router.push(`/Board`);
  };

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
        writerError={writerError}
        passwordError={passwordError}
        titleError={titleError}
        contentsError={contentsError}
        Active={Active}
        isEdit={props.isEdit}
        data={data}
        inputRef={inputRef}
      />
    </div>
  );
}
