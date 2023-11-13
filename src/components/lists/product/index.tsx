"use client"

import { useEffect } from 'react'
import Pagination from '@mui/material/Pagination';
import "./style.scss"
import useProductsStore from '@/store/public/products';
import PublicProductsCard from '@/components/cards/public/products';
import { LIMIT } from '@/constants';
import useCategoryStore from '@/store/public/category';

const PublicProductsList = () => {

  const { total, data: productData, getData: getProduct, setActivePage, setSearch, setCategory } = useProductsStore();
  const { data: categoryData, getData: getCategory } = useCategoryStore()

  useEffect(() => {
    getProduct()
    getCategory()
  }, [getProduct, getCategory])



  return (
    <div>
      <div>
        <h1>Barcha mahsulotlar</h1>
        <input type="text" placeholder='Searching...'
          onChange={(e) => {
            setSearch(e.target.value);
          }} />
        <select id="category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}>
          <option value="all">All</option>
          {categoryData?.map((category) => <option key={category._id} value={category?._id}>{category?.name}</option>)}
        </select>
      </div>
      <div className="product__row">
        {productData?.map((pr) => <div key={pr?._id}><PublicProductsCard data={pr} /></div>)}
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