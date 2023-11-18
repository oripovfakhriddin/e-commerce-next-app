"use client"

import useOrdersUserStore from '@/store/public/orders'
import Category from '@/types/category'
import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import "./style.scss"
import PublicOrdersType from '@/types/public-orders';
import { trueDate } from '@/utils/sum';



function Row({ row, i }: {row: PublicOrdersType} & {i: number}) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{i+1}</TableCell>
        <TableCell  align="center" >
          {trueDate(row.createdAt)}
        </TableCell>
        <TableCell align="center">{row.status === "ACCEPTED" ? <p className="qabul__qilindi">Qabul qilindi</p> : row.status === "CANCELED" ? <p className = "bekor__qilingan" >Bekor qilingan</p> : <p className='yetkazilgan'>Yetkazilgan</p> }</TableCell>
        <TableCell align="center">{row?.comment ?  row?.comment : <p className = "bekor__qilingan" >Izoh yo'q</p> }</TableCell>
        <TableCell align="right">{row.cart.length}</TableCell>
      </TableRow>
      <TableRow hover>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Ushbu buyurtma haqida
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow hover>
                  <TableCell align="left">T/R</TableCell>
                    <TableCell align="center">Mahsulot nomi</TableCell>
                    <TableCell align="center">Mahsulot turi</TableCell>
                    <TableCell align="center">Mahsulot haqida</TableCell>
                    <TableCell align="center">Mahsulot soni</TableCell>
                    <TableCell align="center">Umumiy narxi (UZS)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.cart.map((historyRow, i) => (
                    <TableRow key={historyRow?._id}>
                      <TableCell align="left">
                        {i+1}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow?.product?.title ? historyRow?.product?.title : <p className = "bekor__qilingan" >Ma'lumot topilmadi!</p>}
                      </TableCell>
                      <TableCell align="center">{typeof historyRow?.product?.category !== 'string' ? historyRow?.product?.category?.name ? historyRow?.product?.category?.name :  <p className = "bekor__qilingan" >Ma'lumot topilmadi!</p>  : <p className = "bekor__qilingan" >Ma'lumot topilmadi!</p>}</TableCell>
                      <TableCell align="center">{historyRow?.product?.description ? historyRow?.product?.description : <p className = "bekor__qilingan" >Ma'lumot topilmadi!</p>}</TableCell>
                      <TableCell align="center">{historyRow?.quantity ? historyRow?.quantity : <p className = "bekor__qilingan" >Ma'lumot topilmadi!</p> }</TableCell>
                      <TableCell align="center">{historyRow?.quantity && historyRow?.product?.price ? historyRow?.quantity * historyRow?.product?.price : <p className = "bekor__qilingan" >Ma'lumot topilmadi!</p> }</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const PublicOrdersLists = () => {
    const {loading: ordersLoading, data: ordersData, getOrders} = useOrdersUserStore()
    useEffect(()=>{
        getOrders()
    }, [getOrders])
    

  return (
    <div className='orders__lists'>
        {ordersData.length === 0 ? <h1 className='not__orders__title'>SIZDA BUYURTMALAR MAVJUD EMAS</h1>
        :
        <TableContainer sx={{ maxHeight: 540 }} component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow hover>
            <TableCell >Toogle</TableCell>
              <TableCell style={{ minWidth: "60px" }} align="left">T/R</TableCell>
              <TableCell style={{ minWidth: "200px" }} align="center">Yuborilgan vaqti</TableCell>
              <TableCell style={{ minWidth: "200px" }} align="center">Holati</TableCell>
              <TableCell style={{ minWidth: "200px" }} align="center">Komentariya</TableCell>
              <TableCell style={{ minWidth: "150px" }} align="right">Mahsulot soni</TableCell>
            </TableRow>
          </TableHead>
          {ordersData?.map((el, i)=> 
          <TableBody>
              <Row key={el?._id} row={el} i={i} />
          </TableBody>
          )}
        </Table>
      </TableContainer> }
    </div>
  )
}

export default PublicOrdersLists;