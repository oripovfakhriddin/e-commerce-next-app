import { Metadata } from "next";
import { Fragment } from "react";
import RegisterForm from "@/components/forms/register";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import "./style.scss";

export const metadata: Metadata = {
  title: "VODIY PARFUM | RO'YHATDAN O'TISH",
  description:
    "Vodiy perfume is an e-commerce site developed by Oripov Fakhriddin, a softwaree engineer based in Tashkent, Uzbekistan",
};

const RegisterPage = () => {
  return (
    <Fragment>
      <section id="register">
        <div className="container register__container">
          <div className="register__box">
            <div>
              <AppRegistrationIcon />
            </div>
            <h1>Ro'yhatdan o'tish</h1>
          </div>
          <RegisterForm />
        </div>
      </section>
    </Fragment>
  );
};

export default RegisterPage;
