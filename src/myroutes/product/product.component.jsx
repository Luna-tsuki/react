import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import {
  useState,
  useEffect,
  Fragment,
  createContext,
  useContext,
} from "react";
import "./product.styles.css";
import axios from "axios";

//固定网址部分
const localhost = axios.create({
  baseURL: "http://localhost:8080",
});

const Product = () => {
  return (
    <Fragment>
      <Outlet />1
    </Fragment>
  );
};
export default Product;
