import { Fragment, useContext } from "react";

import { subCategoryContext } from "../../itemlist/itemlist.component";
import { Link } from "react-router-dom";
import "./subcategory.styles.css";

const SubCategory = () => {
  const { BreadcrumbsList, categoryCountList } = useContext(subCategoryContext);

  return (
    <Fragment>
      <div
        className="subcategory"
        style={{
          display: BreadcrumbsList.length < 3 ? "block" : "none",
        }}
      >
        <span>カテゴリを選択</span>
      </div>

      <div
        className="subcategory_condition"
        style={{
          display: BreadcrumbsList.length < 3 ? "block" : "none",
        }}
      >
        <span>カテゴリ</span>
        <ul>
          {categoryCountList.map((subcategory) => {
            return (
              <Link
                key={subcategory.goodsCategoryId}
                to={`/itemlist/${subcategory.goodsCategoryId}`}
                state={[
                  ...BreadcrumbsList,
                  {
                    categoryId: subcategory.goodsCategoryId,
                    categoryName: subcategory.categoryName,
                  },
                ]}
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
