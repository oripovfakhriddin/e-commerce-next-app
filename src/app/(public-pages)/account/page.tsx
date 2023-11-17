"use client";

import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import EditIcon from "@mui/icons-material/Edit";
import useAuthStore, {
  RegisterType,
  UserInformationType,
} from "@/store/auth/auth";
import "./style.scss";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";

// import { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "VODIY PARFUM | HISOBIM",
//   description:
//     "VODIY PARFUME internet do'konidagi hisobim!",
// };

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

const PublicAccountPage = () => {
  const [valueTab, setValueTab] = useState(0);

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [dataUser, setDataUser] = useState<UserInformationType | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserInformationType>();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    setDataUser(data);
  });

  const { data, isAuthenticated, loading, changeUserInformation } =
    useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }

    if (dataUser !== null) {
      changeUserInformation(dataUser, router);
    }
  }, [isAuthenticated, changeUserInformation, dataUser]);

  return (
    <section id="account">
      <div className="container">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={valueTab}
              onChange={handleChange}
              aria-label="account data"
              centered
            >
              <Tab
                icon={<PersonPinIcon />}
                label="Ma'lumot"
                {...a11yProps(0)}
              />
              <Tab icon={<EditIcon />} label="Tahrirlash" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={valueTab} index={0}>
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
          </CustomTabPanel>
          <CustomTabPanel value={valueTab} index={1}>
            <div className="account__change__box">
              <Fragment>
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
        </Box>
      </div>
    </section>
  );
};

export default PublicAccountPage;
