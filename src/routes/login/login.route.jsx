import { Fragment } from "react";
import Header from "../../components/header/header.component.jsx";
import Login from "../../components/login/Login.component.jsx";

const LoginRoute = () => {
  return (
    <Fragment>
      <Header/>
      <Login/>
    </Fragment>
  );
};

export default LoginRoute;