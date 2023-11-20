import { Fragment, useEffect } from "react";
import ProductLatest from "@/components/lists/product-latest";
import CategoryList from "@/components/lists/category";
import NavLink from "@/components/shares/navlink";
import Button from "@mui/material/Button";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "./style.scss";

const PublicHomePage = () => {
  return (
    <Fragment>
      <section id="latest__products">
        <div className="container product__latest__container">
          <h1 className="">Eng oxirgi mahsulotlar</h1>
          <Button variant="text" endIcon={<NavigateNextIcon />}>
            <NavLink href="/all-products">
              <p>Barcha mahsulotlar</p>
            </NavLink>
          </Button>
        </div>
        <ProductLatest />
      </section>
      <section id="categories">
        <div className="container categories__container">
          <h1>Barcha mahsulot turlari</h1>
          <Button variant="text" endIcon={<NavigateNextIcon />}>
            <NavLink href="/all-products">
              <p>Mahsulot turlari</p>
            </NavLink>
          </Button>
        </div>
        <CategoryList />
      </section>
    </Fragment>
  );
};

export default PublicHomePage;
