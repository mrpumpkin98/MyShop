import { Button } from "antd";
import * as B from "../styles/02";

interface IButtonProps {
  isActive: boolean;
  title: string;
}

export default function Button02(props: IButtonProps): JSX.Element {
  return (
    <B.Button02 style={{ backgroundColor: props.isActive ? "gold" : "" }}>
      {props.title}
    </B.Button02>
  );
}
