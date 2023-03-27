import { useState } from 'react'
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { CREATE_BOARD_COMMENT, FETCH_BOARD_COMMENTS, DELETE_BOARD_COMMENTS } from './BoardComment.queries'
import BoardCommentUI from "./BoardComment.presenter";

export default function BoardDetail() {
    const router = useRouter()

    const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT)
    const { data } = useQuery(FETCH_BOARD_COMMENTS, {
        variables: { boardId: router.query.boardId },
    });
    const [deleteBoardComment] = useMutation(DELETE_BOARD_COMMENTS)

    const [writer, setWriter] = useState("");
    const [password, setPassword] = useState("");
    const [contents, setContents] = useState("");



    const onChangeWriter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWriter(event.target.value);

    };

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);

    };

    const onChangeContents = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContents(event.target.value);
        console.log(contents.length)
    };

    // const onChangeContentsNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setContents((event.target.value).length);
    // };


    const onClickSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
                    query: FETCH_BOARD_COMMENTS,
                    variables: { boardId: router.query.boardId }
                }]
            })
            // router.push(`/Board/${result.data.createBoardComment._id}`)
        } catch (error) {
            if(error instanceof Error) alert(error.message)
        }
        setWriter("");
        setPassword("");
        setContents("")

    };

    const onClickDelete = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = prompt("비밀번호를 입력하세요.")

        try{
        if(!(event.target instanceof HTMLImageElement)) {
            alert("시스템에 문제가 있습니다.")
            return;
          }
        
        console.log(event.target)
        deleteBoardComment({
            variables: { 
                password,
                boardCommentId: event.target.id
             },
             refetchQueries: [{
                query: FETCH_BOARD_COMMENTS,
                variables: { boardId: router.query.boardId }
            }]
        })
    }catch (error){
        if(error instanceof Error) alert(error.message)
    }
    }



    return (
        <BoardCommentUI
            data={data}
            writer={writer}
            password={password}
            contents={contents}
            onClickSubmit={onClickSubmit}
            onChangeWriter={onChangeWriter}
            onChangePassword={onChangePassword}
            onChangeContents={onChangeContents}
            onClickDelete={onClickDelete}
        // onChangeContentsNumber={onChangeContentsNumber}
        />
    )
}

