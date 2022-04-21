import TokenData from "./TokenData";

const DataFeedContainer = ({ className }) => (
  <div className={className}>
    <TokenData
      className="token-data"
      priceTitle="Liquidity Pool Tokens"
      price="0.00000"
    />
    <TokenData className="token-data" priceTitle="APR" price="0.00000" />
  </div>
);

export default DataFeedContainer;
