import type { UseFormRegisterReturn } from "react-hook-form";
import * as B from "../styles/05";

interface IInputProps {
  type?: "text" | "password";
  register: UseFormRegisterReturn;
}

export default function Input05(props: IInputProps): JSX.Element {
  return (
    <B.Input05
      placeholder={props.title ?? "입력해 주세요."}
      readOnly
      value={props.answer ?? ""}
      type={props.type ?? "text"}
      defaultValue={props.defaultValue ?? ""}
      {...props.register}
    />
  );
}
