import { useState, useEffect } from "react";
import "./user-history.styles.css";
import axios from "axios";
import GoodsCard from "../goods-card/goodscard.component";

const localhost = axios.create({
  baseURL: "http://localhost:8080",
});

const UserHistory = () => {
  //解析初始值
  const [historys, setHistorys] = useState([]);

  //1.查找serach
  useEffect(() => {
    async function getPost() {
      const response = await localhost.get("/UserHistory?userId=1");
      setHistorys(response.data.data);
    }
    getPost();
  }, []);

  return (
    <section className="main">
      <h1>閲覧履歴</h1>
      <div className="historys">
        {historys.map((goodsInfo) => {
          return <GoodsCard goodsInfo={goodsInfo} />;
        })}
      </div>
    </section>
  );
};

export default UserHistory;
