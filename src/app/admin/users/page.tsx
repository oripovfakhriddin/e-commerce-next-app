"use client"

import React, { useEffect, Fragment, useState } from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import useUsersStore from '@/store/admin/users';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import './style.scss';
import { trueDate } from '@/utils/sum';



const AdminUsersPage = () => {
  const {
    data: userData,
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
  } = useUsersStore();

  useEffect(() => {
    getData();
  }, [getData]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setActivePage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimitPerPage(+event.target.value);
    setActivePage(0);
  };

  const StickyTableHead = styled(TableHead)({
    background: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  });

  return (
    <Fragment>
      <Paper sx={{ width: '100%', overflow: 'auto' }}>
        <TableContainer
          component={Paper}
          sx={{
            overflowX: 'auto',
            maxHeight: '500px',
            '@media (max-width: 1000px)': {
              overflowX: 'auto',
            },
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <StickyTableHead>
              <TableRow>
                <TableCell align="center" style={{ minWidth: '170px' }}>Ism</TableCell>
                <TableCell align="center" style={{ minWidth: '170px' }}>Familya</TableCell>
                <TableCell align="center" style={{ minWidth: '170px' }}>Username</TableCell>
                <TableCell align="center" style={{ minWidth: '170px' }}>
                  Telefon
                </TableCell>
                <TableCell align="right" style={{ minWidth: '210px' }}>
                  Amallar
                </TableCell>
              </TableRow>
            </StickyTableHead>
            <TableBody>
              {userData?.map((user) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user?._id}>
                    <TableCell align="center">{user?.firstName}</TableCell>
                    <TableCell align="center">{user?.lastName}</TableCell>
                    <TableCell align="center">{user?.username}</TableCell>
                    <TableCell align="center">{user?.phoneNumber}</TableCell>
                    <TableCell align="right">
                      <div>
                        <Button
                          onClick={() => {
                            editData(user?._id);
                          }}
                          disabled={loading}
                          variant="outlined"
                          color="info"
                          style={{ marginRight: '10px' }}
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
    </Fragment>
  );
};

export default AdminUsersPage;
