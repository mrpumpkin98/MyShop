import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from "next/router";
import { CREATE_BOARD, UPDATE_BOARD } from './BoardWrite.queries'
import BoardWriteUI from "./BoardWrite.presenter"

export default function BoardsNewPage(props) {
    const router = useRouter()

    const [writer, setWriter] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");

    const [writerError, setWriterError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [titleError, setTitleError] = useState("");
    const [contentsError, setContentsError] = useState("");

    const [createBoard] = useMutation(CREATE_BOARD)
    const [updateBoard] = useMutation(UPDATE_BOARD)

    const onChangeWriter = (event) => {
        setWriter(event.target.value);
        if (event.target.value !== "") {
            setWriterError("")
        }
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
        if (event.target.value !== "") {
            setPasswordError("")
        }
    };

    const onChangeTitle = (event) => {
        setTitle(event.target.value);
        if (event.target.value !== "") {
            setTitleError("")
        }
    };

    const onChangeContents = (event) => {
        setContents(event.target.value);
        if (event.target.value !== "") {
            setContentsError("")
        }
    };

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
        if (writer && password && title && contents) {
            try {
                const result = await createBoard({
                    variables: {
                        createBoardInput: {
                            writer,
                            password,
                            title,
                            contents
                        }
                    }
                })
                console.log(result)
                router.push(`/Board/${result.data.createBoard._id}`)
            } catch (error) {
                alert(error.message)
            }
        }
    };

    const onClickUpdate = async () => {
        try {
            console.log(router.query.boardId)
            const result = await updateBoard({
                variables: {
                    updateBoardInput: {
                        title,
                        contents,
                    }, password,
                    boardId: router.query.boardId
                }
            })
            router.push(`/Board/${result.data.updateBoard._id}`)
        } catch (error) {
            alert(error.message)
        }
    }


    return (
        <div>
            <BoardWriteUI
                onClickSubmit={onClickSubmit}
                onClickUpdate={onClickUpdate}
                onChangeWriter={onChangeWriter}
                onChangePassword={onChangePassword}
                onChangeTitle={onChangeTitle}
                onChangeContents={onChangeContents}
                writerError={writerError}
                passwordError={passwordError}
                titleError={titleError}
                contentsError={contentsError}
                isEdit={props.isEdit}
            />
        </div>
    );
}
