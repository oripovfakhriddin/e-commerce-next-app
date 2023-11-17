import useFavouriteStore from "@/store/public/favourite";
import { Fragment } from "react";

import "./style.scss";
import PublicFavouriteList from "@/components/lists/favourite";

const PublicFavouritePage = () => {
  return (
    <Fragment>
      <section id="favourite">
        <div className="container favourite__container">
          <div className="favourite__page__header__box">
            <h1>Sevimli mahsulotlarim</h1>
            <input type="text" placeholder="Searching..." />
          </div>
          <div className="favourite__page__content">
            <PublicFavouriteList />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default PublicFavouritePage;
