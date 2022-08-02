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

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
// Import required modules
import { Grid, Pagination, Navigation } from "swiper";

// Import FontAwesomeIcon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faBuildingCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { fas } from "fontawesome.macro";

//固定网址部分
const localhost = axios.create({
  baseURL: "http://localhost:8080",
});

const Product = () => {
  //初始值
  const initialState = {
    skuDetails: [
      {
        skuId: 7565706,
        goodsId: 10012,
        goodsName: "両面使える敷きパッド",
        skuName: "両面使える敷きパッド　シングル(NクールWSP n-s RO S)",
        size: "シングル",
        sizeCode: "S",
        color: "ローズ",
        colorCode: "RO",
        colorImg:
          "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8966164185118/BasicColor_RO.jpg",
        catchcopy:
          "【冷たさ】Nクール史上No.1！一番冷たく・ひんやりが長持ちする「さらさら」極冷感面と肌になじむニット面のリバーシブル。",
        price: 3990,
        point: 36,
        sizeDetail: "幅100×奥行200cm",
        material: "ナイロン／ＰＥ／ＰＡ／ＰＵ",
        weight: "約1.25kg",
        warranty: "1年",
        deliveryMethod: "玄関先迄納品",
        stock: 222,
        deliveryTime: "3～6日で出荷",
        deliveryImg:
          "https://www.nitori-net.jp/ecstatic/front/free_shipping.jpg",
        images:
          '{"images": ["https://www.nitori-net.jp/ecstatic/image/product/7565661/756566101.jpg?ccp=1659340800&imwidth=415&imdensity=1&ts=20220307110701388", "https://www.nitori-net.jp/ecstatic/image/product/7565661/756566102.jpg?ccp=1659340800&imwidth=415&imdensity=1&ts=20220307110701388", "https://www.nitori-net.jp/ecstatic/image/product/7565661/756566103.jpg?ccp=1659340800&imwidth=415&imdensity=1&ts=20220307110701388", "https://www.nitori-net.jp/ecstatic/image/product/7565661/756566104.jpg?ccp=1659340800&imwidth=415&imdensity=1&ts=20220307110701388", "https://www.nitori-net.jp/ecstatic/image/product/7565661/756566105.jpg?ccp=1659340800&imwidth=415&imdensity=1&ts=20220307110701388", "https://www.nitori-net.jp/ecstatic/image/product/7565661/756566106.jpg?ccp=1659340800&imwidth=415&imdensity=1&ts=20220307110701388", "https://www.nitori-net.jp/ecstatic/image/product/7565661/756566107.jpg?ccp=1659340800&imwidth=415&imdensity=1&ts=20220307110701388", "https://www.nitori-net.jp/ecstatic/image/product/7565661/756566108.jpg?ccp=1659340800&imwidth=415&imdensity=1&ts=20220307110701388", "https://www.nitori-net.jp/ecstatic/image/product/7565661/756566109.jpg?ccp=1659340800&imwidth=415&imdensity=1&ts=20220307110701388", "https://www.nitori-net.jp/ecstatic/image/product/7565661/756566110.jpg?ccp=1659340800&imwidth=415&imdensity=1&ts=20220307110701388"]}',
        icons:
          '{"icons": ["https://www.nitori-net.jp/ecstatic/image/sys-master/images/8878560215070/pic01062.jpg", "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8878563590174/pic01095.jpg", "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8878565064734/pic01128.jpg", "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8878718517278/pic03043.jpg"]}',
      },
    ],
    sizeList: [
      {
        size: "シングル",
        sizeCode: "S",
      },
      {
        size: "セミダブル",
        sizeCode: "SD",
      },
      {
        size: "ダブル",
        sizeCode: "D",
      },
    ],
    colorList: [
      {
        color: "ホワイト",
        colorImg:
          "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8966164348958/BasicColor_WH.jpg",
        colorCode: "WH",
      },
      {
        color: "グレー",
        colorImg:
          "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8965479792670/BasicColor_GRY.jpg",
        colorCode: "GY",
      },
      {
        color: "ローズ",
        colorImg:
          "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8966164185118/BasicColor_RO.jpg",
        colorCode: "RO",
      },
    ],
  };

  // 初始值
  const [productDetails, setProductDetails] = useState({});
  const [skuDetails, setSkuDetails] = useState({});
  const [sizeList, setSizeList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [iconsList, setIconsList] = useState([]);
  const [imagesList, setImagesList] = useState([]);

  // 发送get请求参数
  const [goodsId, setGoodsId] = useState("12002");
  const [sizeCode, setSizeCode] = useState("");
  const [colorCode, setColorCode] = useState("");
  // 轮播大图
  const [swiperBigImage, setSwiperBigImage] = useState("");
  //

  // 首次调用接口展示第一个sku
  useEffect(() => {
    async function get() {
      const params = {};
      if (colorCode || sizeCode) {
        params.colorCode = colorCode;
        params.sizeCode = sizeCode;
      }
      const response = await localhost.get(`${"/product"}/${goodsId}`, {
        params,
      });
      // 设置值
      setProductDetails(response.data.data);
      setSkuDetails(response.data.data.skuDetails[0]);
      setSizeList(response.data.data.sizeList);
      setColorList(response.data.data.colorList);
      setSizeCode(response.data.data.skuDetails[0].sizeCode);
      setColorCode(response.data.data.skuDetails[0].colorCode);

      setIconsList(JSON.parse(response.data.data.skuDetails[0].icons).icons);
      setImagesList(JSON.parse(response.data.data.skuDetails[0].images).images);
      setSwiperBigImage(
        JSON.parse(response.data.data.skuDetails[0].images).images[0]
      );
    }
    get();
  }, [goodsId, sizeCode, colorCode]);

  //切换size
  const handleSize = (event) => {
    setSizeCode(event.target.value);
  };

  //切换color
  const handleColor = (colorCode) => {
    setColorCode(colorCode);
  };

  //点击切换大图
  const handleSwiper = (image) => {
    setSwiperBigImage(image);
  };

  return (
    <Fragment>
      <Outlet />
      <div className="layout-head">
        <p className="sku-name">{skuDetails.skuName}</p>
        <p className="sku-code">商品コード {skuDetails.skuId}</p>
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
                <img src={swiperBigImage} alt="" />
              </div>
              <div className="swiper-1">
                <Swiper
                  slidesPerView={4}
                  slidesPerGroup={4}
                  grid={{
                    rows: 2,
                  }}
                  spaceBetween={10}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Grid, Pagination, Navigation]}
                  className="mySwiper"
                >
                  {imagesList !== undefined &&
                    imagesList !== null &&
                    imagesList.map((image, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <img
                            src={image}
                            alt=""
                            onClick={() => handleSwiper(image)}
                          />
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            </div>
            <div className="sku-details">
              <div className="sku-variations">
                <p>
                  サイズ：<b>{skuDetails.size}</b>
                </p>
                <div className="selected-size">
                  <select
                    className="select-size"
                    value={sizeCode}
                    onChange={handleSize}
                  >
                    {sizeList !== undefined &&
                      sizeList !== null &&
                      sizeList.map((sizes) => {
                        return (
                          <option value={sizes.sizeCode} key={sizes.sizeCode}>
                            {sizes.size}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <p>
                  カラー：<b>{skuDetails.color}</b>
                </p>
                <div className="product-colors">
                  <ul>
                    {colorList !== undefined &&
                      colorList !== null &&
                      colorList.map((colors) => {
                        return (
                          <li
                            className={
                              skuDetails.colorCode === colors.colorCode
                                ? "product-color-active"
                                : "product-color"
                            }
                            key={colors.colorCode}
                            onClick={(event) => handleColor(colors.colorCode)}
                          >
                            <img
                              className="product-colorimg"
                              alt={colors.color}
                              src={colors.colorImg}
                            />
                          </li>
                        );
                      })}
                  </ul>
                </div>
                <p className="product-catchcopy">{skuDetails.catchcopy}</p>
                <p className="product-price">
                  <span className="price">{skuDetails.price}</span>円
                </p>
                <div className="product-point">
                  <p className="product-pointleft">
                    獲得ポイント
                    <span className="point">{skuDetails.point}pt</span>付与
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
                    {iconsList !== undefined &&
                      iconsList !== null &&
                      iconsList.map((iconLink, index) => {
                        return (
                          <li className="product-property" key={index}>
                            <img
                              className="product-propertyimg"
                              alt=""
                              src={iconLink}
                            />
                          </li>
                        );
                      })}
                  </ul>
                </div>
                <div className="sku-specs">
                  <table className="table-specs">
                    <tbody>
                      <tr>
                        <th>商品コード</th>
                        <td>{skuDetails.skuId}</td>
                      </tr>
                      <tr>
                        <th>カラー</th>
                        <td>{skuDetails.color}</td>
                      </tr>
                      <tr>
                        <th>サイズ</th>
                        <td>{skuDetails.size}</td>
                      </tr>
                      <tr>
                        <th>素材</th>
                        <td>{skuDetails.material}</td>
                      </tr>
                      <tr>
                        <th>重量</th>
                        <td>{skuDetails.weight}</td>
                      </tr>
                      <tr>
                        <th>保証年数</th>
                        <td>{skuDetails.warranty}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-body">
            123
            <div className="swiper-1">
              <Swiper
                slidesPerView={4}
                slidesPerGroup={4}
                grid={{
                  rows: 2,
                }}
                spaceBetween={10}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Grid, Pagination, Navigation]}
                className="mySwiper"
              >
                <SwiperSlide>1</SwiperSlide>
                <SwiperSlide>2</SwiperSlide>
                <SwiperSlide>3</SwiperSlide>
                <SwiperSlide>4</SwiperSlide>
                <SwiperSlide>5</SwiperSlide>
                <SwiperSlide>6</SwiperSlide>
                <SwiperSlide>7</SwiperSlide>
                <SwiperSlide>8</SwiperSlide>
                <SwiperSlide>9</SwiperSlide>
                <SwiperSlide>10</SwiperSlide>
                <SwiperSlide>11</SwiperSlide>
                <SwiperSlide>12</SwiperSlide>
                <SwiperSlide>13</SwiperSlide>
                <SwiperSlide>14</SwiperSlide>
                <SwiperSlide>15</SwiperSlide>
                <SwiperSlide>16</SwiperSlide>
                <SwiperSlide>17</SwiperSlide>
                <SwiperSlide>18</SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
        <div className="sidebar">
          <div className="delivery">
            <p className="left">納品方法</p>
            <p className="right">{skuDetails.deliveryMethod}</p>
          </div>
          <div className="delivery">
            <p className="left">配送目安</p>
            <p className="right">{skuDetails.deliveryTime}</p>
          </div>
          <div className="delivery">
            <p className="left">返品・交換</p>
            <div className="right">
              14日間返品可能
              <p className="bottom">
                <a href={skuDetails.deliveryImg}>返品・交換について</a>
              </p>
            </div>
          </div>
          <div className="delivery">
            <p className="left">送料</p>
            <div className="right">
              <span className="delivery-price">有料</span>
              <p className="bottom">
                <a href="#">送料について</a>
              </p>
            </div>
          </div>
          <div className="delivery-img">
            <img
              src="https://www.nitori-net.jp/ecstatic/front/free_shipping2.jpg"
              alt=""
            />
          </div>
          <div className="delivery-number">
            <span className="text">数量</span>
            <input type="text" value="1" readOnly />
          </div>
          <div className="delivery-price">
            <span className="price">{skuDetails.price}</span>円
          </div>
          <button className="addcart">
            {/* <FontAwesomeIcon icon={fas("cart-shopping")} /> */}
            <FontAwesomeIcon icon={faCartShopping} size="lg" />
            <span className="addcarttext">カートに入れる</span>
          </button>
          <div className="delivery-icon">
            <div className="icon">
              <p className="img">
                <FontAwesomeIcon
                  icon={faBuildingCircleCheck}
                  size="2x"
                  className="imgIcon"
                />
              </p>
              <p>
                <a href="">店舗在庫を確認</a>
              </p>
            </div>
            <div className="icon">
              <p className="img">
                <FontAwesomeIcon
                  icon={faHeart}
                  size="2x"
                  className="imgIcon2"
                />
              </p>
              <p>
                <a href="">お気に入り</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Product;
