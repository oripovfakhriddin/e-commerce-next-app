"use client"

import React, { useEffect, Fragment, useRef } from 'react'
import useCategoryState from '@/store/public/category'
import Carousel from 'react-multi-carousel';

import "./style.scss"
import PublicCategoryCard from '@/components/cards/public/category'

const CategoryList = () => {
  const { getData: getCategory, loading, data: categoryData } = useCategoryState()

  useEffect(() => { getCategory() }, [getCategory])

  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1200
      },
      items: 4,
      partialVisibilityGutter: 40
    },
    smallDesktop: {
      breakpoint: {
        max: 1200,
        min: 850
      },
      items: 3,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: {
        max: 850,
        min: 520
      },
      items: 2,
      partialVisibilityGutter: 30
    },
    mobile: {
      breakpoint: {
        max: 520,
        min: 0
      },
      items: 1,
      partialVisibilityGutter: 30
    },
  }

  return (
    <Fragment>
      <div className='container'>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlay
          autoPlaySpeed={5000}
          centerMode={false}
          className="ul__multi"
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          responsive={responsive}
          itemClass="item__category__card"
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={4}
          swipeable
        >
          {categoryData?.map((category, i) => <PublicCategoryCard key={i} data={category} loading={loading} />)}
        </Carousel>
      </div>
    </Fragment>
  )
}
export default CategoryList