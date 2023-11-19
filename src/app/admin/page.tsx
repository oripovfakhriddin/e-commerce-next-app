"use client";

import useCategoryStore from "@/store/admin/category";
import useProductsStore from "@/store/admin/products";
import useUsersStore from "@/store/admin/users";
import React, { Fragment, useEffect } from "react";
import Loading from "../loading";

const DashboardPage = () => {
  const {
    loading: userLoading,
    total: userTotal,
    getData: getUser,
  } = useUsersStore();
  const {
    loading: productLoading,
    total: productTotal,
    getData: getProduct,
  } = useProductsStore();
  const {
    loading: categoryLoading,
    total: categoryTotal,
    getData: getCategory,
  } = useCategoryStore();

  useEffect(() => {
    getUser(), getProduct();
  }, [getUser, getProduct]);

  return (
    <Fragment>
      {userLoading || productLoading || categoryLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="dashboard__title__box">
            <h1>Welcome to Admin Panel</h1>
          </div>
          <div>
            <h1>Foydalanuvchilar soni: {userTotal}</h1>
            <h1>Mahsulotlar soni: {productTotal}</h1>
            <h1>Mahsulot turlari: {categoryTotal}</h1>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DashboardPage;
