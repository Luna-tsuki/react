import { Outlet } from "react-router-dom";
import "./bed.styles.css";

const Bed = () => {
  return (
    <div>
      <Outlet />
      <h1>bed</h1>
    </div>
  );
};
export default Bed;
