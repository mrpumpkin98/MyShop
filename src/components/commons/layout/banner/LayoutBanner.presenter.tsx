import { SliderItem, Wrapper } from "./LayoutBanner.styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function LayoutBannerUI(): JSX.Element {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Wrapper>
      <Slider {...settings}>
        <div>
          <SliderItem
            src="/images/Banner_1.png"
            onDoubleClick={() => window.open("https://github.com/mrpumpkin98")}
          />
        </div>
        <div>
          <SliderItem
            src="/images/Banner_2.png"
            onDoubleClick={() => window.open("https://velog.io/@sju4486")}
          />
        </div>
      </Slider>
    </Wrapper>
  );
}
