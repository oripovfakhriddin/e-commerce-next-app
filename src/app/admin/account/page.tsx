"use client";

import { useState, useEffect, Fragment, forwardRef } from "react";
import { useRouter } from "next/navigation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import EditIcon from "@mui/icons-material/Edit";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button, Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LockIcon from '@mui/icons-material/Lock';
import useAuthStore, {
  RegisterType,
  UserInformationType,
  UserPasswordType,
} from "@/store/auth/auth";
import "./style.scss";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AdminAccountPage = () => {
  const [valueTab, setValueTab] = useState(0);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [dataUser, setDataUser] = useState<UserInformationType | null>(null);
  const [dataPass, setDataPass] = useState<UserPasswordType | null>(null);
  const [openLogOutModal, setOpenLogOutModal] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserInformationType>();

  const {
    register: registerPass,
    handleSubmit: handleSubmitPass,
    formState: { errors: errorsPass },
  } = useForm<UserPasswordType>();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  const onSubmit = handleSubmit((data) => {
    setDataUser(data);
  });

  const onSubmitPassword = handleSubmitPass((data) => {
    setDataPass(data);
  });

  const {
    data,
    isAuthenticated,
    loading,
    changeUserInformation,
    changeUserPassword,
    logOut,
  } = useAuthStore();

  const handleOpenLogOutModal = () => {
    setOpenLogOutModal(true);
  };

  const handleCloseLogOutModal = () => {
    setOpenLogOutModal(false);
  };

  const handleLogOut = () => {
    logOut(router);
    setOpenLogOutModal(false);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }

    if (dataUser !== null) {
      changeUserInformation(dataUser, router);
    }
    if (dataPass !== null) {
      changeUserPassword(dataPass, router);
    }
  }, [
    isAuthenticated,
    changeUserInformation,
    changeUserPassword,
    dataPass,
    dataUser,
    router,
  ]);

  return (
    <section id="account">
      <div className="container">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              className="tabs__list"
              value={valueTab}
              onChange={handleChange}
              aria-label="account data"
              centered
            >
              <Tab
                icon={<PersonPinIcon />}
                label={<p>Ma'lumot</p>}
                {...a11yProps(0)}
              />
              <Tab
                icon={<BorderColorIcon />}
                label={<p>Tahrirlash</p>}
                {...a11yProps(1)}
              />
              <Tab
                icon={<LockIcon />}
                label={<p>Parolni o'zgartirish</p>}
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={valueTab} index={0}>
            <h1 className="tabs__title">Ma'lumotlarim</h1>
            <div className="account__box">
              <div>
                <p>Ismingiz: </p>
                <h1>{data?.user?.firstName}</h1>
              </div>
              <div>
                <p>Familyangiz: </p>
                <h1>{data?.user?.lastName}</h1>
              </div>
              <div>
                <p>Foydalanuvchi nomi: </p>
                <h1>{data?.user?.username}</h1>
              </div>
              <div>
                <p>Telefon raqamingiz: </p>
                <h1>{data?.user?.phoneNumber}</h1>
              </div>
            </div>
            <div className="log__out__box">
              <LoadingButton
                type="submit"
                loading={loading}
                loadingIndicator="Chiqmoqda..."
                onClick={handleOpenLogOutModal}
                variant="outlined"
                color="warning"
              >
                <span>Akkauntdan chiqish</span>
              </LoadingButton>
            </div>

            <Dialog
              open={openLogOutModal}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseLogOutModal}
              aria-describedby="Tasdiqlash uchun"
            >
              <DialogTitle className="dialog__ttle">
                Tadiqlash uchun tugmalardan birini bosing!
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <p>Akkauntingizdan chiqmoqchimisiz?</p>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  className="dialog__button"
                  onClick={handleCloseLogOutModal}
                >
                  Bekor qilish
                </Button>
                <Button className="dialog__button" onClick={handleLogOut}>
                  Chiqish
                </Button>
              </DialogActions>
            </Dialog>
          </CustomTabPanel>
          <CustomTabPanel value={valueTab} index={1}>
            <div className="account__change__box">
              <Fragment>
                <h1>Ma'lumotlarimni o'zgartirish</h1>
                <form className="form__change" onSubmit={onSubmit}>
                  <TextField
                    {...register("firstName", {
                      required: "Ism kiritilishi shart",
                      minLength: {
                        value: 3,
                        message: "Ism 3 belgidan ko'p bo'lishi shart",
                      },
                      pattern: {
                        value: /^[A-Za-z]+$/,
                        message: "Faqatgina harflarni kiriting",
                      },
                    })}
                    defaultValue={data?.user?.firstName}
                    error={Boolean(errors?.firstName)}
                    helperText={errors?.firstName?.message}
                    aria-invalid={false}
                    label="Ismingiz"
                    autoComplete="firstName"
                  />
                  <TextField
                    {...register("lastName", {
                      required: "Familya kiritilishi shart",
                      minLength: {
                        value: 3,
                        message: "Familya 3 belgidan ko'p bo'lishi shart",
                      },
                      pattern: {
                        value: /^[A-Za-z]+$/,
                        message: "Faqatgina harflarni kiriting",
                      },
                    })}
                    defaultValue={data?.user?.lastName}
                    error={Boolean(errors?.lastName)}
                    helperText={errors?.lastName?.message}
                    aria-invalid={false}
                    label="Familyangiz"
                    autoComplete="lastName"
                  />
                  <TextField
                    {...register("phoneNumber", {
                      required: "Telefon raqam kiritilishi shart",
                      pattern: {
                        value: /^\+998[0-9]{9}$/,
                        message:
                          "O'zbekiston raqamlari uchun to'g'ri formatda kiritilishi shart",
                      },
                    })}
                    defaultValue={data?.user?.phoneNumber}
                    error={Boolean(errors?.phoneNumber)}
                    helperText={errors?.phoneNumber?.message}
                    aria-invalid={false}
                    label="Telefon raqamingiz"
                    autoComplete="phoneNumber"
                  />
                  <TextField
                    {...register("username", {
                      required: "Foydalanuvchi nomi kiritilishi shart",
                      minLength: {
                        value: 4,
                        message:
                          "Foydalanuvchi nomi 4 belgidan ko'p bo'lishi shart",
                      },
                    })}
                    defaultValue={data?.user?.username}
                    error={Boolean(errors?.username)}
                    helperText={errors?.username?.message}
                    aria-invalid={false}
                    label="Foydalanuvchi nomi"
                    autoComplete="username"
                  />
                  <LoadingButton
                    type="submit"
                    loading={loading}
                    loadingIndicator="Kuting..."
                    variant="outlined"
                    color="warning"
                  >
                    <span>Tasdiqlash</span>
                  </LoadingButton>
                </form>
              </Fragment>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={valueTab} index={2}>
            <div className="account__change__password__box">
              <Fragment>
                <h1>Parolni o'zgartirish</h1>
                <form
                  className="password__change__form"
                  onSubmit={onSubmitPassword}
                >
                  <TextField
                    {...registerPass("currentPassword", {
                      required: "Parol kiritilishi shart!",
                      minLength: {
                        value: 6,
                        message: "Parol 6 belgidan ko'p bo'lishi shart",
                      },
                      maxLength: {
                        value: 12,
                        message: "Parol 12 belgidan kam bo'lishi shart",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    error={Boolean(errorsPass?.currentPassword)}
                    helperText={errorsPass?.currentPassword?.message}
                    label="Oldingi parol"
                    autoComplete="current-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    {...registerPass("newPassword", {
                      required: "Parol kiritilishi shart!",
                      minLength: {
                        value: 6,
                        message: "Parol 6 belgidan ko'p bo'lishi shart",
                      },
                      maxLength: {
                        value: 12,
                        message: "Parol 12 belgidan kam bo'lishi shart",
                      },
                    })}
                    error={Boolean(errorsPass?.newPassword)}
                    helperText={errorsPass?.newPassword?.message}
                    aria-invalid={false}
                    label="Yangi parol"
                    autoComplete="newPassword"
                  />
                  <TextField
                    {...registerPass("confirmPassword", {
                      required: "Parol kiritilishi shart!",
                      minLength: {
                        value: 6,
                        message: "Parol 6 belgidan ko'p bo'lishi shart",
                      },
                      maxLength: {
                        value: 12,
                        message: "Parol 12 belgidan kam bo'lishi shart",
                      },
                    })}
                    error={Boolean(errorsPass?.confirmPassword)}
                    helperText={errorsPass?.confirmPassword?.message}
                    aria-invalid={false}
                    label="Qaytadan kiriting"
                    autoComplete="confirmPassword"
                  />
                  <LoadingButton
                    type="submit"
                    loading={loading}
                    loadingIndicator="Kuting..."
                    variant="outlined"
                    color="warning"
                  >
                    <span>Tadiqlash</span>
                  </LoadingButton>
                </form>
              </Fragment>
            </div>
          </CustomTabPanel>
        </Box>
      </div>
    </section>
  );
};

export default AdminAccountPage;
