//####################################################################
//
// MARKET_WRITE MAIN
//
//####################################################################

import { useAuth } from "../../../src/commons/hooks/customs/useAuth";
import MarketWrite from "../../../src/components/units/market/write/MarketWrite.index";

export default function GraphqlMutationPage() {
  useAuth();
  return (
    <div>
      <MarketWrite isEdit={false} />
    </div>
  );
}
