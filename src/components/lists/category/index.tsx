"use client"

import React, { useEffect, Fragment } from 'react'
import useCategoryState from '@/store/public/category'
import { Swiper, SwiperSlide } from 'swiper/react';

import "./style.scss"
import PublicCategoryCard from '@/components/cards/public/category'

const CategoryList = () => {
  const { getCategory, loading, data } = useCategoryState()

  useEffect(() => { getCategory() }, [])

  return (
    <Fragment>
      <div className="container">
        <Swiper
          spaceBetween={50}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => (swiper)}
          breakpoints={{
            // when window width is >= 640px
            640: {
              width: 640,
              slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
              width: 768,
              slidesPerView: 2,
            },
            900: {
              width: 1200,
              slidesPerView: 3,
            },
            1200: {
              width: 1200,
              slidesPerView: 4,
            },
          }}
        >
          {data?.map((el) => {
            return <SwiperSlide key={el._id}>
              <PublicCategoryCard  {...el}  />
            </SwiperSlide>
          })}
        </Swiper>
      </div>
    </Fragment>
  )
}

export default CategoryList