import { gql, useMutation, useQuery } from "@apollo/client";

export const DIS_LIKE_BOARD = gql`
  mutation dislikeBoard($boardId: ID!) {
    dislikeBoard(boardId: $boardId)
  }
`;
