import { useState } from "react";
import { Modal } from "antd";

export const useOnClickBasket = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (message: string) => {
    setModalMessage(message);
    setIsModalVisible(true);
  };

  const onClickBasket = (basket: any) => () => {
    const baskets = JSON.parse(localStorage.getItem("baskets") ?? "[]");

    const temp = baskets.filter((el: any) => el._id === basket._id);
    if (temp.length >= 1) {
      showModal("이미 담으신 상품입니다!!!");
      return;
    } else {
      showModal("장바구니에 상품이 담겼습니다.");
    }

    baskets.push(basket);
    localStorage.setItem("baskets", JSON.stringify(baskets));
  };

  const modalComponent = (
    <Modal
      title="장바구니 알림"
      visible={isModalVisible}
      onOk={() => setIsModalVisible(false)}
      onCancel={() => setIsModalVisible(false)}
    >
      <p>{modalMessage}</p>
    </Modal>
  );

  return {
    onClickBasket,
    modalComponent,
  };
};
