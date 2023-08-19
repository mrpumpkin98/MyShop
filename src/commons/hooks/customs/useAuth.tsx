import { useRouter } from "next/router";
import { useEffect } from "react";
import { Modal } from "antd"; // 추가

export const useAuth = () => {
  const router = useRouter();

  // 로그인 체크
  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      // 여기서 Modal로 로그인 알림을 표시합니다.
      Modal.warning({
        title: "알림",
        content: "로그인 후 이용 가능합니다.",
        onOk: () => void router.push("/Login"),
      });
    }
  }, []);
};
