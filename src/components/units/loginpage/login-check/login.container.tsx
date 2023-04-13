import { ChangeEvent, useState, useRef, useEffect } from "react";
import {} from "./login.queries";
import LoginUI from "./login.presenter";
import { useRouter } from "next/router";

export default function LoginNewPage(props): JSX.Element {
  const router = useRouter();

  const onClickLogo = (): void => {
    void router.push("/Board");
  };
  return (
    <div>
      <LoginUI onClickLogo={onClickLogo} />
    </div>
  );
}
