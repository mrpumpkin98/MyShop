import { useState } from 'react'
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { FETCH_BOARD, DELETE_BOARD } from './BoardDetail.queries'
import BoardDetailUI from "./BoardDetail.presenter"



export default function BoardDetailPage() {
    const router = useRouter()

    const [deleteBoard] = useMutation(DELETE_BOARD)

    const { data } = useQuery(FETCH_BOARD, {
        variables: { boardId: router.query.boardId },
    });

    const onClickDelete = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const result = await deleteBoard({
            variables: { boardId: router.query.boardId }
        })
        router.push(`/Board`)
    }

    const onClickBoard = () => {
        router.push(`/Board`)
    }

    const onClickUpdate = () => {
        router.push(`/Board/${router.query.boardId}/edit`)
    }


    return (
        <div>
            <BoardDetailUI
                data={data}
                onClickUpdate={onClickUpdate}
                onClickDelete={onClickDelete}
                onClickBoard={onClickBoard}
            />
        </div>
    );


}

