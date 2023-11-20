"use client";

import React, { useEffect, Fragment, useState, ChangeEvent } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import useCategoryStore from "@/store/admin/category";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Button, TextField } from "@mui/material";
import "./style.scss";
import { trueDate } from "@/utils/custom-date";
import Image from "next/image";

const AdminCategoryPage = () => {
  const {
    data: categoryData,
    loading,
    activePage,
    limit,
    search,
    total,
    getData,
    searchData,
    setActivePage,
    setLimitPerPage,
    editData,
    deleteData,
    addData,
  } = useCategoryStore();

  useEffect(() => {
    getData();
  }, [getData]);

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

  return (
    <Fragment>
      <div className="admin__category__info">
        <h1>Mahsulotlar turlari</h1>
        <TextField
          name="search"
          onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            handleSearch(e)
          }
          id="outlined-basic"
          label="Qidirish..."
          variant="outlined"
        />
        <Button variant="contained">Tur qo'shish</Button>
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
                    Qo'shilgan vaqti
                  </TableCell>
                  <TableCell align="right" style={{ minWidth: "210px" }}>
                    Amallar
                  </TableCell>
                </TableRow>
              </StickyTableHead>
              <TableBody>
                {categoryData?.map((category) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={category?._id}
                    >
                      <TableCell align="center">
                        <div className="category__image__box">
                          <Image
                            src={category?.image?.url}
                            alt={category?.image?.url}
                            fill
                          />
                        </div>
                      </TableCell>
                      <TableCell align="center">{category?.name}</TableCell>

                      <TableCell align="center">
                        {trueDate(category?.createdAt)}
                      </TableCell>
                      <TableCell align="right">
                        <div>
                          <Button
                            onClick={() => {
                              editData(category?._id);
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
                              deleteData(category?._id);
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
            rowsPerPageOptions={[10, 15, 20]}
            component="div"
            count={total}
            rowsPerPage={limit}
            page={activePage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Fragment>
  );
};

export default AdminCategoryPage;
