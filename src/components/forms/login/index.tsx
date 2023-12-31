"use client";

import useAuthStore, { LoginType } from "@/store/auth/auth";
import { useRouter } from "next/navigation";
import { useEffect, Fragment, useState } from "react";
import { useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { TOKEN } from "@/constants";
import InputAdornment from "@mui/material/InputAdornment";
import request from "@/server/request";
import "./style.scss";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [dataUser, setDataUser] = useState<LoginType | null>(null);
  const { loading, login } = useAuthStore();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const onSubmit = handleSubmit((data) => {
    setDataUser(data);
    request.defaults.headers.Authorization = `Bearer ${TOKEN}`;
  });

  useEffect(() => {
    if (dataUser !== null) {
      login(dataUser, router);
    }
  }, [login, dataUser, router]);

  return (
    <Fragment>
      <form className="login__form" onSubmit={onSubmit}>
        <TextField
          {...register("username", {
            required: "Foydalanuvchi nomi kiritilishi shart",
            minLength: {
              value: 4,
              message: "Foydalanuvchi nomi 4 belgidan ko'p bo'lishi shart",
            },
          })}
          error={Boolean(errors?.username)}
          helperText={errors?.username?.message}
          aria-invalid={false}
          label="Foydalanuvchi nomi"
          autoComplete="username"
        />
        <TextField
          {...register("password", {
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
          error={Boolean(errors?.password)}
          helperText={errors?.password?.message}
          label="Parol"
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
        <LoadingButton
          type="submit"
          loading={loading}
          loadingIndicator="Kuting..."
          variant="outlined"
          color="warning"
        >
          <span>Kirish</span>
        </LoadingButton>

        <div className="login__navigation">
          <Link href="/register">Ro'yhatdan o'tish</Link>
          <Link href="/">Bosh sahifaga qaytish</Link>
        </div>
      </form>
    </Fragment>
  );
};

export default LoginForm;
