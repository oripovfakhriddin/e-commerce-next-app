"use client"

import useCartStore from '@/store/public/cart'
import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material';

import "./style.scss"

const PublicPaymentList = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { data } = useCartStore();

  let tp: number = 0
  for (let i = 0; i < data.length; i++) {
    tp += data[i].price * data[i].customQuantity;
  }

  useEffect(() => { setCartTotal(data.length), setTotalPrice(tp) }, [data.length, tp])

  return (
    <div className='payment__box__cart__container'>
      <div className='info'>
        <h4>Mahsulotlar ({cartTotal}):</h4>
        <h4>{totalPrice} so'm</h4>
      </div>
      <div className='action'>
        <Button>Buyurtma qilish</Button>
        <Button>Rasmiylashtirish</Button>
      </div>
    </div>
  )
}

export default PublicPaymentList