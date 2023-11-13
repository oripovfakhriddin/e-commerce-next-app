"use client"

import PublicProductsCard from '@/components/cards/public/products'
import useFavouriteStore from '@/store/public/favourite'
import React from 'react'
import "./style.scss"

const PublicFavouriteList = () => {
  const { data: favouriteData } = useFavouriteStore()
  return (
    <div className='favourite__row'>
      {favouriteData?.map((pr, index) => <div key={index}><PublicProductsCard data={pr} /></div>)}
    </div>
  )
}

export default PublicFavouriteList