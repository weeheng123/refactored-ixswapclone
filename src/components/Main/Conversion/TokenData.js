const TokenData = ({ className, priceTitle, price }) => (
  <div className={className}>
    <span>{priceTitle}</span>
    <span className="number">{price}</span>
  </div>
);

export default TokenData;
