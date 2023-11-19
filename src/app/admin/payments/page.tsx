"use client";

import React, { useEffect } from "react";
import "./style.scss";
import Loading from "@/app/loading";
import usePaymentStore, { PaymentData } from "@/store/admin/payments";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { trueDate } from "@/utils/sum";

function Row({ row, i, loading, editData, deleteData }: { row: PaymentData } & { i: number } & {loading: boolean} & {editData: Function} & {deleteData: Function} ) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow hover sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{i + 1}</TableCell>
        <TableCell align="center">{trueDate(row.createdAt)}</TableCell>
        <TableCell align="center">
          {row.status === "ACCEPTED" ? (
            <p className="qabul__qilindi">Qabul qilindi</p>
          ) : row.status === "CANCELED" ? (
            <p className="bekor__qilingan">Bekor qilingan</p>
          ) : (
            <p className="yetkazilgan">Yetkazilgan</p>
          )}
        </TableCell>
        <TableCell align="center">
          {row?.comment ? (
            row?.comment
          ) : (
            <p className="bekor__qilingan">Izoh yo'q</p>
          )}
        </TableCell>
        <TableCell align="center">{row.cart.length}</TableCell>
        <TableCell align="right">
          <div>
            <Button onClick={()=>{editData(row?._id)}} variant="contained" style={{marginRight: "10px"}} color="success" disabled={loading}>Qabul qilish</Button>
            <Button onClick={()=>{deleteData(row?._id)}} variant="contained" color="error" disabled={loading}>Bekor qilish</Button>
          </div>
        </TableCell>
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
                    <TableCell align="center">Mahsulot soni</TableCell>
                    <TableCell align="center">Umumiy narxi (UZS)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.cart.map((historyRow, i) => (
                    <TableRow key={historyRow?._id}>
                      <TableCell align="left">{i + 1}</TableCell>
                      <TableCell align="center">
                        {historyRow?.product ? (
                          historyRow?.product
                        ) : (
                          <p className="bekor__qilingan">Ma'lumot topilmadi!</p>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {historyRow?.quantity ? (
                          historyRow?.quantity
                        ) : (
                          <p className="bekor__qilingan">Ma'lumot topilmadi!</p>
                        )}
                      </TableCell>
                      <TableCell align="center">
                          <p className="bekor__qilingan">Ma'lumot topilmadi!</p>
                      </TableCell>
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

const AdminPaymentsPage = () => {
  const {
    loading: ordersLoading,
    data: ordersData,
    getData,
    editData,
    deleteData,
  } = usePaymentStore();

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="orders__lists">
      {ordersLoading ? (
        <Loading />
      ) : ordersData.length === 0 ? (
        <h1 className="not__orders__title">BUYURTMALAR MAVJUD EMAS</h1>
      ) : (
        <TableContainer sx={{ maxHeight: 540 }} component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow hover>
                <TableCell>Toogle</TableCell>
                <TableCell style={{ minWidth: "60px" }} align="left">
                  T/R
                </TableCell>
                <TableCell style={{ minWidth: "200px" }} align="center">
                  Yuborilgan vaqti
                </TableCell>
                <TableCell style={{ minWidth: "200px" }} align="center">
                  Holati
                </TableCell>
                <TableCell style={{ minWidth: "200px" }} align="center">
                  Komentariya
                </TableCell>
                <TableCell style={{ minWidth: "150px" }} align="center">
                  Mahsulot soni
                </TableCell>
                <TableCell style={{ minWidth: "400px" }} align="right">
                  Amallar
                </TableCell>
              </TableRow>
            </TableHead>
            {ordersData?.map((el, i) => (
              <TableBody>
                <Row key={el?._id} row={el} i={i} loading={ordersLoading} editData={editData} deleteData={deleteData}/>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default AdminPaymentsPage;
