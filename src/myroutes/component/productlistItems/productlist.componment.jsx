import { Fragment, useContext } from "react";

import { productlistContext } from "../../itemlist/itemlist.component";
import { subproductlistContext } from "../../subitemlist/subitemlist.component";
import { Link } from "react-router-dom";
import "./productlist.styles.css";

const ProductList = ({ level }) => {
  //判断传入的level层级
  const levelMap = {
    2: productlistContext,
    3: subproductlistContext,
  };
  const { ItemGoodsInfoList } = useContext(levelMap[parseInt(level)]);

  return (
    <Fragment>
      <div className="productlist">
        {ItemGoodsInfoList.map((ItemGoods) => {
          return (
            <div className="item-container" key={ItemGoods.goodsId}>
              <img alt={ItemGoods.goodsName} src={ItemGoods.goodsCoverImg} />
              <p className="goodsName">{ItemGoods.goodsName}</p>
              <p className="price">
                <span className="sellingPrice">{ItemGoods.sellingPrice}</span>
                <span className="sellingName">円（税込）</span>
              </p>
              <div className="item-colors">
                <ul>
                  {ItemGoods.propertyColColorList.map((colorList) => {
                    return (
                      <li className="item-color" key={colorList.id}>
                        <img
                          className="item-colorimg"
                          alt={colorList.col}
                          src={colorList.colImg}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="item-propertys">
                <ul>
                  {/* <li className="item-property">
                    <img
                      className="item-propertyimg"
                      alt=""
                      src="https://www.nitori-net.jp/ecstatic/image/sys-master/images/8878560215070/pic01062.jpg"
                    />
                  </li> */}
                  {ItemGoods.propertyColAllList.map((colAllList) => {
                    return (
                      <li className="item-property" key={colAllList.id}>
                        <img
                          className="item-propertyimg"
                          alt={colAllList.col}
                          src={colAllList.colImg}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
export default ProductList;
