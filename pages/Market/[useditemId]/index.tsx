import MarketDetail from "../../../src/components/units/market/detail/MarketDetail.index";
import { useAuth } from "../../../src/commons/hooks/customs/useAuth";

export default function GraphqlMutationPage() {
  useAuth();
  return (
    <div>
      <MarketDetail />
    </div>
  );
}
