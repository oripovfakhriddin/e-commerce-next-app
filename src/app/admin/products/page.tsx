"use client";

import React, { useEffect, Fragment, useState, ChangeEvent } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import useProductsStore, { FormInputsProduct } from "@/store/admin/products";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import { useForm } from "react-hook-form";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import "./style.scss";
import { trueDate } from "@/utils/custom-date";
import Image from "next/image";
import UseFormInputs from "@/types/formInputs";
import useCategoryStore from "@/store/admin/category";

const AdminProductsPage = () => {
  const { register, handleSubmit, reset } = useForm<FormInputsProduct>();

  const onSubmit = (values: FormInputsProduct) => {
    values.image = photo;
    values.category = category;
    console.log(values.category);
    addData(values, selected);
  };

  const {
    data: productsData,
    loading,
    activePage,
    limit,
    photo,
    photoLoad,
    isModalLoad,
    search,
    selected,
    total,
    isModalOpen,
    category,
    uploadPhoto,
    setCategory,
    closeModal,
    showModal,
    getData,
    searchData,
    setActivePage,
    setLimitPerPage,
    editData,
    deleteData,
    addData,
  } = useProductsStore();

  const { data: categoryData, getData: getCategory } = useCategoryStore();

  const choosePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = new FormData();
    file.append(
      "file",
      e.target.files instanceof FileList ? e.target.files[0] : ""
    );
    uploadPhoto(file);
  };

  useEffect(() => {
    getData();
  }, [getData]);
  useEffect(() => {
    getCategory();
  }, [getCategory]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setActivePage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLimitPerPage(+event.target.value);
    setActivePage(0);
  };

  const StickyTableHead = styled(TableHead)({
    background: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 1,
  });

  const handleSearch: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void = (e) => {
    searchData(e.target.value);
    setActivePage(0);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <Fragment>
      <div className="admin__products__info">
        <h1>Mahsulotlar</h1>
        <TextField
          name="search"
          onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            handleSearch(e)
          }
          value={search}
          id="outlined-basic"
          label="Qidirish..."
          variant="outlined"
        />
        <Button onClick={() => showModal(reset)} variant="contained">
          Mahsulot qo'shish
        </Button>
      </div>
      {loading ? (
        <div className="loading__box">
          <h1>LOADING...</h1>
        </div>
      ) : (
        <Paper sx={{ width: "100%", overflow: "auto" }}>
          <TableContainer
            component={Paper}
            sx={{
              overflowX: "auto",
              maxHeight: "500px",
              "@media (max-width: 1000px)": {
                overflowX: "auto",
              },
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <StickyTableHead>
                <TableRow>
                  <TableCell align="center" style={{ minWidth: "170px" }}>
                    Rasm
                  </TableCell>
                  <TableCell align="center" style={{ minWidth: "170px" }}>
                    Nomi
                  </TableCell>
                  <TableCell align="center" style={{ minWidth: "170px" }}>
                    Turi
                  </TableCell>
                  <TableCell align="center" style={{ minWidth: "170px" }}>
                    Narxi(UZS)
                  </TableCell>
                  <TableCell align="right" style={{ minWidth: "210px" }}>
                    Amallar
                  </TableCell>
                </TableRow>
              </StickyTableHead>
              <TableBody>
                {productsData?.map((product) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={product?._id}
                    >
                      <TableCell align="center">
                        <div className="product__image__box">
                          <Image
                            src={product?.image?.url}
                            alt={product?.image?.url}
                            fill
                          />
                        </div>
                      </TableCell>
                      <TableCell align="center">{product?.title}</TableCell>
                      <TableCell align="center">
                        {typeof product?.category !== "string"
                          ? product?.category?.name
                          : "Ma'lumot topilmadi!"}
                      </TableCell>
                      <TableCell align="center">{product?.price}</TableCell>
                      <TableCell align="right">
                        <div>
                          <Button
                            onClick={() => {
                              editData(product?._id, reset);
                            }}
                            disabled={loading}
                            variant="outlined"
                            color="info"
                            style={{ marginRight: "10px" }}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => {
                              deleteData(product?._id);
                            }}
                            variant="outlined"
                            color="secondary"
                            disabled={loading}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={total}
            rowsPerPage={limit}
            page={activePage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="file" {...register("image")} onChange={choosePhoto} />

            {photo ? (
              <Image
                src={photo?.url ?? ""}
                height={200}
                width={300}
                alt=""
                priority
              />
            ) : null}

            <TextField
              size="small"
              id="outlined-basicc"
              {...register("title", {
                required: "This field must not be empty!",
              })}
              label="Title"
              variant="outlined"
              style={{ width: "100%", marginBottom: "20px" }}
            />

            <TextField
              size="small"
              id="outlined-basiccc"
              {...register("price", {
                required: "This field must not be empty!",
              })}
              label="Price"
              variant="outlined"
              style={{ width: "100%", marginBottom: "20px" }}
            />

            <TextField
              size="small"
              id="outlined-basicccc"
              {...register("quantity", {
                required: "This field must not be empty!",
              })}
              label="Quantity"
              style={{ width: "100%", marginBottom: "20px" }}
              variant="outlined"
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Category"
                {...register("category", {
                  required: "This field must not be empty!",
                })}
                value={category}
                style={{ width: "100%", marginBottom: "20px" }}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categoryData.map((pr, i) => (
                  <MenuItem key={i} value={pr._id}>
                    {pr.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              size="small"
              id="outlined-basicccccc"
              {...register("description", {
                required: "This field must not be empty!",
              })}
              label="Description"
              style={{ width: "100%", marginBottom: "20px" }}
              variant="outlined"
            />

            <div>
              <Button
                variant="contained"
                style={{ width: 100, marginRight: "20px" }}
                type="submit"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button variant="contained" style={{ width: 100 }} type="submit">
                {selected === null ? "Add" : "Save"}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default AdminProductsPage;
