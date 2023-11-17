"use client";
import React, { Fragment, useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./style.scss";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import useAuthStore, { RegisterType } from "@/store/auth/auth";
import { useForm } from "react-hook-form";
import { TOKEN } from "@/constants";
import request from "@/server/request";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "next/link";
const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [dataUser, setDataUser] = useState<RegisterType | null>(null);
  const { loading, userRegister } = useAuthStore();

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
  } = useForm<RegisterType>();

  const onSubmit = handleSubmit((data) => {
    setDataUser(data);
    request.defaults.headers.Authorization = `Bearer ${TOKEN}`;
  });

  useEffect(() => {
    if (dataUser !== null) {
      userRegister(dataUser, router);
    }
  }, [userRegister, dataUser, router]);

  return (
    <Fragment>
      <form className="register__form" onSubmit={onSubmit}>
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
          defaultValue="+998"
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
          <span>Ro'yhatdan o'tish</span>
        </LoadingButton>
        <div className="register__navigation">
          <Link href="/login">Kirish</Link>
          <Link href="/">Bosh sahifaga qaytish</Link>
        </div>
      </form>
    </Fragment>
  );
};

export default RegisterForm;
