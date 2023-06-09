//####################################################################
//
// BOARD_EDIT MAIN
//
//####################################################################

import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import BoardEdit from "../../../../src/components/units/market/write/MarketWrite.index";

// const FETCH_USED_ITEM = gql`
//   query fetchUseditem($useditemId: ID!) {
//     fetchUseditem(useditemId: $useditemId) {
//       _id
//       name
//       remarks
//       contents
//       price
//       tags
//       images
//       createdAt
//       # seller
//       pickedCount
//       useditemAddress {
//         zipcode
//         address
//         addressDetail
//         lat
//         lng
//       }
//     }
//   }
// `;

export default function GraphqlMutationPage() {
  // const router = useRouter();
  // if (typeof router.query.boardId !== "string") return <></>;

  // const { data } = useQuery(FETCH_USED_ITEM, {
  //   variables: { useditemId: router.query.useditemId },
  // });
  return (
    <div>
      <BoardEdit isEdit={true} />
    </div>
  );
}
