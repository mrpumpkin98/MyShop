import { ChangeEvent, useState } from "react";
import _ from "lodash";

export const useSearch = (args: any) => {
  const [keyword, setKeyword] = useState("");

  const onChangeKeyword = (value: string) => {
    setKeyword(value);
  };

  const getDebounce = _.debounce((value: string) => {
    void args.refetch({ search: value, page: 1 });
    void args.refetchCount({ search: value });
    onChangeKeyword(value);
  }, 1000);

  const onChangeSearchbar = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value);
  };

  return {
    keyword,
    onChangeKeyword,
    onChangeSearchbar,
  };
};
