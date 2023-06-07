import * as B from "../styles/01";

interface IButtonProps {
  title: string;
}

export default function Button01(props: IButtonProps): JSX.Element {
  return <B.Button01>{props.title}</B.Button01>;
}
