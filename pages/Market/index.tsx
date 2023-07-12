import { useAuth } from "../../src/commons/hooks/customs/useAuth";
import MarketList from "../../src/components/units/market/list/MarketList.index";

export default function GraphqlMutationPage() {
  useAuth();
  return (
    <div>
      <MarketList />
    </div>
  );
}
