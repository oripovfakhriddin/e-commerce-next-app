"use client";

import React from "react";

import "./style.scss";
import PublicProductsCartCard from "@/components/cards/public/cart-products";
import useCartStore from "@/store/public/cart";

const PublicProductsCartList = () => {
  const { data: cartData } = useCartStore()
  return (
    <div className='product__cart__row'>
      {cartData?.map((pr, index) => <div key={index}><PublicProductsCartCard data={pr} /></div>)}
    </div>
  )
};

export default PublicProductsCartList;