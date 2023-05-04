import type { UseFormRegisterReturn } from "react-hook-form";
import * as B from "../styles/04";

interface IInputProps {
  type?: "text" | "password";
  register: UseFormRegisterReturn;
}

export default function Input02(props: IInputProps): JSX.Element {
  return (
    <B.Input03
      placeholder={props.title ?? "입력해 주세요."}
      // value={props.answer ?? ""}
      type={props.type ?? "text"}
      defaultValue={props.defaultValue ?? ""}
      {...props.register}
    />
  );
}
