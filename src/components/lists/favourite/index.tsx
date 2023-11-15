"use client"

import PublicProductsCard from '@/components/cards/public/products'
import useFavouriteStore from '@/store/public/favourite'
import React from 'react'
import "./style.scss"

const PublicFavouriteList = () => {
  const { loading: favouriteLoading, data: favouriteData } = useFavouriteStore()

  if (!favouriteData) {
    return <p>Loading...</p>;
  }

  return (
    <div className='favourite__row'>
      {favouriteData?.map((pr, index) => <div key={index}><PublicProductsCard data={pr} loading={favouriteLoading} /></div>)}
    </div>
  )
}

export default PublicFavouriteList