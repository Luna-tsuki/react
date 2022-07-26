import "./echome.styles.css";
import { Outlet } from "react-router-dom";
import { Fragment } from "react";

const EcHome = () => {
  return (
    <Fragment>
      <Outlet />
      <div>home</div>
    </Fragment>
  );
};
export default EcHome;
