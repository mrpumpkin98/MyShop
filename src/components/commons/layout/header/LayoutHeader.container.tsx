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

  return (
    <LayoutHeaderUI
      onClickLogo={onClickLogo}
      onClickMoveToLogin={onClickMoveToLogin}
    />
  );
}
