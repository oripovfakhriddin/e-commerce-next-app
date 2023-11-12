"use client"

import React, { useEffect, Fragment, useRef } from 'react'
import useCategoryState from '@/store/public/category'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Autoplay, Navigation } from 'swiper/modules';

import "./style.scss"
import PublicCategoryCard from '@/components/cards/public/category'

const CategoryList = () => {
  const { getCategory, loading, data } = useCategoryState()

  useEffect(() => { getCategory() }, [])
  
  return (
    <Fragment>
      <div className="container">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="category__list__swiper"
        >
          {data?.map((el) => {
            return <SwiperSlide className="category__card__box" key={el._id}>
              <PublicCategoryCard  {...el} />
            </SwiperSlide>
          })}
        </Swiper>
      </div>
    </Fragment>
  )
}

export default CategoryList