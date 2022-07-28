import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import {
  useState,
  useEffect,
  Fragment,
  createContext,
  useContext,
} from "react";
import "./itemlist.styles.css";
import axios from "axios";

//导入组件
import SubCategory from "../component/subcategory/subcategory.componment";
import Property from "../component/property/property.componment";
import Controlbar from "../component/controlbar/controlbar.componment";
import ProductList from "../component/productlistItems/productlist.componment";
import Pagination from "../component/pagination/pagination.componment";

//导出context
export const subCategoryContext = createContext();
export const propertyContext = createContext();
export const controlbarContext = createContext();
export const productlistContext = createContext();
export const paginationContext = createContext();

//固定网址部分
const localhost = axios.create({
  baseURL: "http://localhost:8080",
});

const ItemList = () => {
  //初始值
  const initialState = {
    ItemGoodsInfoList: [
      {
        goodsId: 10158,
        goodsName: "无印良品 女式粗棉线条纹长袖T恤",
        goodsCategoryId: 20,
        goodsCoverImg:
          "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8993449607198/Bed.jpg",
        sellingPrice: 70,
        createTime: "2019-09-18T05:19:35.000+00:00",
        propertyColColorList: [
          {
            id: 70,
            goodsId: 12002,
            colName: "カラー",
            col: "ホワイト",
            colCount: null,
            colImg:
              "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8966164348958/BasicColor_WH.jpg",
          },
          {
            id: 71,
            goodsId: 12002,
            colName: "カラー",
            col: "ピンク",
            colCount: null,
            colImg:
              "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8966163496990/BasicColor_PI.jpg",
          },
        ],
        propertyColAllList: [
          {
            id: 11,
            goodsId: 12002,
            colName: "機能・仕様",
            col: "抗菌防臭",
            colCount: null,
            colImg:
              "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8878560215070/pic01062.jpg",
          },
          {
            id: 12,
            goodsId: 12002,
            colName: "タイプ",
            col: "ポケットコイル",
            colCount: null,
            colImg:
              "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8878712520734/pic03026.jpg",
          },
          {
            id: 13,
            goodsId: 12002,
            colName: "商品の説明",
            col: "静電気軽減",
            colCount: null,
            colImg:
              "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8878565359646/pic01137.jpg",
          },
        ],
      },
      {
        goodsId: 12006,
        goodsName: "无印良品 MUJI 基础润肤化妆水",
        goodsCategoryId: 23,
        goodsCoverImg:
          "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8993449607198/Bed.jpg",
        sellingPrice: 70,
        createTime: "2019-09-18T05:18:47.000+00:00",
        propertyColColorList: [
          {
            id: 70,
            goodsId: 12002,
            colName: "カラー",
            col: "ホワイト",
            colCount: null,
            colImg:
              "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8966164348958/BasicColor_WH.jpg",
          },
          {
            id: 71,
            goodsId: 12002,
            colName: "カラー",
            col: "ピンク",
            colCount: null,
            colImg:
              "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8966163496990/BasicColor_PI.jpg",
          },
        ],
        propertyColAllList: [
          {
            id: 11,
            goodsId: 12002,
            colName: "機能・仕様",
            col: "抗菌防臭",
            colCount: null,
            colImg:
              "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8878560215070/pic01062.jpg",
          },
          {
            id: 12,
            goodsId: 12002,
            colName: "タイプ",
            col: "ポケットコイル",
            colCount: null,
            colImg:
              "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8878712520734/pic03026.jpg",
          },
          {
            id: 13,
            goodsId: 12002,
            colName: "商品の説明",
            col: "静電気軽減",
            colCount: null,
            colImg:
              "https://www.nitori-net.jp/ecstatic/image/sys-master/images/8878565359646/pic01137.jpg",
          },
        ],
      },
    ],
    categoryCountList: [
      {
        goodsCategoryId: 20,
        categoryName: "生活电器",
        categoryCount: 2,
      },
      {
        goodsCategoryId: 21,
        categoryName: "厨房电器",
        categoryCount: 1,
      },
    ],
    propertyCountList: [
      {
        colName: "機能・仕様",
        propertyList: [
          {
            col: "抗菌",
            colCount: 4,
          },
          {
            col: "防臭",
            colCount: 1,
          },
        ],
      },
      {
        colName: "タイプ",
        propertyList: [
          {
            col: "高さ調整タイプ",
            colCount: 1,
          },
          {
            col: "ハイバック",
            colCount: 3,
          },
        ],
      },
    ],
  };

  //接收从首页category的link传进来的categoryId
  const { categoryIdString } = useParams();
  const categoryId = parseInt(categoryIdString);
  const goodsCategoryId = categoryId;
  //接收从首页category的link传进来的categoryName
  const { state } = useLocation();
  const { parentCategoryName, childrenCategoryName } = state;

  //初始化 post 信息
  const [ItemLists, setItemLists] = useState(initialState);
  const { ItemGoodsInfoList, categoryCountList, propertyCountList, itemTotal } =
    ItemLists;
  const [orderBy, setOrderBy] = useState("create_time");
  const [ascOrDesc, setAscOrDesc] = useState("asc");
  const [pageNo, setPgaeNo] = useState(1);
  const [limit, setLimit] = useState("10");
  let pageCount = Math.ceil(itemTotal / limit); //向上取整
  const [filterCols, setFilterCols] = useState({});
  const [userSelectedCols, setUserSelectedCols] = useState([]);

  // 如果值变更的时候，调用请求
  useEffect(() => {
    async function getPost() {
      const response = await localhost.post("/ItemList/new", {
        limit: 10,
        cols: [],
        goodsCategoryId: goodsCategoryId,
        orderBy: orderBy,
        ascOrDesc: ascOrDesc,
        pageNo: pageNo,
        filterCols: filterCols,
      });
      setItemLists(response.data.data);
    }
    getPost();
  }, [orderBy, ascOrDesc, pageNo, filterCols, goodsCategoryId]);

  //function 排序 create_time selling_price
  const handleOrderBy = (event) => {
    const ORDER_BY_VALUE = {
      1: "create_time",
      2: "selling_price",
      3: "selling_price",
    };
    const key = parseInt(event.target.value);
    setOrderBy(ORDER_BY_VALUE[key]);

    //设置正序or倒序
    if (key === 2) {
      setAscOrDesc("asc");
    } else if (key === 3) {
      setAscOrDesc("desc");
    }
  };

  //function  页码pageno切换
  //点击 页码1，2 切换
  const handlePageNo = (i) => {
    setPgaeNo(i);
  };
  //点击 【次へ】
  const handlePageNoNext = () => {
    setPgaeNo(pageNo + 1);
  };
  //点击 【前へ】
  const handlePageNoForward = () => {
    setPgaeNo(pageNo - 1);
  };

  //function 更新property
  const handleProperty = (col, colName) => {
    if (userSelectedCols.includes(col)) {
      //如果userSelectedCols有col，删除这个col
      setUserSelectedCols(userSelectedCols.filter((item) => item !== col));

      //删除 filterCols 的col
      const result = filterCols[colName].filter((item) => item !== col);
      if (result.length > 0) {
        filterCols[colName] = result;
      } else {
        delete filterCols[colName];
      }
      setFilterCols({ ...filterCols });
    } else {
      //如果userSelectedCols不包含新加的col，直接把col加进userSelectedCols
      userSelectedCols.push(col);
      setUserSelectedCols([...userSelectedCols]);

      //判断filterCols是否有colName
      if (filterCols[colName]) {
        //如果有对应的colName，加进对应的col数组
        filterCols[colName].push(col);
        setFilterCols({ ...filterCols });
      } else {
        //如果没有对应的colName，新加一个colName键值对
        filterCols[colName] = [col];
        setFilterCols({ ...filterCols });
      }
    }
    setPgaeNo(1);
  };
  //function 点击clear按钮删除属性 col
  const handleColClear = (col) => {
    //删除 userSelectedCols 的col
    setUserSelectedCols(userSelectedCols.filter((item) => item !== col));
    //删除 filterCols 的col
    for (let colName in filterCols) {
      const result = filterCols[colName].filter((item) => item !== col);
      if (result.length > 0) {
        filterCols[colName] = result;
      } else {
        delete filterCols[colName];
      }
    }
    setFilterCols({ ...filterCols });
  };
  const handleColClearAll = () => {
    //删除 userSelectedCols 的所有col
    setUserSelectedCols([]);
    //删除 filterCols 的所有col
    setFilterCols({});
  };

  return (
    <Fragment>
      <Outlet />

      <div className="lead">
        <Link className="" to="/">
          ホーム
        </Link>
        <span className="leadname"> > </span>
        <span className="leadname">{parentCategoryName}</span>
        <span className="leadname"> > </span>
        <span className="leadname">{childrenCategoryName}</span>
      </div>
      <div className="page_subcategory">
        <div className="sidebar">
          <subCategoryContext.Provider
            value={{
              categoryCountList,
              goodsCategoryId,
              parentCategoryName,
              childrenCategoryName,
            }}
          >
            <SubCategory />
          </subCategoryContext.Provider>

          {/* <div className="subcategory">
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
                        {subcategory.goodsCategoryId}(
                        {subcategory.categoryCount})
                      </button>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div> */}

          <propertyContext.Provider
            value={{
              propertyCountList,
              userSelectedCols,
              handleProperty,
              handleColClear,
              handleColClearAll,
            }}
          >
            <Property level="2" />
          </propertyContext.Provider>

          {/* <div className="property">
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
                userSelectedCols.length > 0
                  ? "clear_button_active"
                  : "clear_button"
              }
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
          })}*/}
        </div>

        <div className="layout_body">
          <div className="layout_head">
            <span>{childrenCategoryName}</span>
            <p>
              ニトリの敷きパッド・ベッドパッドです。シーツの上に敷く敷きパッドは、肌に直接触れるので、季節に合った機能・素材がお勧めです。シーツの下に敷くベッドパッドは、汗取りタイプと寝心地調整タイプ（マットレストッパー）がございます。
            </p>
            <p>
              <button>{childrenCategoryName}の選び方</button>
            </p>
          </div>

          <controlbarContext.Provider
            value={{
              itemTotal,
              pageNo,
              handleOrderBy,
            }}
          >
            <Controlbar level="2" />
          </controlbarContext.Provider>
          {/* <div className="controlbar">
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
            </div>
          </div> */}

          <productlistContext.Provider value={{ ItemGoodsInfoList }}>
            <ProductList level="2" />
          </productlistContext.Provider>
          {/* <div className="productlist">
            {ItemGoodsInfoList.map((ItemGoods) => {
              return (
                <div className="item-container" key={ItemGoods.goodsId}>
                  <img
                    alt={ItemGoods.goodsName}
                    src={ItemGoods.goodsCoverImg}
                  />
                  <p className="goodsName">{ItemGoods.goodsName}</p>
                  <p className="price">
                    <span className="sellingPrice">
                      {ItemGoods.sellingPrice}
                    </span>
                    <span className="sellingName">円（税込）</span>
                  </p>
                </div>
              );
            })}
          </div> */}

          <paginationContext.Provider
            value={{
              handlePageNoForward,
              handlePageNo,
              handlePageNoNext,
              pageNo,
              pageCount,
            }}
          >
            <Pagination level="2" />
          </paginationContext.Provider>
          {/* <div className="pagination">
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
          </div> */}
        </div>
      </div>
    </Fragment>
  );
};
export default ItemList;
