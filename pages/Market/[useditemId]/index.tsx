//####################################################################
//
// Market_DETAIL MAIN
//
//####################################################################

import MarketDetail from "../../../src/components/units/market/detail/BoardDetail.index";
import BoardComment from "../../../src/components/units/market/comment/BoardComment.container";
import BoardCommentList from "../../../src/components/units/market/commentlist/BoardCommentList.container";

export default function GraphqlMutationPage() {
  return (
    <div>
      <MarketDetail />
      {/* <BoardComment />
      <BoardCommentList /> */}
    </div>
  );
}
