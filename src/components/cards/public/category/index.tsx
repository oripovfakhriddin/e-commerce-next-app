import Category from '@/types/category'
import Image from 'next/image'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import React from 'react'
import useCategoryState from '@/store/public/category';

import "./style.scss"
import Link from 'next/link';

const PublicCategoryCard = ({ data, loading }: { data: Category } & { loading: boolean }) => {

  return (
    <Link style={{ width: "100%" }} href={data?._id}>
      <div className='category__card__container'>
        <div className="category__card__image__box">
          {loading ? <Skeleton className="category__card__skleton" variant="rectangular" /> : <Image src={data?.image?.url} alt={data?.name} fill />}
        </div>
        <div className="category__card__content__box">
          {loading ? <Skeleton className="category__text__skleton" /> : <h3>{data?.name}</h3>}
        </div>
      </div>
    </Link>
  )
}

export default PublicCategoryCard;