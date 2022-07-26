import { Fragment, useContext } from "react";

import { subCategoryContext } from "../../itemlist/itemlist.component";
import { Link } from "react-router-dom";
import "./subcategory.styles.css";

const SubCategory = () => {
  const {
    categoryCountList,
    goodsCategoryId,
    parentCategoryName,
    childrenCategoryName,
  } = useContext(subCategoryContext);

  return (
    <Fragment>
      <div className="subcategory">
        <span>カテゴリを選択</span>
      </div>

      <div className="subcategory_condition">
        <span>カテゴリ</span>
        <ul>
          {categoryCountList.map((subcategory) => {
            return (
              <Link
                key={subcategory.goodsCategoryId}
                to={`/itemlist/${goodsCategoryId}/${subcategory.goodsCategoryId}`}
                state={{
                  parentCategoryName: parentCategoryName,
                  childrenCategoryName: childrenCategoryName,
                  subChildrenCategoryName: subcategory.categoryName,
                }}
              >
                <li>
                  <button className="subcategory_button">
                    {subcategory.categoryName}
                    {subcategory.goodsCategoryId}({subcategory.categoryCount})
                  </button>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
};
export default SubCategory;
