"use client";

import useCartStore from "@/store/public/cart";
import React, { useState, useEffect, forwardRef, FormEvent } from "react";
import { Button, Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Input as BaseInput, InputProps } from "@mui/base/Input";
import { styled } from "@mui/system";
import "./style.scss";
import useAuthStore from "@/store/auth/auth";
import { useRouter } from "next/navigation";
import CreatePaymentType from "@/types/create-payment";
import { CreatePaymentCartType } from "@/types";
import request from "@/server/request";
import { toast } from "react-toastify";
import { CARD_CART } from "@/constants";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PublicPaymentList = () => {
  const [openPayment, setOpenPayment] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  const { data } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  let tp: number = 0;
  for (let i = 0; i < data.length; i++) {
    tp += data[i].price * data[i].customQuantity;
  }

  const handleClickOpenPayment = () => {
    setOpenPayment(true);
  };

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleClosePayment = () => {
    setOpenPayment(false);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handlePayment = async (e: FormEvent) => {
    e.preventDefault();
    let paymentData: CreatePaymentType;
    let cart: CreatePaymentCartType[] = [];
    let comment: string;
    comment = (e.target as any).elements.comment.value;
    for (let i = 0; i < data.length; i++) {
      let obj: CreatePaymentCartType = { product: "", quantity: 0 };
      obj.product = data[i]._id;
      obj.quantity = data[i].customQuantity;
      cart.push(obj);
    }
    if (comment !== "") {
      paymentData = {
        cart,
        comment,
      };
    } else {
      paymentData = {
        cart,
      };
    }

    try {
      if (paymentData?.cart.length !== 0) {
        setLoadingPayment(true);
        const { data: resData } = await request.post("payment", paymentData);
        if (resData.newPayment.status === "ACCEPTED") {
          toast.success("Buyurtmangiz muvaffaqiyatli qabul qilindi.");
          handleClosePayment();
          router.push("/");
        } else {
          toast.error("Buyurtmangiz qabul qilinmadi!");
        }
      } else {
        toast.info("Savatingiz bo'sh");
      }
    } finally {
      setLoadingPayment(false);
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    setCartTotal(data.length), setTotalPrice(tp);
  }, [data.length, tp]);

  const Input = forwardRef(function CustomInput(
    props: InputProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) {
    return (
      <BaseInput
        slots={{
          root: RootDiv,
          input: "input",
          textarea: TextareaElement,
        }}
        {...props}
        ref={ref}
      />
    );
  });

  return (
    <div className="payment__box__cart__container">
      <div className="info">
        <h4>Mahsulotlar ({cartTotal}):</h4>
        <h4>{totalPrice} so'm</h4>
      </div>
      <div className="action">
        {isAuthenticated ? (
          <Button onClick={handleClickOpenPayment}>Buyurtma qilish</Button>
        ) : (
          <Button onClick={handleClickOpenLogin}>Rasmiylashtirish</Button>
        )}
      </div>
      <Dialog
        className="payment__modal"
        open={openPayment}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClosePayment}
        aria-describedby="Tasdiqlash uchun"
      >
        <form onSubmit={handlePayment}>
          <DialogTitle className="dialog__title">
            Tadiqlash uchun tugmalardan birini bosing!
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <div>
                {data.map((el) => (
                  <div className="product__card">
                    <div>
                      <p className="first">Mahsulot nomi:</p>{" "}
                      <p className="second">{el.title}</p>
                    </div>
                    <div>
                      <p className="first">Mahsulot soni:</p>{" "}
                      <p className="second">{el.customQuantity} dona</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="comment__input">
                <Input
                  name="comment"
                  aria-label="Demo input"
                  multiline
                  placeholder="Xabaringiz..."
                />
              </div>
              <div>
                <p>Ushbu xaridlarni amalga oshirishga ishonchingiz komilmi?</p>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button className="dialog__button" onClick={handleClosePayment}>
              Bekor qilish
            </Button>
            <Button
              disabled={loadingPayment}
              type="submit"
              className="dialog__button"
            >
              Tasdiqlash
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog
        open={openLogin}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseLogin}
        aria-describedby="Tasdiqlash uchun"
      >
        <DialogTitle className="dialog__title">
          Tadiqlash uchun tugmalardan birini bosing!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <p>
              Ushbu xaridlarni amalga orirish uchun ro'yhatdan o'tish shart!
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="dialog__button" onClick={handleCloseLogin}>
            Bekor qilish
          </Button>
          <Button className="dialog__button" onClick={handleLogin}>
            Ro'yhatdan o'tish
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PublicPaymentList;

const orange = {
  100: "#eed7b9",
  200: "#d0ae83",
  400: "#e5ac67",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const RootDiv = styled("div")`
  display: flex;
  max-width: 100%;
`;

const TextareaElement = styled("textarea", {
  shouldForwardProp: (prop) =>
    !["ownerState", "minRows", "maxRows"].includes(prop.toString()),
})(
  ({ theme }) => `
  width: 320px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 8px 12px;
  border-radius: 8px 8px 0 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };

  &:hover {
    border-color: ${orange[400]};
  }

  &:focus {
    border-color: ${orange[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? orange[700] : orange[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
