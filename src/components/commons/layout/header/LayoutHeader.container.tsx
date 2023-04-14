import { useRouter } from "next/router";
import LayoutHeaderUI from "./LayoutHeader.presenter";

export default function LayoutHeader(): JSX.Element {
  const router = useRouter();

  const onClickLogo = (): void => {
    void router.push("/Board");
  };

  const onClickMoveToLogin = (): void => {
    void router.push("/Login");
  };

  const onClickMoveToSingUp = (): void => {
    void router.push("/Login/SignUp");
  };

  return (
    <LayoutHeaderUI
      onClickLogo={onClickLogo}
      onClickMoveToSingUp={onClickMoveToSingUp}
      onClickMoveToLogin={onClickMoveToLogin}
    />
  );
}
