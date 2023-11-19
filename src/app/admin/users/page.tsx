"use client"

import React, { useEffect, Fragment } from 'react'
import useUsersStore from '@/store/admin/users'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import "./style.scss"
import { trueDate } from '@/utils/sum';
import { LIMIT } from '@/constants';
import { Button } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}



const AdminUsersPage = () => {

  const {data: userData, loading, activePage, search, total, getData, searchData, setActivePage, editData, deleteData, addData} = useUsersStore()

  useEffect(()=>{getData()}, [getData])

  

  return (
    <Fragment>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 540 }}>
        <Table stickyHeader aria-label="sticky table" sx={{ width: '100%' }}>
          <TableHead>
            <TableRow hover>
              <TableCell
                align="center"
                style={{ minWidth: "150px" }}
              >
                Ism
              </TableCell>
              <TableCell
                align="center"
                style={{ minWidth: "150px" }}
              >
                Familya
              </TableCell>
              <TableCell
                align="center"
                style={{ minWidth: "130px" }}
              >
                Username
              </TableCell>
              <TableCell
                align="center"
                style={{ minWidth: "170px" }}
              >
                Telefon raqam
              </TableCell>
              <TableCell
                align="center"
                style={{ minWidth: "160px" }}
              >
                Qo'shilgan
              </TableCell>
              <TableCell
                align="center"
                style={{ minWidth: "200px" }}
              >
                Amallar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((data)=>
              <TableRow hover role="checkbox" tabIndex={-1} key={data?._id}>
                <TableCell align="center" style={{ minWidth: "150px" }}>
                  {data?.firstName}
                </TableCell>
                <TableCell align="center" style={{ minWidth: "150px" }}>
                  {data?.lastName}
                </TableCell>
                <TableCell align="center" style={{ minWidth: "130px" }}>
                  {data?.username}
                </TableCell>
                <TableCell align="center" style={{ minWidth: "170px" }}>
                  {data?.phoneNumber}
                </TableCell>
                <TableCell align="center" style={{ minWidth: "160px" }}>
                  {trueDate(data?.createdAt)}
                </TableCell>
                <TableCell align="center" style={{ minWidth: "200px" }}>
                  <div>
                    <Button onClick={()=>editData(data?._id)} variant="contained" style={{marginRight: "10px"}} color="info" disabled={loading}>Edit</Button>
                    <Button onClick={()=>deleteData(data?._id)} variant="contained" color="secondary" disabled={loading}>Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    <div className='pagination__box'>
        <Pagination
          onChange={(e, value) => {
            setActivePage(value)
          }}
          count={Math.ceil(total / LIMIT)}
          color="primary" />
      </div>
    </Fragment>
  )
}

export default AdminUsersPage