import { gql } from "@apollo/client";

export const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount($search: String) {
    fetchBoardsCount(search: $search)
  }
`;

export const FETCH_BOARDS_OF_THE_BEST = gql`
  query fetchBoardsOfTheBest {
    fetchBoardsOfTheBest {
      _id
      writer
      title
      likeCount
      createdAt
      images
    }
  }
`;

///////////////////////////////////////////////////////////////
//  마이페이지
//////////////////////////////////////////////////////////////

export const FETCH_USED_ITEMS_I_SOLD = gql`
  query fetchUseditemsISold {
    fetchUseditemsISold {
      _id
      name
      price
      createdAt
    }
  }
`;

export const FETCH_USED_ITEMS_I_PICKED = gql`
  query fetchUseditemsIPicked {
    fetchUseditemsIPicked {
      _id
      name
      price
      seller {
        _id
        name
      }
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
      createdAt
      impUid
      amount
      balance
    }
  }
`;

export const FETCH_POINT_TRANSACTION_OF_SELLING = gql`
  query {
    fetchPointTransactionsOfSelling {
      _id
      createdAt
      amount
      useditem {
        name
        soldAt
      }
      balance
    }
  }
`;

export const FETCH_POINT_TRANSACTION_OF_BUYING = gql`
  query {
    fetchPointTransactionsOfBuying {
      _id
      createdAt
      amount
      # name
      balance
      useditem {
        name
        # seller {
        #   name
        # }
      }
    }
  }
`;

export const FETCH_POINT_TRANSACTION = gql`
  query {
    fetchPointTransactions {
      _id
      balance
      createdAt
      status
      amount
    }
  }
`;
