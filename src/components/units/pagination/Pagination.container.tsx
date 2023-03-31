import { useQuery, gql } from "@apollo/client";
import PaginationUI from "./Pagination.presenter";
import { useState } from "react";
import type { MouseEvent } from "react";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "./Pagination.queries";

export default function Pagination(props: any): JSX.Element {
  const [startPage, setStartPage] = useState(1); // 각 페이지의 시작페이지: 1, 11, 21, ...
  const [pageColor, setPageColor] = useState();

  const { data, refetch } = useQuery(FETCH_BOARDS);
  const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);

  const onClickCountUp = (): void => {};
  const onClickPrevPage = (): void => {
    if (startPage === 1) return;
    setStartPage(startPage - 3);
    void refetch({ page: startPage - 3 });
  };

  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

  const onClickNextPage = (): void => {
    if (startPage + 10 <= lastPage) {
      setStartPage(startPage + 3);
      void refetch({ page: startPage + 3 });
    }
  };

  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    void refetch({ page: Number(event.currentTarget.id) });
    setPageColor(Number(event.currentTarget.id));
  };

  return (
    <>
      <PaginationUI
        onClickPrevPage={onClickPrevPage}
        onClickNextPage={onClickNextPage}
        onClickPage={onClickPage}
        startPage={startPage}
        lastPage={lastPage}
      />
    </>
  );
}
