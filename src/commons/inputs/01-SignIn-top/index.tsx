import type { UseFormRegisterReturn } from "react-hook-form";
import * as B from "../styles/01";

interface IInputProps {
  type?: "text" | "password";
  register: UseFormRegisterReturn;
  title: any;
}

export default function Input01(props: IInputProps): JSX.Element {
  return (
    <B.Input01
      placeholder={props.title ?? "입력해 주세요."}
      type={props.type ?? "text"}
      {...props.register}
    />
  );
}
