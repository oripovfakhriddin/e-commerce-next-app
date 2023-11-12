"use-client"

import { Fragment, useEffect } from "react"
import ProductLatest from "@/components/lists/product-latest"
import CategoryList from "@/components/lists/category"

const PublicHomePage = () => {

  return (
    <Fragment>
      <h1 style={{textAlign: "center"}} >Barcha kategoriyalar</h1>
      <CategoryList />
      <ProductLatest />
    </Fragment>
  )
}

export default PublicHomePage