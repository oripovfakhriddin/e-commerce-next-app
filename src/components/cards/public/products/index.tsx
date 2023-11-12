import React from 'react'
import Image from 'next/image'
import Products from '@/types/products'

import "./style.scss"
import { Button } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import useFavouriteStore from '@/store/public/favourite'

const PublicProductsCard = ({ data }: { data: Products }) => {
  const { data: favouriteData, addToFavourite } = useFavouriteStore()
  const toggle = favouriteData?.find((el)=>el?._id === data?._id)
  return (
    <div className='card__box__container'>
      <div className='product__image__box'>
        <Image src={data?.image?.url ? data?.image?.url : "https://c8.alamy.com/comp/2ATEFRH/mission-failed-text-on-red-round-stamp-2ATEFRH.jpg"} alt={data?.title ? data?.title : "Ma'lumot topilmadi!"} fill />
      </div>
      <div className="product__content__box">
        <h3>{data?.title ? data?.title : "Ma'lumot topilmadi!"}</h3>
        <div>
          <p>Mahsulot soni: </p>
          <p>{data?.quantity > 0 ? <span style={{ color: 'orange' }}>{data?.quantity} dona</span> : <span style={{ color: "red" }}>Qolmagan</span>}</p>
        </div>
        <div>
          <p>Narxi: </p>
          <p>{data?.price > 0 ? <span style={{ color: 'orange' }}>{data?.price} UZS</span> : <span style={{ color: "red" }}>Ma'lumot topilmadi</span>}</p>
        </div>
        <p>{data?.description ? data?.description : <span style={{ color: "red" }}>Ma'lumot topilmadi</span>}</p>
      </div>
      <div className="product__action__box">
        <div><button className='more'>Ko'proq...</button></div>
        <div><button className='add__cart'>Savatga qo'shish</button></div>
      </div>
      <div className='favourite__button__box'>
        <button onClick={() => { addToFavourite(data) }}>
          {toggle ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </button>
      </div>
    </div>
  )
}

export default PublicProductsCard