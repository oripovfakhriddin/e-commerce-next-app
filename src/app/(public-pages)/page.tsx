"use-client"

import { Fragment, useEffect } from "react"
import ProductLatest from "@/components/lists/product-latest"
import CategoryList from "@/components/lists/category"

const PublicHomePage = () => {

  return (
    <Fragment>
      <CategoryList />
      <ProductLatest />
    </Fragment>
  )
}

export default PublicHomePage