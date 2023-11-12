import Category from '@/types/category'
import Image from 'next/image'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import React from 'react'
import useCategoryState from '@/store/public/category';

import "./style.scss"

const PublicCategoryCard = ({ _id, name, image }: Category) => {

  const { loading } = useCategoryState()

  return (
    <div className='category__card__container'>
      <Box key={_id} >
        <div className='card__image__box'>
          {loading ? (
            <Skeleton variant="rectangular" style={{ width: "100%", height: "100%" }} />
          ) : (
            <Image priority={loading} src={image.url} alt={name} fill />
          )}
        </div>
        <div className='category__card__content__box'>
          {loading ? (
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          ) : (
            <Box sx={{ pr: 2 }}>
              <h3>{name}</h3>
            </Box>
          )}
        </div>
      </Box>
    </div>
  )
}

export default PublicCategoryCard;