import Category from '@/types/category'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Image from 'next/image'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import React from 'react'
import useCategoryState from '@/store/public/category';

const PublicCategoryCard = ({ _id, name, image }: Category) => {

  const state = useCategoryState()
  console.log(state);

  const { loading } = state

  return (
    <div className='category__card__container'>
      <Box key={_id} className="category__card__box">
        {loading ? (
          <Skeleton variant="rectangular" width={210} height={118} />
        ) : (
          <div className='card__image__box'>
            <Image priority={loading} src={image.url} alt='salom' width={400} height={300} />
          </div>
        )}
        {loading ? (
          <Box sx={{ pt: 0.5 }}>
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        ) : (
          <Box sx={{ pr: 2 }}>
            <Typography gutterBottom variant="body2">
              {name}
            </Typography>
          </Box>
        )}
      </Box>
    </div>
  )
}

export default PublicCategoryCard