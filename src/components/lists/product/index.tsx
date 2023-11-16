"use client"

import { useEffect } from 'react'
import Pagination from '@mui/material/Pagination';
import "./style.scss"
import useProductsStore from '@/store/public/products';
import PublicProductsCard from '@/components/cards/public/products';
import { LIMIT } from '@/constants';
import useCategoryStore from '@/store/public/category';

const PublicProductsList = () => {

  const { loading: productLoading, total, data: productData, getData: getProduct, setActivePage } = useProductsStore();


  useEffect(() => {
    getProduct()
  }, [getProduct])



  return (
    <div>
      <div className="container product__row">
        {productData?.map((pr) => <div key={pr?._id}><PublicProductsCard data={pr} loading={productLoading} /></div>)}
      </div>
      <div className='pagination__box'>
        <Pagination
          onChange={(e, value) => {
            setActivePage(value)
          }}
          count={Math.ceil(total / LIMIT)}
          color="secondary" />
      </div>
    </div>
  )
}

export default PublicProductsList