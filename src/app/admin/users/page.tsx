"use client";

import React, { useEffect, Fragment, useState, ChangeEvent } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import useUsersStore from "@/store/admin/users";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Box, Button, Modal, TextField } from "@mui/material";
import "./style.scss";
import { trueDate } from "@/utils/custom-date";
import { useForm } from "react-hook-form";
import UseFormInputs from "@/types/formInputs";

const AdminUsersPage = () => {
  const [category, setCategory] = useState("");
  const {
    data: userData,
    loading,
    activePage,
    limit,
    search,
    total,
    selected,
    isModalLoad,
    isModalOpen,
    showModal,
    closeModal,
    getData,
    searchData,
    setActivePage,
    setLimitPerPage,
    editData,
    deleteData,
    addData,
  } = useUsersStore();

  const { register, handleSubmit, reset } = useForm<UseFormInputs>();

  const onSubmit = (values: UseFormInputs) => {
    addData(values, selected);
  };

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
      <div className="admin__users__info">
        <h1>Users</h1>
        <TextField
          name="search"
          onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            handleSearch(e)
          }
          id="outlined-basic"
          label="Searching..."
          variant="outlined"
        />
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          onClick={() => showModal(reset, setCategory)}
        >
          Add user
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
                    Ism
                  </TableCell>
                  <TableCell align="center" style={{ minWidth: "170px" }}>
                    Familya
                  </TableCell>
                  <TableCell align="center" style={{ minWidth: "170px" }}>
                    Username
                  </TableCell>
                  <TableCell align="center" style={{ minWidth: "170px" }}>
                    Telefon
                  </TableCell>
                  <TableCell align="right" style={{ minWidth: "210px" }}>
                    Amallar
                  </TableCell>
                </TableRow>
              </StickyTableHead>
              <TableBody>
                {userData?.map((user) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={user?._id}
                    >
                      <TableCell align="center">{user?.firstName}</TableCell>
                      <TableCell align="center">{user?.lastName}</TableCell>
                      <TableCell align="center">{user?.username}</TableCell>
                      <TableCell align="center">{user?.phoneNumber}</TableCell>
                      <TableCell align="right">
                        <div>
                          <Button
                            onClick={() => {
                              editData(user?._id, reset);
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
                              deleteData(user?._id);
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

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              size="small"
              id="outlined-basicc"
              {...register("firstName", {
                required: "This field must not be empty!",
              })}
              label="Firstname"
              variant="outlined"
              style={{ width: "100%", marginBottom: "20px" }}
            />

            <TextField
              size="small"
              id="outlined-basiccc"
              {...register("lastName", {
                required: "This field must not be empty!",
              })}
              label="Lastname"
              variant="outlined"
              style={{ width: "100%", marginBottom: "20px" }}
            />

            <TextField
              size="small"
              id="outlined-basicccc"
              {...register("username", {
                required: "This field must not be empty!",
              })}
              label="Username"
              style={{ width: "100%", marginBottom: "20px" }}
              variant="outlined"
            />

            <TextField
              size="small"
              id="outlined-basiccccc"
              {...register("phoneNumber", {
                required: "This field must not be empty!",
              })}
              label="Phone number"
              style={{ width: "100%", marginBottom: "20px" }}
              variant="outlined"
            />

            {selected === null ? (
              <TextField
                size="small"
                id="outlined-basicccccc"
                {...register("password", {
                  required: "This field must not be empty!",
                })}
                label="Password"
                style={{ width: "100%", marginBottom: "20px" }}
                variant="outlined"
              />
            ) : null}

            <div>
              <Button
                variant="contained"
                style={{ width: 100, marginRight: "20px" }}
                type="submit"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                style={{ width: 100 }}
                endIcon={selected === null ? <AddIcon /> : <SaveIcon />}
                type="submit"
              >
                {selected === null ? "Add" : "Save"}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default AdminUsersPage;
