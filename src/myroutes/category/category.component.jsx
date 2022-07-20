import { useState, useEffect } from "react";
import "./category.styles.css";
import axios from "axios";
import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

library.add(faCoffee);

const localhost = axios.create({
  baseURL: "http://localhost:8080",
});

const Category = () => {
  // 解析初始值;
  // const initialState = [
  //   {
  //     categoryId: 15,
  //     categoryName: "家电",
  //     categoryImage:
  //       "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8993449607198/Bed.jpg",
  //     parentId: 0,
  //     subList: [
  //       {
  //         categoryId: 23,
  //         categoryName: "冰箱",
  //         categoryImage: null,
  //         parentId: 15,
  //       },
  //       {
  //         categoryId: 23,
  //         categoryName: "电视机",
  //         categoryImage: null,
  //         parentId: 15,
  //       },
  //     ],
  //   },
  //   {
  //     categoryId: 17,
  //     categoryName: "数码",
  //     categoryImage:
  //       "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8993449607198/Bed.jpg",
  //     parentId: 0,
  //     subList: [
  //       {
  //         categoryId: 18,
  //         categoryName: "手机",
  //         categoryImage: null,
  //         parentId: 17,
  //       },
  //     ],
  //   },
  // ];
  const [categorys, setCategorys] = useState([]);

  //1.查找serach
  useEffect(() => {
    async function getPost() {
      const response = await localhost.get("/category");
      console.log(response.data.data);
      setCategorys(response.data.data);
    }
    getPost();
  }, []);

  return (
    <Fragment>
      <nav>
        <div className="category">
          <div className="global_category">
            カテゴリ
            <FontAwesomeIcon icon="coffee" />
          </div>
          <div className="content_category">
            <ul>
              {categorys.map((category) => {
                return (
                  <li key={category.categoryId}>
                    <div className="parent_category">
                      {category.categoryName}
                    </div>
                    <div className="children_category">
                      <p className="img_category">
                        <img src={category.categoryImage} alt="imgs" />
                        <Link className="bed-link" to="/bed">
                          <span>{category.categoryName}</span>
                        </Link>
                      </p>
                      <ul>
                        {category.subList.map((list) => {
                          return (
                            <li key={list.categoryId}>{list.categoryName}</li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Category;
