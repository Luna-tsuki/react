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
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
export default ProductList;
