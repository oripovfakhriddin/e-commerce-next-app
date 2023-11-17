import { Fragment } from "react";
import { Metadata } from "next";
import LoginForm from "@/components/forms/login";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import "./style.scss"

export const metadata: Metadata = {
  title: "VODIY PARFUM | KIRISH",
  description:
    "Vodiy perfume is an e-commerce site developed by Oripov Fakhriddin, a softwaree engineer based in Tashkent, Uzbekistan",
};

const LoginPage = () => {
  return (
    <Fragment>
      <section id="login">
        <div className="container login__container">
          <div className="login__box">
            <div>
              <LockOpenIcon />
            </div>
            <h1>Kirish</h1>
          </div>
          <LoginForm />
        </div>
      </section>
    </Fragment>
  );
};

export default LoginPage;
