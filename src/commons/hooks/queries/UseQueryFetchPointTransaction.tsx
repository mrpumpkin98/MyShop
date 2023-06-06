import { gql } from "@apollo/client";

export const FETCH_POINT_TRANSACTION = gql`
  query {
    fetchPointTransactions {
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
