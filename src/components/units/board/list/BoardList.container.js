import { useState } from 'react'
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { FETCH_BOARDS, DELETE_BOARD } from './BoardList.queries'
import BoardListUI from "./BoardList.presenter"

export default function StaticRoutingPage() {
    const { data } = useQuery(FETCH_BOARDS)
    const [deleteBoard] = useMutation(DELETE_BOARD)

    console.log(data)

    const onClickDelete = (event) => {
        deleteBoard({
            variables: { boardId: event.target.id },
            refetchQueries: [{ query: FETCH_BOARDS }]
        })
        console.log(event.target.i)
    }

    return (
        <>
            <BoardListUI
                onClickDelete={onClickDelete}
                data={data}
            />
        </>
    )


}