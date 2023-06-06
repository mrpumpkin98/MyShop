import { gql } from "@apollo/client";

export const FETCH_POINT_TRANSACTION_OF_BUYING = gql`
  query {
    fetchPointTransactionsOfBuying {
      _id
      amount
      impUid
      balance
      status
      statusDetail
      useditem {
        _id
        name
        remarks
        contents
        price
        tags
        images
        pickedCount
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
