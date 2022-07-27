import { Fragment, useContext } from "react";

import { controlbarContext } from "../../itemlist/itemlist.component";
import { subcontrolbarContext } from "../../subitemlist/subitemlist.component";

import { Link } from "react-router-dom";
import "./controlbar.styles.css";

const Controlbar = ({ level }) => {
  //判断传入的level层级
  const levelMap = {
    2: controlbarContext,
    3: subcontrolbarContext,
  };
  const { itemTotal, pageNo, handleOrderBy } = useContext(
    levelMap[parseInt(level)]
  );

  return (
    <Fragment>
      <div className="controlbar">
        <p>
          全<span className="total">{itemTotal}</span>件　
          <span>
            {1 + (pageNo - 1) * 10} 〜{" "}
            {pageNo * 10 > itemTotal ? itemTotal : pageNo * 10}件
          </span>
        </p>
        <div className="r-controlbar">
          <div className="selectedOrder">
            <select className="orderBy" onChange={handleOrderBy}>
              <option value="1">新着順</option>
              <option value="2">価格の安い順</option>
              <option value="3">価格の高い順</option>
            </select>
          </div>
          {/* <div className="controlbar_view">
                <span>表示切替</span>
                <label className="checklabel">
                  <input type="checkbox" className="checkbox" />
                  <span className="checkmark"></span>
                </label>
                <label className="checklabel">
                  <input type="checkbox" className="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </div> */}
        </div>
      </div>
    </Fragment>
  );
};
export default Controlbar;
