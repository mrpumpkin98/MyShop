import { Button } from "antd";
import * as B from "../styles/03";

interface IButtonProps {
  isActive: boolean;
  title: string;
}

export default function Button03(props: IButtonProps): JSX.Element {
  return (
    <B.Button03 style={{ backgroundColor: props.isActive ? "gold" : "" }}>
      {props.title}
    </B.Button03>
  );
}
