import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from 'react'
import { FETCH_BOARD } from './BoardDetail.queries'
import BoardDetailUI from "./BoardDetail.presenter"



export default function BoardDetailPage() {
    const router = useRouter()

    const { data } = useQuery(FETCH_BOARD, {
        variables: { boardId: router.query.boardId },
    });

    return (
        <div>
            <BoardDetailUI
                aaa={data}
            />
        </div>
    );
}
