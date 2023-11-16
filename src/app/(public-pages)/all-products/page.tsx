import PublicProductsList from "@/components/lists/product"
import { Fragment } from "react"

import "./style.scss"
import PublicCategoriesFilter from "@/components/filter/categories-filter"

const PublicAllProductsPage = () => {
  return (
    <Fragment>
      <section>
        <div className="container all__products__container">
          <div className="all__products__header">
            <h1 className="products__header__title">Barcha mahsulotlar</h1>
            <div className="category__filter__box">
              <PublicCategoriesFilter />
            </div>
          </div>
          <PublicProductsList />
        </div>
      </section>
    </Fragment>
  )
}

export default PublicAllProductsPage