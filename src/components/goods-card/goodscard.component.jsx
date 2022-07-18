import "./goodscard.styles.css";

const GoodsCard = ({ goodsInfo }) => {
  const { goodsId, goodsName, goodsCoverImg, sellingPrice } = goodsInfo;

  return (
    <div key={goodsId} className="goods-container">
      <img alt={goodsName} src={goodsCoverImg} />
      <p className="goodsName">{goodsName}</p>
      <p className="price">
        <span className="sellingPrice">{sellingPrice}</span>
        <span className="goodsName">円（税込）</span>
      </p>
    </div>
  );
};
export default GoodsCard;
