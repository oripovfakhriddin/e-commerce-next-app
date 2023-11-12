

import { Fragment, useEffect } from "react"
import ProductLatest from "@/components/lists/product-latest"
import CategoryList from "@/components/lists/category"

import "./style.scss"

const PublicHomePage = () => {

  return (
    <Fragment>
      <section id="latest__products">
        <h1 style={{ textAlign: "center" }} >Eng oxirgi mahsulotlar</h1>
        <ProductLatest key="salom" />
      </section>
      <section id= "categories">
        <h1 style={{ textAlign: "center" }} >Barcha mahsulot turlari</h1>
      </section>
      {/* <CategoryList /> */}
    </Fragment>
  )
}

export default PublicHomePage