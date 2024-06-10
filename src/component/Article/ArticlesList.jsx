/* eslint-disable react/prop-types */
import articlesData from "../../data/articlesData.json";
import Slider from "react-slick";
import ArticleItem from "./ArticleItem";
import { LuLeaf } from "react-icons/lu";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <LuLeaf
      className={className}
      style={{ ...style, display: "block", color: "green", fontSize: "24px" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <LuLeaf
      className={className}
      style={{
        ...style,
        display: "block",
        color: "green",
        fontSize: "24px",
        transform: "scaleX(-1)",
      }}
      onClick={onClick}
    />
  );
}

export default function ArticlesList() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {articlesData.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </Slider>
  );
}
