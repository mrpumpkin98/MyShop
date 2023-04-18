import { useState } from "react";

export const usePagination = (args: any) => {
  const [startPage, setStartPage] = useState(1);
  const lastPage = args.count ? Math.ceil(args.count / 10) : 0;

  const onClickPage = (page: number) => () => {
    void args.refetch({ page });
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage(startPage - 10);
    void args.refetch({ page: startPage - 10 });
  };

  const onClickNextPage = () => {
    if (startPage + 10 <= lastPage) {
      setStartPage(startPage + 10);
      void args.refetch({ page: startPage + 10 });
    }
  };

  return {
    startPage,
    lastPage,
    onClickPage,
    onClickPrevPage,
    onClickNextPage,
  };
};
