import { useState, useEffect, Fragment } from "react";
import "./category.styles.css";
import axios from "axios";
import { Outlet, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

library.add(faCoffee);

const localhost = axios.create({
  baseURL: "http://localhost:8080",
});

const Category = () => {
  // 初始值
  const initialState = [
    {
      categoryId: 15,
      categoryName: "家电",
      categoryImage:
        "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8993449607198/Bed.jpg",
      parentId: 0,
      subList: [
        {
          categoryId: 23,
          categoryName: "冰箱",
          categoryImage: null,
          parentId: 15,
        },
        {
          categoryId: 23,
          categoryName: "电视机",
          categoryImage: null,
          parentId: 15,
        },
      ],
    },
    {
      categoryId: 17,
      categoryName: "数码",
      categoryImage:
        "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8993449607198/Bed.jpg",
      parentId: 0,
      subList: [
        {
          categoryId: 18,
          categoryName: "手机",
          categoryImage: null,
          parentId: 17,
        },
      ],
    },
  ];
  // 初始化 categorys 信息
  const [categorys, setCategorys] = useState([]);

  // 发送请求
  useEffect(() => {
    async function getPost() {
      const response = await localhost.get("/category");
      setCategorys(response.data.data);
    }
    getPost();
  }, []);

  // function 控制category是否显示
  const [categoryDisplay, setCategoryDisplay] = useState(false);
  const categoryDisappear = () => {
    setCategoryDisplay(false);
  };
  const categoryAppear = () => {
    setCategoryDisplay(true);
  };

  return (
    <Fragment>
      <nav>
        <div className="category">
          <div
            className="global_category"
            onMouseOver={categoryAppear}
            onMouseLeave={categoryDisappear}
          >
            カテゴリ
            {/* <FontAwesomeIcon icon="coffee" /> */}
          </div>
          <div
            className="content_category"
            style={{
              display: categoryDisplay ? "block" : "none",
            }}
            onMouseOver={categoryAppear}
            onMouseLeave={categoryDisappear}
          >
            <ul>
              {categorys.map((category) => {
                return (
                  <li key={category.categoryId}>
                    <div className="parent_category">
                      {category.categoryName}
                      {category.categoryId}
                    </div>
                    <div className="children_category">
                      <p className="img_category">
                        <img src={category.categoryImage} alt="imgs" />
                        <span>
                          {category.categoryName}
                          {category.categoryId}
                        </span>
                      </p>
                      <ul>
                        {category.subList.map((childrenlist) => {
                          return (
                            <li
                              className="sub_category"
                              key={childrenlist.categoryId}
                              onClick={categoryDisappear}
                            >
                              <Link
                                to={`/itemlist/${childrenlist.categoryId}`}
                                // state={[
                                //   {
                                //     categoryId: category.categoryId,
                                //     categoryName: category.categoryName,
                                //   },
                                //   {
                                //     categoryId: childrenlist.categoryId,
                                //     categoryName: childrenlist.categoryName,
                                //   },
                                // ]}
                              >
                                {childrenlist.categoryName}
                                {childrenlist.categoryId}
                              </Link>
                            </li>
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
