"use client";

import useCartStore from "@/store/public/cart";
import React, { useState, useEffect } from "react";
import { Button, Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import "./style.scss";
import useAuthStore from "@/store/auth/auth";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PublicPaymentList = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { data } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  let tp: number = 0;
  for (let i = 0; i < data.length; i++) {
    tp += data[i].price * data[i].customQuantity;
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePayment = () => {};

  useEffect(() => {
    setCartTotal(data.length), setTotalPrice(tp);
  }, [data.length, tp]);

  return (
    <div className="payment__box__cart__container">
      <div className="info">
        <h4>Mahsulotlar ({cartTotal}):</h4>
        <h4>{totalPrice} so'm</h4>
      </div>
      <div className="action">
        {isAuthenticated ? (
          <Button onClick={handleClickOpen}>Buyurtma qilish</Button>
        ) : (
          <Button>Rasmiylashtirish</Button>
        )}
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="Tasdiqlash uchun"
      >
        <form>
          <DialogTitle>
            {"Tadiqlash uchun tugmalardan birini bosing!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <div>
                {data.map((el) => (
                  <div>
                    <div>
                      <p>Mahsulot nomi: {el.title} </p>
                      <p>Mahsulot soni: {el.customQuantity} ta</p>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <p>Ushbu xaridlarni amalga oririshga ishonchingiz komilmi?</p>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Bekor qilish</Button>
            <Button onClick={handlePayment}>Tasdiqlash</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default PublicPaymentList;
