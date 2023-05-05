import { gql } from "@apollo/client";

export const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      _id
      email
      name
      userPoint {
        amount
      }
    }
  }
`;

export const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
  mutation createPointTransactionOfLoading($impUid: ID!) {
    createPointTransactionOfLoading(impUid: $impUid) {
      _id
      impUid
      amount
    }
  }
`;

export const FETCH_POINT_TRANSACTION_COUNT_OF_LOADING = gql`
  query {
    fetchPointTransactionsCountOfLoading
  }
`;

export const FETCH_POINT_TRANSACTION_OF_LOADING = gql`
  query {
    fetchPointTransactionsOfLoading {
      _id
      amount
    }
  }
`;

export const FETCH_POINT_TRANSACTION_OF_SELLING = gql`
  query {
    fetchPointTransactionsOfSelling {
      _id
      amount
    }
  }
`;

export const FETCH_POINT_TRANSACTION_OF_BUYING = gql`
  query {
    fetchPointTransactionsOfBuying {
      _id
      amount
    }
  }
`;

export const FETCH_POINT_TRANSACTION = gql`
  query {
    fetchPointTransactions(page: 1) {
      _id
      amount
    }
  }
`;
