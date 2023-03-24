import { useState } from 'react'
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { FETCH_BOARDS, DELETE_BOARD } from './BoardList.queries'
import BoardListUI from "./BoardList.presenter"

export default function StaticRoutingPage() {
    const router = useRouter()
    const { data } = useQuery(FETCH_BOARDS)
    const [deleteBoard] = useMutation(DELETE_BOARD)

    console.log(deleteBoard)



    const onClickDelete = (event: React.ChangeEvent<HTMLInputElement>) => {
        deleteBoard({
            variables: { boardId: event.target.id },
            refetchQueries: [{ query: FETCH_BOARDS }]
        })
        console.log(event.target.id)
    }

    const onClickSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
        router.push(`/Board/${event.target.id}`);
    }

    const onClickWrite = () => {
        router.push(`/Board/Write`)
    }

    return (
        <>
            <BoardListUI
                onClickDelete={onClickDelete}
                onClickSubmit={onClickSubmit}
                onClickWrite={onClickWrite}
                data={data}
            />
        </>
    )


}