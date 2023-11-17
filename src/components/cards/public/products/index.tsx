"use client";

import React from "react";
import Image from "next/image";
import Products from "@/types/products";

import "./style.scss";
import { Button, Skeleton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useFavouriteStore from "@/store/public/favourite";
import useCartStore from "@/store/public/cart";

const PublicProductsCard = ({
  data,
  loading,
}: { data: Products } & { loading: boolean }) => {
  const { data: favouriteData, addToFavourite } = useFavouriteStore();
  const {
    data: cartData,
    controlProductInCart,
    controlQuantityInCart,
  } = useCartStore();
  const toggleInFav = favouriteData?.find((el) => el?._id === data?._id);
  const toggleInCart = cartData?.find((el) => el?._id === data?._id);

  if (toggleInCart) {
    data = toggleInCart;
  }

  return (
    <div className="card__box__container">
      <div className="product__image__box">
        {loading ? (
          <Skeleton className="product__card__skleton" variant="rectangular" />
        ) : (
          <Image
            src={
              data?.image?.url
                ? data?.image?.url
                : "https://c8.alamy.com/comp/2ATEFRH/mission-failed-text-on-red-round-stamp-2ATEFRH.jpg"
            }
            alt={data?.title ? data?.title : "Ma'lumot topilmadi!"}
            fill
          />
        )}
        {typeof data?.category === "object" ? (
          <p>
            {loading ? (
              <Skeleton height={25} width={90} />
            ) : (
              data?.category?.name
            )}
          </p>
        ) : null}
      </div>
      <div className="product__content__box">
        {loading ? (
          <Skeleton />
        ) : (
          <h3>{data?.title ? data?.title : "Ma'lumot topilmadi!"}</h3>
        )}
        {loading ? (
          <Skeleton />
        ) : (
          <div>
            <p>Mahsulot soni: </p>
            <p>
              {data?.quantity > 0 ? (
                <span style={{ color: "orange" }}>{data?.quantity} dona</span>
              ) : (
                <span style={{ color: "red" }}>Qolmagan</span>
              )}
            </p>
          </div>
        )}
        {loading ? (
          <Skeleton />
        ) : (
          <div>
            <p>Narxi: </p>
            <p>
              {data?.price > 0 ? (
                <span style={{ color: "orange" }}>{data?.price} UZS</span>
              ) : (
                <span style={{ color: "red" }}>Ma'lumot topilmadi</span>
              )}
            </p>
          </div>
        )}

        {loading ? (
          <Skeleton />
        ) : (
          <p>
            {data?.description ? (
              data?.description
            ) : (
              <span style={{ color: "red" }}>Ma'lumot topilmadi</span>
            )}
          </p>
        )}
      </div>
      <div className="product__action__box">
        <div>
          <Button className="more">Ko'proq...</Button>
        </div>
        {toggleInCart ? (
          <div className="quantity__box">
            <Button
              onClick={() => {
                controlQuantityInCart("decrement", data);
              }}
              className="minus__cart"
              disabled={loading}
            >
              -
            </Button>
            <Button className="quantity__count">{data?.customQuantity}</Button>
            <Button
              onClick={() => {
                controlQuantityInCart("increment", data);
              }}
              className="plus__cart"
              disabled={loading}
            >
              +
            </Button>
          </div>
        ) : (
          <div>
            <Button
              onClick={() => {
                controlProductInCart(data);
              }}
              className="add__cart"
              disabled={loading}
            >
              Savatga qo'shish
            </Button>
          </div>
        )}
      </div>
      <div className="favourite__button__box">
        <button
          onClick={() => {
            addToFavourite(data);
          }}
        >
          {toggleInFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </button>
      </div>
    </div>
  );
};

export default PublicProductsCard;
