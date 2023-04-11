//####################################################################
//
// BOARD_EDIT MAIN
//
//####################################################################

import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import BoardEdit from "../../../../src/components/units/board/write/BoardWrite.container";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      boardAddress {
        zipcode
        address
        addressDetail
      }
      images
    }
  }
`;

export default function GraphqlMutationPage() {
  const router = useRouter();
  if (typeof router.query.boardId !== "string") return <></>;

  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    { variables: { boardId: router.query.boardId } }
  );
  return (
    <div>
      <BoardEdit isEdit={true} data={data} />
    </div>
  );
}
