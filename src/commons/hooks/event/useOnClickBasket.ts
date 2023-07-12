export const useOnClickBasket = () => {
  const onClickBasket = (basket: any) => () => {
    // 1. 기존 장바구니 가져오기
    const baskets = JSON.parse(localStorage.getItem("baskets") ?? "[]");

    const temp = baskets.filter((el: any) => el._id === basket._id);
    if (temp.length >= 1) {
      alert("이미 담으신 상품입니다!!!");
      return;
    } else {
      alert("장바구니에 상품이 담겼습니다.");
    }

    // 2. 내가 클릭한거 장바구니에 추가하기
    baskets.push(basket);
    localStorage.setItem("baskets", JSON.stringify(baskets));
  };
  return {
    onClickBasket,
  };
};
