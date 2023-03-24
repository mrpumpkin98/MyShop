import { useState } from 'react'
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { CREATE_BOARD_COMMENT, FETCH_BOARD_COMMENT } from './BoardComment.queries'
import BoardCommentUI from "./BoardComment.presenter";

export default function BoardDetail() {
    const router = useRouter()

    const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT)

    const [writer, setWriter] = useState("");
    const [password, setPassword] = useState("");
    const [contents, setContents] = useState("");

    const { data } = useQuery(FETCH_BOARD_COMMENT, {
        variables: { boardId: router.query.boardId },
    });

    const onChangeWriter = (event) => {
        setWriter(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const onChangeContents = (event) => {
        setContents(event.target.value);
    };


    const onClickSubmit = async () => {
        try {
            const result = await createBoardComment({
                variables: {
                    createBoardCommentInput: {
                        writer,
                        password,
                        contents,
                        rating: 1
                    }, boardId: router.query.boardId

                }
                , refetchQueries: [{
                    query: FETCH_BOARD_COMMENT,
                    variables: { boardId: router.query.boardId }
                }]
            })
            console.log(result)
            // router.push(`/Board/${result.data.createBoardComment._id}`)
        } catch (error) {
            alert(error.message)
        }

    };


    return (
        <BoardCommentUI
            data={data}
            onClickSubmit={onClickSubmit}
            onChangeWriter={onChangeWriter}
            onChangePassword={onChangePassword}
            onChangeContents={onChangeContents}
        />
    )
}

