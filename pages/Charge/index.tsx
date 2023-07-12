import { useAuth } from "../../src/commons/hooks/customs/useAuth";
import ChargeIndex from "../../src/components/units/charge/charge.index";

export default function ChargePage(): JSX.Element {
  useAuth();
  return (
    <div>
      <ChargeIndex />
    </div>
  );
}
