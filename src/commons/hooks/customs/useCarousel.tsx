export const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true, // 화살표 비활성화
  autoplay: true, // 자동 재생 활성화
  autoplaySpeed: 2000, // 자동 재생 속도 (5초마다 슬라이드 변경)
  customPaging: (i: number) => (
    <div
      style={{
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: i === 0 ? "#fff" : "#888",
        marginLeft: "8px",
        transition: "background-color 0.3s ease",
      }}
    />
  ), // 커스텀 도트 스타일
};
