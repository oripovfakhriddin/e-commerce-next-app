import React, { Fragment } from "react";
import Products from "@/types/products";
import Image from "next/image";
import { Button, Dialog } from "@mui/material";
import useCartStore from "@/store/public/cart";
import DeleteIcon from '@mui/icons-material/Delete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import "./style.scss";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PublicProductsCartCard = ({ data }: { data: Products }) => {
  const { loading, controlQuantityInCart, deleteInCart } = useCartStore()

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteInCart(data)
    setOpen(false);
  };
  return <Fragment>
    <div className="cart__card__container">
      <div className="cart__image__box">
        <Image src={data?.image?.url} alt={data?.title} fill />
      </div>
      <div className="cart__card__container__second">
        <div className="parent">
          <div className="child">
            <p className="cart__card__info__title">Mahsulot nomi:</p>
            <h3 className="cart__card__info__text">{data?.title}</h3>
          </div>
          <div className="child">
            <p className="cart__card__info__title">Sotuvdagi mahsulot soni:</p>
            <h3 className="cart__card__info__text">{data?.quantity} dona</h3>
          </div>
          <div className="cart__card__quantity__btn">
            <Button onClick={() => { controlQuantityInCart("decrement", data) }} className="minus__cart" disabled={loading}>-</Button>
            <Button className="quantity__count">{data?.customQuantity}</Button>
            <Button onClick={() => { controlQuantityInCart("increment", data) }} className="plus__cart" disabled={loading}>+</Button>
          </div>
        </div>
        <div>
          <div className="cart__card__price__box">
            <p className="cart__card__info__title">Jami narx:</p>
            <h4> {data.customQuantity * data.price} UZS</h4>
          </div>
          <Button className="remove__cart" variant="outlined" startIcon={<DeleteIcon />} onClick={handleClickOpen}>
            Mahsulotni o'chirish
          </Button>
        </div>
      </div>
    </div>
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Tadiqlash uchun tugmalardan birini bosing!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {data.title}ni savatdan o'chirmoqchimisiz?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>YO'Q</Button>
        <Button onClick={handleDelete}>HA</Button>
      </DialogActions>
    </Dialog>
  </Fragment>
};

export default PublicProductsCartCard;
