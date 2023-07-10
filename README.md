💡 SecondHandMarket은 중고 상품을 거래하는 플랫폼입니다.

## 사용 스킬

- typescript, react, react-hooks, emotion, graphQL

## SignUp/Login

![Peek 2023-07-10 11-06](https://github.com/MadHeo/secondHandMarket/assets/114569429/e69ccc9f-bbe9-434e-b358-6e2d5b8cf53b)


- 로그인은 react-hook-form 라이브러리를 사용하여 input 입력 시 발생하는 리렌더링을 줄였습니다.
- 전역상태관리 라이브러리 Recoil을 사용해 accessToken을 관리합니다.
- useAuth 함수에 accessToken을 확인하는 로직을 만들어 권한분기를 구현했습니다.

## Products List / Comment / Purchase

![Peek 2023-07-10 11-31](https://github.com/MadHeo/secondHandMarket/assets/114569429/bb3ac8f5-7668-459b-a1a7-ad64db96b570)


- 댓글 작성과 수정 시 apolloClient에서 제공하는 기능인 refetchQueries를 사용해서 즉각적으로 반영되도록 구현했습니다.
- 지도는 카카오 지도 API를 사용했습니다.

## Point Charge

![Peek 2023-07-10 11-35](https://github.com/MadHeo/secondHandMarket/assets/114569429/449e3ab7-6bcb-4095-9e79-7ae218b00fb5)


- 포인트 충전은 카카오페이 API를 활용해서 구현했습니다.
- 충전할 경우 충전금액만큼 value로 받아 createPoint API에 요청합니다.

## Shopping basket / Product viewed today

![Peek 2023-07-10 11-42](https://github.com/MadHeo/secondHandMarket/assets/114569429/f9344e8e-64fc-465c-80c1-fd04171b21d9)


- 장바구니와 오늘 본 상품에 관한 API가 따로 존재하지 않아 Local Storage에 데이터를 담고 불러오는 방식으로 기능을 구현했습니다.
- Product viewed today와 같은 Recoil 상태에 상태를 저장하고, 상품을 클릭할 때 해당 Recoil 상태를 업데이트하여 useEffect의 상태 값으로 사용하여 실시간으로 확인할 수 있도록 구현했습니다.


