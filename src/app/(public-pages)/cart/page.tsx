import React from "react";
import PublicProductsCartList from "@/components/lists/product-cart";
import "./style.scss";
import PublicPaymentList from "@/components/lists/payment";

const PublicCartPage = () => {
  return (
    <section id="cart">
      <div className="container cart__container">
        <div className="cart__card__box">
          <h1 className="card__box__title">Savatdagi mahsulotlar</h1>
          <div>
            <PublicProductsCartList />
          </div>
        </div>
        <div className="cart__payment__box">
          <h1 className="payment__box__title">To'lov ma'lumotlari</h1>
          <div className="address__info__box">
            <p>
              <b>Buyurtmangizni rasmiy topshirish</b> punktiga bepul yetkazib beramiz.
            </p>
            <p> Eshikkacha yetkazib berishgacha yana 823 000 so'm!</p>
            <hr />
          </div>
          <div className="total__price__payment__box">
              <h2>Buyurtmangiz:</h2>
              <PublicPaymentList/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicCartPage;