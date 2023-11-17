import { Fragment } from "react"
import { Metadata } from 'next';
import LoginForm from "@/components/forms/login";

export const metadata: Metadata = {
  title: "VODIY PARFUM | KIRISH",
  description:
    "Vodiy perfume is an e-commerce site developed by Oripov Fakhriddin, a softwaree engineer based in Tashkent, Uzbekistan",
};

const LoginPage = () => {

  return (
    <Fragment>
      <section>
        <LoginForm />
      </section>
    </Fragment>
  )
}

export default LoginPage