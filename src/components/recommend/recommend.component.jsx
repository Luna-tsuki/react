import { useState, useEffect } from "react";
import "./recommend.styles.css";
import axios from "axios";
import GoodsCard from "../goods-card/goodscard.component";

const localhost = axios.create({
  baseURL: "http://localhost:8080",
});

const Recommend = () => {
  //解析初始值
  const [recommends, setRecommends] = useState([]);

  //1.查找serach
  useEffect(() => {
    async function getPost() {
      const response = await localhost.get("/ecgoodsDetail?configType=4");
      setRecommends(response.data.data);
    }
    getPost();
  }, []);

  return (
    <section className="main">
      <h1>おすすめ商品</h1>
      <div className="recommends">
        {recommends.map((goodsInfo) => {
          return <GoodsCard goodsInfo={goodsInfo} />;
        })}
      </div>
    </section>
  );
};

export default Recommend;
