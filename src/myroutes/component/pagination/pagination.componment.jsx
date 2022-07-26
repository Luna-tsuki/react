import { Fragment, useContext } from "react";

import { paginationContext } from "../../itemlist/itemlist.component";
import { subpaginationContext } from "../../subitemlist/subitemlist.component";
import { Link } from "react-router-dom";
import "./pagination.styles.css";

const Pagination = ({ level }) => {
  //判断传入的level层级
  const levelMap = {
    2: paginationContext,
    3: subpaginationContext,
  };

  const {
    handlePageNoForward,
    handlePageNo,
    handlePageNoNext,
    pageNo,
    pageCount,
  } = useContext(levelMap[parseInt(level)]);

  return (
    <Fragment>
      <div className="pagination">
        <span
          className="linkpage"
          onClick={() => handlePageNoForward()}
          style={{
            display: pageNo !== 1 ? "inline-block" : "none",
          }}
        >
          前へ
        </span>
        <ul className="p_index">
          {(() => {
            const arr = [];
            for (let i = 1; i <= pageCount; i++) {
              arr.push(
                <li
                  key={i}
                  className={pageNo === i ? "active" : null}
                  onClick={() => handlePageNo(i)}
                >
                  {i}
                </li>
              );
            }
            return arr;
          })()}
        </ul>
        <span
          className="linkpage"
          onClick={() => handlePageNoNext()}
          style={{
            display: pageNo !== pageCount ? "inline-block" : "none",
          }}
        >
          次へ
        </span>
      </div>
    </Fragment>
  );
};
export default Pagination;
