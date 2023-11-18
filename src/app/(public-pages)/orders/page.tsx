import React, { Fragment } from "react";

import "./style.scss";
import { Metadata } from "next";
import PublicOrdersLists from "@/components/lists/orders";

export const metadata: Metadata = {
  title: "VODIY PARFUM | BUYURTMALARIM",
  description: "VODIY PARFUME internet do'konidagi buyurtmalarim!",
};

const PublicOrdersPage = () => {
  return (
    <Fragment>
      <section id="public__orders">
        <div className="container orders__container">
          <div className="orders__page__title__box"><h1>Buyurtmalarim</h1></div>
          <PublicOrdersLists />
        </div>
      </section>
    </Fragment>
  );
};

export default PublicOrdersPage;
