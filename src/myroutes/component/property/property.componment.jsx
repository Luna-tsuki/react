import { Fragment, useContext } from "react";

import { propertyContext } from "../../itemlist/itemlist.component";
import { subpropertyContext } from "../../subitemlist/subitemlist.component";
import { Link } from "react-router-dom";
import "./property.styles.css";

const Property = ({ level }) => {
  //判断传入的level层级
  const levelMap = {
    2: propertyContext,
    3: subpropertyContext,
  };
  const {
    propertyCountList,
    userSelectedCols,
    handleProperty,
    handleColClear,
    handleColClearAll,
  } = useContext(levelMap[parseInt(level)]);

  // const {
  //   propertyCountList,
  //   userSelectedCols,
  //   handleProperty,
  //   handleColClear,
  // } = useContext(propertyContext);

  return (
    <Fragment>
      <div className="property">
        <span>条件で絞り込む</span>
      </div>
      <div className="property_condition">
        <span className="property_title">現在絞り込んでいる条件</span>
        <div className="property_clear">
          {userSelectedCols.map((col, index) => {
            return (
              <button
                className="property_button"
                key={index}
                onClick={() => handleColClear(col)}
              >
                {col} <span>X</span>
              </button>
            );
          })}
        </div>
        <button
          className={
            userSelectedCols.length > 0 ? "clear_button_active" : "clear_button"
          }
          onClick={() => handleColClearAll()}
        >
          全条件をクリア
        </button>
      </div>
      {propertyCountList.map((property, index) => {
        return (
          <div className="property_condition" key={index}>
            <span className="property_title">{property.colName}</span>
            <div className="property_list">
              {property.propertyList.map((list, idx) => {
                return (
                  <label className="checklabel" key={idx}>
                    <input
                      type="checkbox"
                      checked={userSelectedCols.includes(list.col)}
                      onChange={() =>
                        handleProperty(list.col, property.colName)
                      }
                    />
                    <span className="checkmark">
                      {list.col}({list.colCount})
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};
export default Property;
