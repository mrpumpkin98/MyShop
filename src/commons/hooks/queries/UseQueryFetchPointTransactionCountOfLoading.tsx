import { gql } from "@apollo/client";

export const FETCH_POINT_TRANSACTION_COUNT_OF_LOADING = gql`
  query {
    fetchPointTransactionsCountOfLoading
  }
`;
