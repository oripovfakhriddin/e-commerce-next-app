"use client"

import useLatestProductsStore from "@/store/public/latest-products"
import { useEffect } from "react";
import "./style.scss"
import Slider from "react-slick";
import SampleNextArrow from "@/components/shares/sample-next-arrow";
import SamplePrevArrow from "@/components/shares/sample-prev-arrow";
import PublicProductsCard from "@/components/cards/public/products";
const ProductLatest = () => {

  const { latestProducts, loading: latestProductLoading, getLatestProducts } = useLatestProductsStore();

  useEffect(() => { getLatestProducts() }, [getLatestProducts])

  const settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    speed: 3000,
    infinite: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    centerPadding: "60px",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="container product__latest">
      <Slider {...settings}>
        {latestProducts?.map((pr, index) => <div key={index}><PublicProductsCard data={pr} loading={latestProductLoading} /></div>)}
      </Slider>
    </div>
  )
}

export default ProductLatest;