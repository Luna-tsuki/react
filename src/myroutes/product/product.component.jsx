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
      <Outlet />
      <div className="layout-head">
        <p className="sku-name">
          両面使える敷きパッド　セミダブル(NクールWSP n-s DBL SD)
        </p>
        <p className="sku-code">商品コード 7565682</p>
        <p className="product-reviews">
          <span>🌟🌟🌟🌟🌟</span>
          <span>(92)</span>
        </p>
        <p className="labelSet">
          <img
            src="https://www.nitori-net.jp/ecstatic/image/sys-master/images/8992484163614/icon_douga.png"
            alt=""
          />
        </p>
      </div>
      <div className="product-mainbody">
        <div className="product-body">
          <div className="top-body">
            <div className="gallery">
              <div className="swiper-container">
                <img
                  src="https://www.nitori-net.jp/ecstatic/image/product/7565651/756565101.jpg?ccp=1659078000&imwidth=415&imdensity=1&ts=20220307102149108"
                  alt=""
                />
              </div>
              <div className="swiper-slide">
                <img
                  src="https://www.nitori-net.jp/ecstatic/image/product/7565651/756565101.jpg?imwidth=97&ts=20220307102149108"
                  alt=""
                />
                <img
                  src="https://www.nitori-net.jp/ecstatic/image/product/7565651/756565101.jpg?imwidth=97&ts=20220307102149108"
                  alt=""
                />
                <img
                  src="https://www.nitori-net.jp/ecstatic/image/product/7565651/756565101.jpg?imwidth=97&ts=20220307102149108"
                  alt=""
                />
                <img
                  src="https://www.nitori-net.jp/ecstatic/image/product/7565651/756565101.jpg?imwidth=97&ts=20220307102149108"
                  alt=""
                />
                <img
                  src="https://www.nitori-net.jp/ecstatic/image/product/7565651/756565101.jpg?imwidth=97&ts=20220307102149108"
                  alt=""
                />
                <img
                  src="https://www.nitori-net.jp/ecstatic/image/product/7565651/756565101.jpg?imwidth=97&ts=20220307102149108"
                  alt=""
                />
                <img
                  src="https://www.nitori-net.jp/ecstatic/image/product/7565651/756565101.jpg?imwidth=97&ts=20220307102149108"
                  alt=""
                />
                <img
                  src="https://www.nitori-net.jp/ecstatic/image/product/7565651/756565101.jpg?imwidth=97&ts=20220307102149108"
                  alt=""
                />
              </div>
              <div className="gallery_controls">1234</div>
            </div>
            <div className="sku-details">
              <div className="sku-variations">
                <p>
                  サイズ：<b>シングル</b>
                </p>
                <div className="selected-size">
                  <select className="select-size">
                    <option value="S">シングル</option>
                    <option value="SD">セミダブル</option>
                  </select>
                </div>
                <p>
                  カラー：<b>ブルー</b>
                </p>
                <div className="product-colors">
                  <ul>
                    <li className="product-color">
                      <img
                        className="product-colorimg"
                        alt=""
                        src="https://www.nitori-net.jp/ecstatic/image/sys-master/images/8965479792670/BasicColor_GRY.jpg"
                      />
                    </li>
                    <li className="product-color">
                      <img
                        className="product-colorimg"
                        alt=""
                        src="https://www.nitori-net.jp/ecstatic/image/sys-master/images/8965479792670/BasicColor_GRY.jpg"
                      />
                    </li>
                  </ul>
                </div>
                <p className="product-catchcopy">
                  「もちもち×さらさら」の強冷感面と「ふんわり」心地いいパイル面のリバーシブル。
                </p>
                <p className="product-price">
                  <span className="price">3,990</span>円
                </p>
                <div className="product-point">
                  <p className="product-pointleft">
                    獲得ポイント<span className="point">36pt</span>付与
                  </p>
                  <p className="point-link">
                    <a
                      href="https://www.nitori-net.jp/ec/userguide/memberscardpoint/"
                      alt=""
                    >
                      <span>ポイントについて</span>
                    </a>
                  </p>
                </div>
                <p className="product-spec">仕様・サイズ</p>
                <div className="product-propertys">
                  <ul>
                    <li className="product-property">
                      <img
                        className="product-propertyimg"
                        alt=""
                        src="https://www.nitori-net.jp/ecstatic/image/sys-master/images/8878718517278/pic03043.jpg"
                      />
                    </li>
                    <li className="product-property">
                      <img
                        className="product-propertyimg"
                        alt=""
                        src="https://www.nitori-net.jp/ecstatic/image/sys-master/images/8878718517278/pic03043.jpg"
                      />
                    </li>
                    <li className="product-property">
                      <img
                        className="product-propertyimg"
                        alt=""
                        src="https://www.nitori-net.jp/ecstatic/image/sys-master/images/8878718517278/pic03043.jpg"
                      />
                    </li>
                  </ul>
                </div>
                <div className="sku-specs">
                  <table class="table-specs">
                    <tbody>
                      <tr>
                        <th>商品コード</th>
                        <td>7565651</td>
                      </tr>
                      <tr>
                        <th>カラー</th>
                        <td>ブルー</td>
                      </tr>
                      <tr>
                        <th>サイズ</th>
                        <td>幅100×奥行200cm</td>
                      </tr>
                      <tr>
                        <th>素材</th>
                        <td>ナイロン／ポリエステル／ＰＥ／ＰＵ</td>
                      </tr>
                      <tr>
                        <th>重量</th>
                        <td>約1.12kg</td>
                      </tr>
                      <tr>
                        <th>保証年数</th>
                        <td>1年</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-body"></div>
        </div>
        <div className="sidebar">1</div>
      </div>
    </Fragment>
  );
};
export default Product;
