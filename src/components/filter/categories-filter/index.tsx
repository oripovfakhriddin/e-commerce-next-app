"use client"

import useCategoryStore from '@/store/public/category';
import useProductsStore from '@/store/public/products';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect } from 'react'

import "./style.scss"

const PublicCategoriesFilter = () => {

  const { loading, category, setCategory } = useProductsStore();
  const { loading: categoryLoading, data: categoryData, getData: getCategory } = useCategoryStore();

  useEffect(() => { getCategory() }, [getCategory])

  return (
    <div className="public__categories__filter__box">
      <FormControl className="filter" disabled={loading}>
        <InputLabel id="demo-simple-select-disabled-label">Mahsulot turlari</InputLabel>
        <Select
          labelId="demo-simple-sct-disabled-label"
          id="demo-simple-select-dsabled"
          value={category}
          label="Mahsulot turlari"
          onChange={(e) => { setCategory(e.target.value); }}
        >
          <MenuItem value="all">
            <em>Barchasi</em>
          </MenuItem>
          {categoryData?.map((category) => <MenuItem key={category._id} value={category?._id}>{category?.name}</MenuItem>)}
        </Select>

      </FormControl>
    </div>
  )
}

export default PublicCategoriesFilter