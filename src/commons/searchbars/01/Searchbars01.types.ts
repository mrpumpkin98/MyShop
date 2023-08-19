import type { ApolloQueryResult } from "@apollo/client";
import type { ChangeEvent } from "react";
import {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from "../../types/generated/types";

export interface ISearchbars01Props {
  refetch: (
    variables: Partial<IQueryFetchBoardsArgs>
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>;
  refetchBoardsCount: (
    variables: Partial<IQueryFetchBoardsCountArgs>
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoardsCount">>>;
  onChangeKeyword: (value: string) => void;
}

export interface ISearchbars01UIProps {
  onChangeSearchbar: (event: ChangeEvent<HTMLInputElement>) => void;
}
