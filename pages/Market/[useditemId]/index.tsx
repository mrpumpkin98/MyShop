//####################################################################
//
// Market_DETAIL MAIN
//
//####################################################################

import MarketDetail from "../../../src/components/units/market/detail/BoardDetail.index";
import BoardComment from "../../../src/components/units/market/comment/BoardComment.container";
import BoardCommentList from "../../../src/components/units/market/commentlist/BoardCommentList.container";
import { useAuth } from "../../../src/commons/hooks/customs/useAuth";

export default function GraphqlMutationPage() {
  useAuth();
  return (
    <div>
      <MarketDetail />
      {/* <BoardComment />
      <BoardCommentList /> */}
    </div>
  );
}
