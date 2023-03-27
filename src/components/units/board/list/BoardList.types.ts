import { MouseEvent } from "react"
import { IQuery } from "../../../../commons/types/generated/types"

export interface IBoardListUIProps {
    data?: Pick<IQuery, "fetchBoards">
    onClickWrite: () => void
    onClickSubmit: (event: MouseEvent<HTMLDivElement>) => void
    onClickDelete: any
}