import React, { Fragment } from 'react'

import "./style.scss"
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "VODIY PARFUM | BUYURTMALARIM",
  description:
    "VODIY PARFUME internet do'konidagi buyurtmalarim!",
};

const PublicOrdersPage = () => {
  return (
    <Fragment>
      <section id='public__orders'>
        <div className="container orders__container">

        </div>
      </section>
    </Fragment>
  )
}

export default PublicOrdersPage