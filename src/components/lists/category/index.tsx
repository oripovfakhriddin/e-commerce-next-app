"use client"

import React, { useEffect, Fragment, useRef } from 'react'
import useCategoryState from '@/store/public/category'

import "./style.scss"
import PublicCategoryCard from '@/components/cards/public/category'

const CategoryList = () => {
  const { getCategory, loading, data } = useCategoryState()



  useEffect(() => { getCategory() }, [getCategory])

  return (
    <Fragment>

    </Fragment>
  )
}
export default CategoryList